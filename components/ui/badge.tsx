import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/components/ui';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-brand-500/30 bg-brand-500/10 text-brand-400',
        brand: 'border-brand-500/30 bg-brand-500/10 text-brand-400',
        secondary: 'border-border bg-surface-soft text-text-muted',
        outline: 'border-border text-text-muted',
        emerald: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
        amber: 'border-amber-500/30 bg-amber-500/10 text-amber-400'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
