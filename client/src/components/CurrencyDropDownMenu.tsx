'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { CandlestickChart } from 'lucide-react';

import {
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ICurrency } from '@/@Types/exchange-rate';

export function CurrencyDropDownMenu() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const actualCurrency = (searchParams.get('currency') as ICurrency) || 'USD';

  const handleCurrencyChange = useCallback(
    (value: ICurrency) => {
      router.push(`/home?currency=${value}`);
    },
    [router],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <CandlestickChart size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup
          value={actualCurrency}
          onValueChange={(value) => handleCurrencyChange(value as ICurrency)}
        >
          <DropdownMenuRadioItem value="USD">USD</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="EUR">EUR</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="JPY">JPY</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
