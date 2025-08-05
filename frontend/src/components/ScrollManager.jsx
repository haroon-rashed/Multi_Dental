import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const ScrollManager = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const scrollPositions = useRef(new Map());
  const isRestoringRef = useRef(false);

  useEffect(() => {
    const currentPath = location.pathname + location.search; // Include search params in the key

    if (navigationType === 'POP') {
      // Back/forward navigation - restore scroll position
      const savedPosition = scrollPositions.current.get(currentPath);
      if (savedPosition !== undefined) {
        isRestoringRef.current = true;
        window.scrollTo({
          top: savedPosition,
          behavior: 'auto'
        });
        // Reset the flag after a short delay
        setTimeout(() => {
          isRestoringRef.current = false;
        }, 100);
      } else {
        // If no saved position, scroll to top
        window.scrollTo(0, 0);
      }
    } else {
      // New navigation - scroll to top
      window.scrollTo(0, 0);
    }

    // Save scroll position when scrolling
    const handleScroll = () => {
      if (!isRestoringRef.current) {
        scrollPositions.current.set(currentPath, window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Save final scroll position when leaving the page
      if (!isRestoringRef.current) {
        scrollPositions.current.set(currentPath, window.scrollY);
      }
    };
  }, [location, navigationType]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      scrollPositions.current.clear();
    };
  }, []);

  return null;
};

export default ScrollManager;
