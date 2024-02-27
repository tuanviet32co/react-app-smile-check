import { useEffect, useState } from 'react';
import { throttle } from 'lodash';

 const BREAKPOINT = {
  SM: 640,
  MD: 768,
  LG: 1024,
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
    isSm: boolean;
    isMd: boolean;
    isLg: boolean;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
    isSm: true,
    isMd: false,
    isLg: false,
  });

  const handleResize = throttle(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
      isSm: window.innerWidth >= BREAKPOINT.SM,
      isMd: window.innerWidth >= BREAKPOINT.MD,
      isLg: window.innerWidth >= BREAKPOINT.LG,
    });
  }, 500);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};
