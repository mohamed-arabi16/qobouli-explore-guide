import { useEffect, useRef } from 'react';

export const useFocusTrap = (
  ref: React.RefObject<HTMLElement>,
  isOpen: boolean,
  onClose: () => void
) => {
  const firstFocusableElement = useRef<HTMLElement | null>(null);
  const lastFocusableElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen || !ref.current) return;

    const focusableElements = ref.current.querySelectorAll<HTMLElement>(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])'
    );

    if (focusableElements.length === 0) return;

    firstFocusableElement.current = focusableElements[0];
    lastFocusableElement.current = focusableElements[focusableElements.length - 1];

    // Move focus to the first focusable element when the trap opens
    firstFocusableElement.current.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab') {
        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusableElement.current) {
            event.preventDefault();
            lastFocusableElement.current?.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusableElement.current) {
            event.preventDefault();
            firstFocusableElement.current?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, ref, onClose]);
};
