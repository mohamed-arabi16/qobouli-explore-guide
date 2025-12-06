import React from 'react';
import { useHashNavigation } from '@/hooks/useHashNavigation';

interface HashLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

/**
 * A custom Link component that handles hash navigation properly.
 * Scrolls smoothly to the target element when clicking on hash links.
 */
const HashLink: React.FC<HashLinkProps> = ({ to, children, className, onClick, style }) => {
  const { navigateWithHash } = useHashNavigation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigateWithHash(to);
    if (onClick) {
      onClick();
    }
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
};

export default HashLink;
