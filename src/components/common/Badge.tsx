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
  rounded = 'md',
  className = '',
  dot = false
}) => {
  // Classic, high-horology, refined rectangular indicator badge.
  // Zero puffy pastel backgrounds, zero cartoonish dots by default, crisp typography.
  const variantStyles: Record<BadgeVariant, { bg: string; dot: string }> = {
    success: {
      bg: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border-emerald-500/30',
      dot: 'bg-emerald-500'
    },
    danger: {
      bg: 'bg-rose-500/20 text-rose-800 dark:text-rose-200 border-rose-400/30',
      dot: 'bg-rose-500'
    },
    warning: {
      bg: 'bg-amber-500/20 text-amber-800 dark:text-amber-200 border-amber-400/30',
      dot: 'bg-amber-500'
    },
    primary: {
      bg: 'bg-[#0F2942]/15 text-[#0F2942] dark:bg-[#1B3F66]/40 dark:text-sky-200 border-[#0F2942]/25 dark:border-blue-500/30',
      dot: 'bg-[#0F2942] dark:bg-blue-400'
    },
    info: {
      bg: 'bg-sky-500/15 text-sky-800 dark:text-sky-200 border-sky-500/30',
      dot: 'bg-sky-500'
    },
    gold: {
      bg: 'bg-[#C5A059]/15 text-[#85642F] dark:text-[#E2D3B1] border-[#C5A059]/30',
      dot: 'bg-[#C5A059]'
    },
    neutral: {
      bg: 'bg-slate-500/10 text-slate-700 dark:bg-white/10 dark:text-white/85 border-slate-300/50 dark:border-white/15',
      dot: 'bg-slate-400 dark:bg-slate-500'
    }
  };

  const current = variantStyles[variant] || variantStyles.neutral;

  const sizeStyles = {
    xs: 'text-[10px] px-2 py-0.5 gap-1 font-mono uppercase tracking-wider',
    sm: 'text-[10.5px] px-2.5 py-0.5 gap-1.5 font-mono uppercase tracking-wider',
    md: 'text-xs px-3 py-1 gap-1.5 font-mono uppercase tracking-wider'
  }[size];

  const roundedStyles = {
    md: 'rounded',
    lg: 'rounded-md',
    full: 'rounded-full'
  }[rounded];

  return (
    <span className={`inline-flex items-center justify-center leading-none border whitespace-nowrap select-none ${roundedStyles} ${current.bg} ${sizeStyles} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${current.dot}`} />}
      <span>{children}</span>
    </span>
  );
};
