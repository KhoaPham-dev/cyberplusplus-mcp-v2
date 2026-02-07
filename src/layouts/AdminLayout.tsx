import { useState } from 'react';
import { AdminSidebar } from '@/features/admin/components/AdminSidebar';
import { AdminHeader } from '@/features/admin/components/AdminHeader';
import { QuestionList } from '@/features/admin/components/QuestionList';
import { QuestionEditor } from '@/features/admin/components/QuestionEditor';

interface AdminLayoutProps {}

export const AdminLayout: React.FC<AdminLayoutProps> = () => {
  const [activeView, setActiveView] = useState<'list' | 'editor'>('list');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  const handleEditQuestion = (id: string) => {
    setSelectedQuestionId(id);
    setActiveView('editor');
  };

  const handleCreateQuestion = () => {
    setSelectedQuestionId(null);
    setActiveView('editor');
  };

  const handleBackToList = () => {
    setActiveView('list');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          onCreateQuestion={handleCreateQuestion}
          activeView={activeView}
          onViewChange={setActiveView}
        />
        
        <main className="flex-1 overflow-y-auto p-4">
          {activeView === 'list' ? (
            <QuestionList onEditQuestion={handleEditQuestion} />
          ) : (
            <QuestionEditor 
              questionId={selectedQuestionId} 
              onBack={handleBackToList} 
            />
          )}
        </main>
      </div>
    </div>
  );
};