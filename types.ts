import React from 'react';

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  subValueColor?: string; // tailwind text class
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export interface ChartData {
  name: string;
  value: number;
  value2?: number;
}