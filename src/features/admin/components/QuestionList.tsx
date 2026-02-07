import { useState } from 'react';

interface Question {
  id: string;
  question: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
}

interface QuestionListProps {
  onEditQuestion: (id: string) => void;
}

export const QuestionList: React.FC<QuestionListProps> = ({ onEditQuestion }) => {
  const [questions] = useState<Question[]>([
    {
      id: '1',
      question: 'What is the most secure way to protect against phishing attacks?',
      category: 'Email Security',
      status: 'published',
      createdAt: '2023-01-15'
    },
    {
      id: '2',
      question: 'Which of the following is a strong password practice?',
      category: 'Password Security',
      status: 'published',
      createdAt: '2023-01-10'
    },
    {
      id: '3',
      question: 'What should you do if you receive a suspicious email?',
      category: 'Email Security',
      status: 'draft',
      createdAt: '2023-01-20'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Question
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {questions.map((question) => (
            <tr key={question.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 max-w-md truncate">
                  {question.question}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{question.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(question.status)}`}>
                  {question.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {question.createdAt}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEditQuestion(question.id)}
                  className="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {questions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No questions found</p>
        </div>
      )}
    </div>
  );
};