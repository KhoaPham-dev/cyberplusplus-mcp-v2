import { useState } from 'react';

interface AdminHeaderProps {
  onCreateQuestion: () => void;
  activeView: 'list' | 'editor';
  onViewChange: (view: 'list' | 'editor') => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  onCreateQuestion, 
  activeView, 
  onViewChange 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <header className="bg-white shadow-sm">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-800">
            {activeView === 'list' ? 'Question Management' : 'Question Editor'}
          </h1>
          
          {activeView === 'list' && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search questions..."
                className="pl-8 pr-4 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg 
                className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          {activeView === 'editor' && (
            <button 
              className="text-gray-600 hover:text-gray-900"
              onClick={() => onViewChange('list')}
            >
              Cancel
            </button>
          )}
          
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            onClick={onCreateQuestion}
          >
            New Question
          </button>
        </div>
      </div>
    </header>
  );
};