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
            animation: scroll-ticker 45s linear infinite;
          }
          
          .ticker-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-gray-900 py-4 overflow-hidden relative shadow-xl border-b-2 border-amber-300">
        <div className="ticker-scroll whitespace-nowrap">
          <div className="inline-flex items-center space-x-8">
            {/* Duplicate the rates to create seamless loop */}
            {[...rates, ...rates].map((rate, index) => {
              const isIndia = rate.includes('INDIA');
              const isBahrain = rate.includes('BAHRAIN');
              return (
                <span key={index} className="text-sm font-bold px-5 py-2 bg-amber-600/30 rounded-full border-2 border-amber-200/60 flex items-center gap-2 shadow-xl shadow-amber-500/40 backdrop-blur-sm text-gray-900">
                  {isIndia && (
                    <span className="inline-flex items-center gap-1">
                      <span className="text-base">🇮🇳</span>
                      <span className="text-xs bg-orange-600 text-white px-2 py-1 rounded-md font-bold shadow-lg">IN</span>
                    </span>
                  )}
                  {isBahrain && (
                    <span className="inline-flex items-center gap-1">
                      <span className="text-base">🇧🇭</span>
                      <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-md font-bold shadow-lg">BH</span>
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