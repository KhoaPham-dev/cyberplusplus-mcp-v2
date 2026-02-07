import { useState, useEffect } from 'react';

interface QuestionFormData {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
}

interface QuestionEditorProps {
  questionId: string | null;
  onBack: () => void;
}

export const QuestionEditor: React.FC<QuestionEditorProps> = ({ questionId, onBack }) => {
  const isEditing = !!questionId;
  
  const [formData, setFormData] = useState<QuestionFormData>({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    category: '',
    status: 'draft'
  });
  
  // Load question data if editing
  useEffect(() => {
    if (isEditing) {
      // In a real app, this would fetch from API
      setFormData({
        question: 'What is the most secure way to protect against phishing attacks?',
        options: [
          'Click on all links to verify they are safe',
          'Forward suspicious emails to colleagues for verification',
          'Verify sender identity and look for signs of phishing',
          'Disable email security software to reduce false positives'
        ],
        correctAnswer: 2,
        explanation: 'Always verify the sender\'s identity and look for red flags like spelling errors, urgent language, and suspicious links.',
        category: 'Email Security',
        status: 'published'
      });
    }
  }, [isEditing]);
  
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };
  
  const handleCorrectAnswerChange = (index: number) => {
    setFormData({ ...formData, correctAnswer: index });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to API
    console.log('Saving question:', formData);
    onBack();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {isEditing ? 'Edit Question' : 'Create New Question'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
            Question
          </label>
          <textarea
            id="question"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Answer Options
          </label>
          
          <div className="space-y-3">
            {formData.options.map((option, index) => (
              <div key={index} className="flex items-start">
                <div className="flex items-center h-5 mt-1">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={formData.correctAnswer === index}
                    onChange={() => handleCorrectAnswerChange(index)}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="explanation" className="block text-sm font-medium text-gray-700 mb-1">
            Explanation
          </label>
          <textarea
            id="explanation"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.explanation}
            onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
            placeholder="Explain why the correct answer is correct..."
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">Select a category</option>
              <option value="Email Security">Email Security</option>
              <option value="Password Security">Password Security</option>
              <option value="Network Security">Network Security</option>
              <option value="Social Engineering">Social Engineering</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={onBack}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isEditing ? 'Update Question' : 'Create Question'}
          </button>
        </div>
      </form>
    </div>
  );
};