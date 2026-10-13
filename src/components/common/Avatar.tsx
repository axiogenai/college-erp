import React from 'react';

export interface AvatarProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'rounded';
  variant?: 'default' | 'navbar' | 'solid';
  className?: string;
}

export const getInitials = (name: string): string => {
  if (!name) return 'U';
  const cleaned = name
    .replace(/^(Dr\.|Prof\.|Mr\.|Mrs\.|Ms\.|Shri\.?)\s+/i, '')
    .replace(/,\s*(CA|Ph\.?D\.?|M\.?Tech\.?)$/i, '')
    .trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const sizeClasses: Record<NonNullable<AvatarProps['size']>, string> = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-7 h-7 text-[11px]',
  md: 'w-9 h-9 text-xs',
  lg: 'w-12 h-12 text-sm',
  xl: 'w-14 h-14 text-base',
};

const shapeClasses: Record<NonNullable<AvatarProps['shape']>, string> = {
  circle: 'rounded-full',
  rounded: 'rounded-xl',
};

const variantClasses: Record<NonNullable<AvatarProps['variant']>, string> = {
  default:
    'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700',
  navbar:
    'bg-white/15 text-white border border-white/25',
  solid:
    'bg-[#0F2942] dark:bg-slate-800 text-white dark:text-slate-100 border border-slate-300 dark:border-slate-700',
};

/**
 * Watermelon UI source-backed non-image Avatar (Avatar + AvatarFallback monogram pattern)
 */
export const Avatar: React.FC<AvatarProps> = ({
  name,
  size = 'md',
  shape = 'circle',
  variant = 'default',
  className = '',
}) => {
  const initials = getInitials(name);

  return (
    <div
      role="img"
      aria-label={name}
      title={name}
      className={`inline-flex items-center justify-center font-mono font-semibold tracking-tight select-none shrink-0 ${sizeClasses[size]} ${shapeClasses[shape]} ${variantClasses[variant]} ${className}`}
    >
      <span>{initials}</span>
    </div>
  );
};

export default Avatar;
