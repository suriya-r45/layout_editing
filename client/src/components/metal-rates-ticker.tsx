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

  // Filter and format rates for display
  const getFormattedRates = () => {
    const rates: string[] = [];
    
    metalRates.forEach(rate => {
      if (rate.metal === 'GOLD' && (rate.purity === '22K' || rate.purity === '18K')) {
        rates.push(
          `${rate.market === 'INDIA' ? '🇮🇳' : '🇧🇭'} Gold ${rate.purity}: ${rate.market === 'INDIA' ? '₹' : 'BD'} ${parseFloat(rate.market === 'INDIA' ? rate.pricePerGramInr : rate.pricePerGramBhd).toFixed(rate.market === 'INDIA' ? 0 : 3)}/g`
        );
      } else if (rate.metal === 'SILVER' && rate.purity === 'PURE') {
        rates.push(
          `${rate.market === 'INDIA' ? '🇮🇳' : '🇧🇭'} Silver: ${rate.market === 'INDIA' ? '₹' : 'BD'} ${parseFloat(rate.market === 'INDIA' ? rate.pricePerGramInr : rate.pricePerGramBhd).toFixed(rate.market === 'INDIA' ? 0 : 3)}/g`
        );
      }
    });
    
    return rates;
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