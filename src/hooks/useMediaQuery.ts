import { useState, useEffect } from 'react';

/**
 * A custom React hook that tracks the state of a CSS media query.
 * 
 * @param {string} query - The media query to match against
 * @returns {boolean} Whether the media query currently matches
 * 
 * @example
 * // Check if the viewport is at least 768px wide
 * const isDesktop = useMediaQuery('(min-width: 768px)');
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Ensure window is defined (for SSR/SSG)
    if (typeof window === 'undefined') return;


    // Create media query
    const mediaQuery = window.matchMedia(query);
    
    // Update state with current match value
    setMatches(mediaQuery.matches);

    // Create event listener callback
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add event listener for changes
    mediaQuery.addEventListener('change', listener);

    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;