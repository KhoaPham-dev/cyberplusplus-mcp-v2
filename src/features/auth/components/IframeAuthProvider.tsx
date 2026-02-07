import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { validateAuthToken } from '@/features/auth/services/authService';
import { IframeResponsiveContainer } from '@/features/iframe/components/IframeResponsiveContainer';

interface IframeAuthProviderProps {
  children: React.ReactNode;
}

export function IframeAuthProvider({ children }: IframeAuthProviderProps) {
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, setSiteId } = useAuthStore();

  useEffect(() => {
    const validateToken = async () => {
      // Extract parameters from URL
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('access_token');
      const siteId = urlParams.get('siteId');

      if (!accessToken || !siteId) {
        setError('Missing authentication parameters');
        setIsValidating(false);
        return;
      }

      try {
        // Validate token with API
        const validationResponse = await validateAuthToken(accessToken, siteId);
        
        if (validationResponse.valid) {
          // Set user and site ID in store
          setUser(validationResponse.user);
          setSiteId(siteId);
          setIsAuthenticated(true);
        } else {
          setError('Invalid authentication token');
        }
      } catch (err) {
        console.error('Authentication error:', err);
        setError('Authentication failed');
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [setUser, setSiteId]);

  if (isValidating) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-8 bg-red-50 rounded-lg max-w-md">
          <h2 className="text-xl font-bold text-red-800 mb-2">Authentication Error</h2>
          <p className="text-red-600">{error}</p>
          <p className="text-gray-500 mt-4 text-sm">Please contact your administrator</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-8 bg-yellow-50 rounded-lg max-w-md">
          <h2 className="text-xl font-bold text-yellow-800 mb-2">Access Denied</h2>
          <p className="text-yellow-600">You don't have permission to access this content</p>
        </div>
      </div>
    );
  }

  return (
    <IframeResponsiveContainer>
      {children}
    </IframeResponsiveContainer>
  );
}