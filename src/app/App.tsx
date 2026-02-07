import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminLayout } from '@/layouts/AdminLayout';
import { IframeAuthProvider } from '@/features/auth/components/IframeAuthProvider';
import { AdminDashboard } from '@/features/admin/components/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Iframe route with authentication */}
        <Route 
          path="/iframe" 
          element={
            <IframeAuthProvider>
              <div className="w-full h-screen bg-gray-50">
                <div className="container mx-auto p-4">
                  <h1 className="text-2xl font-bold mb-4">Cybersecurity Training Game</h1>
                  <p className="text-gray-600">Game content will appear here after authentication</p>
                </div>
              </div>
            </IframeAuthProvider>
          } 
        />
        
        {/* Admin route */}
        <Route path="/admin/*" element={<AdminLayout />} />
        
        {/* Default route */}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;