import React from 'react';
import { SoftCard } from './SoftCard';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendLabel?: string;
  icon?: React.ReactNode;
  subtitle?: string;
  colorScheme?: 'institutional' | 'gold' | 'emerald' | 'indigo' | 'rose';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend = 'neutral',
  trendLabel,
  icon,
  subtitle,
  colorScheme = 'institutional'
}) => {
  const iconColorStyles = {
    institutional: 'bg-slate-100 dark:bg-slate-800 text-institutional-600 dark:text-institutional-400 border border-slate-200 dark:border-slate-700/80',
    gold: 'bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 border border-slate-200 dark:border-slate-700/80',
    emerald: 'bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-700/80',
    indigo: 'bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700/80',
    rose: 'bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 border border-slate-200 dark:border-slate-700/80'
  }[colorScheme];

  return (
    <SoftCard hoverEffect className="overflow-hidden flex flex-col justify-between border border-slate-200/90 dark:border-slate-800 shadow-soft">
      {/* Signature Oxford Navy Top Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#0F2942] via-[#1B3F66] to-[#0B1D30] border-b border-blue-500/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]" />
      <div className="p-4 flex flex-col justify-between flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider min-h-[32px] flex items-start leading-tight">
              {title}
            </p>
            <h3 className="mt-1 text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 truncate">
              {value}
            </h3>
          </div>
          {icon && (
            <div className={`p-2 rounded-xl border ${iconColorStyles} shrink-0`}>
              {icon}
            </div>
          )}
        </div>

        {(change || subtitle) && (
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs min-h-[26px]">
            {change ? (
              <div className="flex items-center gap-1.5 truncate">
                {trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                {trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />}
                {trend === 'neutral' && <Minus className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                <span className={`font-semibold ${
                  trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' :
                  trend === 'down' ? 'text-rose-600 dark:text-rose-400' :
                  'text-slate-600 dark:text-slate-400'
                }`}>
                  {change}
                </span>
                {trendLabel && (
                  <span className="text-slate-400 text-[11px] ml-0.5 truncate">
                    {trendLabel}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-slate-500 dark:text-slate-400 text-xs truncate">
                {subtitle}
              </span>
            )}
          </div>
        )}
      </div>
    </SoftCard>
  );
};
