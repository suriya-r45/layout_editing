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
    
    // Helper function to format rate
    const formatRate = (rate: MetalRate) => {
      const countryFlag = rate.market === 'INDIA' ? '🇮🇳' : '🇧🇭';
      const countryName = rate.market === 'INDIA' ? 'INDIA' : 'BAHRAIN';
      const currency = rate.market === 'INDIA' ? '₹' : 'BD';
      const price = parseFloat(rate.market === 'INDIA' ? rate.pricePerGramInr : rate.pricePerGramBhd);
      const decimals = rate.market === 'INDIA' ? 0 : 3;
      
      if (rate.metal === 'GOLD') {
        return `${countryFlag} ${countryName} Gold ${rate.purity}: ${currency} ${price.toFixed(decimals)}/g`;
      } else if (rate.metal === 'SILVER') {
        return `${countryFlag} ${countryName} Silver 925: ${currency} ${price.toFixed(decimals)}/g`;
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
      <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-white py-4 overflow-hidden relative shadow-xl border-b-2 border-amber-300 w-full">
        <div className="ticker-scroll whitespace-nowrap w-full">
          <div className="inline-flex items-center space-x-8 w-max">
            {/* Duplicate the rates to create seamless loop */}
            {[...rates, ...rates].map((rate, index) => {
              const isIndia = rate.includes('INDIA');
              const isBahrain = rate.includes('BAHRAIN');
              return (
                <span key={index} className="text-sm font-bold px-5 py-2 bg-amber-800/60 rounded-full border-2 border-yellow-200/60 flex items-center gap-3 shadow-xl shadow-amber-500/40 backdrop-blur-sm text-white">
                  {isIndia && (
                    <span className="flex items-center gap-2">
                      <div className="w-8 h-5 border-2 border-gray-800 shadow-lg" style={{
                        background: 'linear-gradient(to bottom, #ff6600 33%, #ffffff 33%, #ffffff 67%, #00aa00 67%)'
                      }}></div>
                      <span className="text-xs bg-orange-700 text-white px-2 py-1.5 rounded-md font-bold shadow-md border border-orange-500">INDIA</span>
                    </span>
                  )}
                  {isBahrain && (
                    <span className="flex items-center gap-2">
                      <div className="w-8 h-5 border-2 border-gray-800 shadow-lg" style={{
                        background: 'linear-gradient(to right, #cc0000 40%, #ffffff 40%, #ffffff 60%, #cc0000 60%)'
                      }}></div>
                      <span className="text-xs bg-red-700 text-white px-2 py-1.5 rounded-md font-bold shadow-md border border-red-500">BAHRAIN</span>
                    </span>
                  )}
                  <span>{rate.replace('🇮🇳 INDIA', '').replace('🇧🇭 BAHRAIN', '').trim()}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}