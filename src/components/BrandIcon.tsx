import type { SVGProps } from 'react';

type BrandName = 'facebook' | 'instagram' | 'x' | 'linkedin';

type BrandIconProps = SVGProps<SVGSVGElement> & {
  brand: BrandName;
};

/**
 * Small, dependency-free social-brand marks.
 * The surrounding link or button supplies its accessible name.
 */
export default function BrandIcon({ brand, ...props }: BrandIconProps) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    'aria-hidden': true as const,
    focusable: false as const,
    ...props,
  };

  switch (brand) {
    case 'facebook':
      return (
        <svg {...common}>
          <path d="M13.4 21v-7.5h2.5l.4-2.9h-2.9V8.8c0-.8.2-1.4 1.5-1.4h1.5V4.8c-.7-.1-1.5-.2-2.3-.2-2.3 0-3.9 1.4-3.9 4v2.2H7.6v2.9h2.6V21h3.2z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'x':
      return (
        <svg {...common}>
          <path d="M18.9 3H22l-6.8 7.8L23.2 21h-6.2l-4.9-6.5L6.4 21H3.2l7.3-8.4L2.8 3h6.4l4.4 5.9L18.9 3zm-1.1 16h1.7L8.2 4.9H6.4L17.8 19z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...common}>
          <path d="M5.1 3.4a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2zM3.3 9h3.6v11.6H3.3zM9.1 9h3.4v1.6h.1c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.5v6.4h-3.6v-5.7c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v5.8H9.1z" />
        </svg>
      );
  }
}
