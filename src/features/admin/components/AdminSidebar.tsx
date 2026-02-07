import { Link, useLocation } from 'react-router-dom';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Questions', path: '/admin/questions', icon: '❓' },
    { name: 'Players', path: '/admin/players', icon: '👥' },
    { name: 'Reports', path: '/admin/reports', icon: '📈' },
    { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button 
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-2 text-base font-medium rounded-md ${isActive(item.path) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-400">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}