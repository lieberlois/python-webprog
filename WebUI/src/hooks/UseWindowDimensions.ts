import { useState, useEffect } from "react";

export interface IDimensions {
  readonly width: number;
  readonly height: number;
}

function getWindowDimensions(): IDimensions {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

export function useWindowDimensions(): IDimensions {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      const dimensions = getWindowDimensions();
      setWindowDimensions(dimensions);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // No dependencies, because this useEffect should only ever be called once adds an EventListener and we don't want to multiple EventListener
    // As this hook gets unmounted the EventListener will be removed
  }, []);

  return windowDimensions;
}
