
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ApiKeyContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  isKeySet: boolean;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider = ({ children }: { children: ReactNode }) => {
  const [apiKey, setApiKey] = useState<string>('');

  // Load API key from localStorage on initial render
  useEffect(() => {
    const savedKey = localStorage.getItem('spoonacular_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  // Save API key to localStorage when it changes
  const handleSetApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('spoonacular_api_key', key);
  };

  return (
    <ApiKeyContext.Provider
      value={{
        apiKey,
        setApiKey: handleSetApiKey,
        isKeySet: apiKey.length > 0,
      }}
    >
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = () => {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
};
