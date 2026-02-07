interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="text-center max-w-md w-full">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{message}</span>
      </div>
      
      <div className="mt-6 text-gray-600">
        <p>Please contact your system administrator or try again later.</p>
      </div>
    </div>
  );
};