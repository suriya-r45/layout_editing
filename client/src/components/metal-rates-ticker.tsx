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
      const countryFlag = rate.market === 'INDIA' ? '🇮🇳 IN' : '🇧🇭 BH';
      const currency = rate.market === 'INDIA' ? '₹' : 'BD';
      const price = parseFloat(rate.market === 'INDIA' ? rate.pricePerGramInr : rate.pricePerGramBhd);
      const decimals = rate.market === 'INDIA' ? 0 : 3;
      
      if (rate.metal === 'GOLD') {
        return `${countryFlag} Gold ${rate.purity}: ${currency} ${price.toFixed(decimals)}/g`;
      } else if (rate.metal === 'SILVER') {
        return `${countryFlag} Silver 925: ${currency} ${price.toFixed(decimals)}/g`;
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
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-1.5 overflow-hidden relative">
        <div className="ticker-scroll whitespace-nowrap">
          <div className="inline-flex items-center space-x-8">
            {/* Duplicate the rates to create seamless loop */}
            {[...rates, ...rates].map((rate, index) => (
              <span key={index} className="text-sm font-medium">
                {rate}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}