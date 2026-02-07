import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/stores/auth.store';
import { authService } from '@/features/auth/services/auth.service';

interface IframeAuthProviderProps {
  children: React.ReactNode;
}

export const IframeAuthProvider: React.FC<IframeAuthProviderProps> = ({ children }) => {
  const { setIsAuthenticated, setError, setLoading } = useAuthStore();

  useEffect(() => {
    const authenticate = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Parse URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token');
        const siteId = urlParams.get('siteId');
        
        // Validate required parameters
        if (!accessToken || !siteId) {
          throw new Error('Missing required authentication parameters');
        }
        
        // Validate access token and site ID
        const isValid = await authService.validateToken(accessToken, siteId);
        
        if (isValid) {
          setIsAuthenticated(true);
        } else {
          throw new Error('Invalid authentication credentials');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
        setError(errorMessage);
        console.error('Authentication error:', err);
      } finally {
        setLoading(false);
      }
    };

    authenticate();
  }, [setIsAuthenticated, setError, setLoading]);

  return <>{children}</>;
};