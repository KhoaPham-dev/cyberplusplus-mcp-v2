import { Link, useLocation } from 'react-router-dom';

interface AdminSidebarProps {}

export const AdminSidebar: React.FC<AdminSidebarProps> = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Cybersecurity Training</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link 
              to="/admin/questions" 
              className={`block px-4 py-2 rounded transition-colors ${isActive('/admin/questions') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            >
              Questions
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/analytics" 
              className={`block px-4 py-2 rounded transition-colors ${isActive('/admin/analytics') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            >
              Analytics
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/settings" 
              className={`block px-4 py-2 rounded transition-colors ${isActive('/admin/settings') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
        <p>v1.0.0</p>
      </div>
    </div>
  );
};