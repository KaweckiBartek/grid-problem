
import React from 'react'

// Hook
export const useOnClickOutside = (ref: any, handler: any) => {
  React.useEffect(
    () => {
      const listener = (event : any) => {
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
    [ref, handler]
  );
}

// import { useEffect, useRef, RefObject } from 'react';

// export const useClickOutside = (onClick: Function): RefObject<HTMLDivElement> => {
//   const node: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

//   const handleClick = (e: MouseEvent): void => {
//     const { current } = node;
//     if (!current || current.contains(e.target as Node)) {
//       return;
//     }
//     onClick();
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClick);
//     return (): void => {
//       document.removeEventListener('mousedown', handleClick);
//     };
//   }, []);

//   return node;
// };
