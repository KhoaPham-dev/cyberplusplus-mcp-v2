import axios from 'axios';

interface AuthRequest {
  access_token: string;
  siteId: string;
}

interface AuthResponse {
  valid: boolean;
  user?: {
    id: string;
    name: string;
  };
}

class AuthService {
  private apiUrl = 'https://api.example.com/v1'; // This would come from environment variables

  async validateToken(accessToken: string, siteId: string): Promise<boolean> {
    try {
      const response = await axios.post<AuthResponse>(`${this.apiUrl}/auth/validate`, {
        access_token: accessToken,
        siteId: siteId
      });
      
      return response.data.valid;
    } catch (error) {
      console.error('Authentication validation failed:', error);
      return false;
    }
  }
}

export const authService = new AuthService();