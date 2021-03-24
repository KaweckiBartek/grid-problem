
import React from 'react'

// Hooks
export const useOnClickOutside = (ref: React.RefObject<HTMLDivElement>, handler: any) => {
  React.useEffect(
    () => {
      const listener = (event: any) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    [ ref, handler ]
  );
}
