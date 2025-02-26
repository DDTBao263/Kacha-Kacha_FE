import { ReactNode } from 'react';

const OutLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      {children}
    </div>
  );
};

export default OutLayout;
