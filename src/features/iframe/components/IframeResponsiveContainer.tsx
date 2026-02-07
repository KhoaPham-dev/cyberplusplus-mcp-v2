import { useState, useEffect } from 'react';

interface IframeResponsiveContainerProps {
  children: React.ReactNode;
}

export function IframeResponsiveContainer({ children }: IframeResponsiveContainerProps) {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine device type for responsive behavior
  const isMobile = dimensions.width < 768;
  const isTablet = dimensions.width >= 768 && dimensions.width < 1024;
  
  // Calculate responsive padding based on screen size
  const getPadding = () => {
    if (isMobile) return 'p-2';
    if (isTablet) return 'p-4';
    return 'p-6';
  };

  return (
    <div 
      className={`w-full h-full ${getPadding()} bg-white shadow-inner overflow-auto`} 
      style={{
        minHeight: '100vh',
        boxSizing: 'border-box'
      }}
    >
      {/* Cross-domain communication setup */}
      <div 
        className="w-full h-full"
        ref={(el) => {
          if (el) {
            // Setup cross-domain communication
            setupCrossDomainCommunication();
          }
        }}
      >
        {children}
      </div>
    </div>
  );
}

function setupCrossDomainCommunication() {
  // Setup postMessage listeners for cross-domain communication
  window.addEventListener('message', (event) => {
    // Verify origin for security
    // if (event.origin !== 'https://trusted-domain.com') return;
    
    // Handle messages from parent window
    switch (event.data.type) {
      case 'RESIZE_IFRAME':
        // Handle resize requests
        break;
      case 'THEME_CHANGE':
        // Handle theme changes
        break;
      default:
        // Ignore unknown messages
        break;
    }
  });

  // Notify parent of iframe load
  window.parent.postMessage({
    type: 'IFRAME_LOADED',
    height: document.body.scrollHeight
  }, '*');
}