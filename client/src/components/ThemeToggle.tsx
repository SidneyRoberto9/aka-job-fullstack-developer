'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Theme = 'light' | 'dark' | 'system';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  const handleChangeTheme = (theme: Theme) => {
    setTheme(theme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun size={20} className="scale-100 dark:-rotate-90 dark:scale-0" />
          <Moon size={20} className="absolute scale-0 dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleChangeTheme('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChangeTheme('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChangeTheme('system')}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
