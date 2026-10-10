import React from 'react';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'gold' | 'primary';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'xs' | 'sm' | 'md';
  rounded?: 'md' | 'full' | 'lg';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  rounded = 'full',
  className = '',
  dot = true
}) => {
  // Modern, clean, simple SaaS badge with soft translucent background tint and a solid micro-dot.
  // Sleek pill shape, zero glows, zero pulsing rings, high-contrast readable typography.
  const variantStyles: Record<BadgeVariant, { bg: string; dot: string }> = {
    success: {
      bg: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30',
      dot: 'bg-emerald-500'
    },
    danger: {
      bg: 'bg-rose-500/10 text-rose-700 border-rose-500/20 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30',
      dot: 'bg-rose-500'
    },
    warning: {
      bg: 'bg-amber-500/10 text-amber-700 border-amber-500/20 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30',
      dot: 'bg-amber-500'
    },
    primary: {
      bg: 'bg-institutional-500/10 text-institutional-700 border-institutional-500/20 dark:bg-institutional-500/15 dark:text-institutional-300 dark:border-institutional-500/30',
      dot: 'bg-institutional-600 dark:bg-institutional-400'
    },
    info: {
      bg: 'bg-sky-500/10 text-sky-700 border-sky-500/20 dark:bg-sky-500/15 dark:text-sky-300 dark:border-sky-500/30',
      dot: 'bg-sky-500'
    },
    gold: {
      bg: 'bg-amber-500/10 text-amber-700 border-amber-500/20 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30',
      dot: 'bg-amber-500'
    },
    neutral: {
      bg: 'bg-slate-500/10 text-slate-700 border-slate-500/20 dark:bg-slate-400/10 dark:text-slate-300 dark:border-slate-500/30',
      dot: 'bg-slate-400 dark:bg-slate-500'
    }
  };

  const current = variantStyles[variant] || variantStyles.neutral;

  const sizeStyles = {
    xs: 'text-[10px] px-2 py-0.5 gap-1 font-medium',
    sm: 'text-[11px] px-2.5 py-0.5 gap-1.5 font-medium',
    md: 'text-xs px-3 py-1 gap-1.5 font-medium'
  }[size];

  const roundedStyles = {
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }[rounded];

  return (
    <span className={`inline-flex items-center justify-center leading-none border whitespace-nowrap select-none font-sans ${roundedStyles} ${current.bg} ${sizeStyles} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${current.dot}`} />}
      <span>{children}</span>
    </span>
  );
};
