import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface MetalRate {
  id: string;
  metal: string;
  purity: string;
  pricePerGramInr: string;
  pricePerGramBhd: string;
  market: string;
  lastUpdated: string;
}

export function MetalRatesTicker() {
  const { data: metalRates = [] } = useQuery<MetalRate[]>({
    queryKey: ['/api/metal-rates'],
    refetchInterval: 60000, // Refresh every minute
  });

  // Filter and format rates for display in organized order
  const getFormattedRates = () => {
    const rates: string[] = [];
    
    // Helper function to format rate (removed emoji flags to avoid duplication)
    const formatRate = (rate: MetalRate) => {
      const countryName = rate.market === 'INDIA' ? 'INDIA' : 'BAHRAIN';
      const currency = rate.market === 'INDIA' ? '₹' : 'BD';
      const price = parseFloat(rate.market === 'INDIA' ? rate.pricePerGramInr : rate.pricePerGramBhd);
      const decimals = rate.market === 'INDIA' ? 0 : 3;
      
      if (rate.metal === 'GOLD') {
        return `Gold ${rate.purity}: ${currency} ${price.toFixed(decimals)}/g`;
      } else if (rate.metal === 'SILVER') {
        return `Silver 925: ${currency} ${price.toFixed(decimals)}/g`;
      }
      return null;
    };

    // Order: BH 22KT, IN 22KT, BH 18KT, IN 18KT, then silver rates
    // Find and add Gold 22K rates
    const bh22K = metalRates.find(r => r.market === 'BAHRAIN' && r.metal === 'GOLD' && r.purity === '22K');
    const in22K = metalRates.find(r => r.market === 'INDIA' && r.metal === 'GOLD' && r.purity === '22K');
    
    if (bh22K) rates.push(formatRate(bh22K)!);
    if (in22K) rates.push(formatRate(in22K)!);
    
    // Find and add Gold 18K rates
    const bh18K = metalRates.find(r => r.market === 'BAHRAIN' && r.metal === 'GOLD' && r.purity === '18K');
    const in18K = metalRates.find(r => r.market === 'INDIA' && r.metal === 'GOLD' && r.purity === '18K');
    
    if (bh18K) rates.push(formatRate(bh18K)!);
    if (in18K) rates.push(formatRate(in18K)!);
    
    // Find and add Silver rates
    const bhSilver = metalRates.find(r => r.market === 'BAHRAIN' && r.metal === 'SILVER' && r.purity === '925');
    const inSilver = metalRates.find(r => r.market === 'INDIA' && r.metal === 'SILVER' && r.purity === '925');
    
    if (bhSilver) rates.push(formatRate(bhSilver)!);
    if (inSilver) rates.push(formatRate(inSilver)!);
    
    return rates.filter(Boolean);
  };

  const rates = getFormattedRates();
  
  if (rates.length === 0) return null;

  return (
    <>
      <style>
        {`
          @keyframes scroll-ticker {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          
          .ticker-scroll {
            animation: scroll-ticker 20s linear infinite;
          }
          
          @media (max-width: 768px) {
            .ticker-scroll {
              animation: scroll-ticker 12s linear infinite;
            }
          }
          
          .ticker-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      <div className="bg-white text-gray-800 py-4 overflow-hidden relative shadow-lg border-b border-gray-200 w-full">
        <div className="ticker-scroll whitespace-nowrap w-full">
          <div className="inline-flex items-center space-x-8 w-max">
            {/* Duplicate the rates to create seamless loop */}
            {[...rates, ...rates].map((rate, index) => {
              // Determine market from rate position in array (rates are ordered: BH 22K, IN 22K, BH 18K, IN 18K, BH Silver, IN Silver)
              const originalIndex = index % rates.length;
              const isIndia = originalIndex % 2 === 1; // Odd indices are India rates
              const isBahrain = originalIndex % 2 === 0; // Even indices are Bahrain rates
              
              return (
                <span key={index} className="text-sm font-bold px-5 py-2 bg-gray-50 rounded-full border border-gray-300 flex items-center gap-3 shadow-md text-gray-800">
                  {isIndia && (
                    <div className="w-4 h-4 rounded-full overflow-hidden border border-gray-200">
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <rect width="24" height="8" fill="#FF9933"/>
                        <rect y="8" width="24" height="8" fill="#FFFFFF"/>
                        <rect y="16" width="24" height="8" fill="#138808"/>
                        <circle cx="12" cy="12" r="3" fill="#000080"/>
                      </svg>
                    </div>
                  )}
                  {isBahrain && (
                    <div className="w-4 h-4 rounded-full overflow-hidden border border-gray-200">
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <rect width="24" height="12" fill="#FFFFFF"/>
                        <rect y="12" width="24" height="12" fill="#CE1126"/>
                        <path d="M0 0 L8 6 L0 12 V8 L4 6 L0 4 Z" fill="#CE1126"/>
                      </svg>
                    </div>
                  )}
                  <span>{rate}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}