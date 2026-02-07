import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminLayout } from '@/layouts/AdminLayout';
import { GameLayout } from '@/layouts/GameLayout';
import { IframeAuthProvider } from '@/features/auth/components/IframeAuthProvider';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminLayout />} />
        
        {/* Game routes (embedded in iframe) */}
        <Route 
          path="/*" 
          element={
            <IframeAuthProvider>
              <GameLayout />
            </IframeAuthProvider>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;