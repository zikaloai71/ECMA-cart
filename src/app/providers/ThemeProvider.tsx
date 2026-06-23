import type { PropsWithChildren } from 'react';

import { ThemeContext } from '@/app/providers/ThemeContext';
import { useDarkMode } from '@/shared/lib/useDarkMode';

export function ThemeProvider({ children }: PropsWithChildren) {
  const { isDark, toggle } = useDarkMode();

  return (
    <ThemeContext value={{ isDark, toggle }}>
      {children}
    </ThemeContext>
  );
}
