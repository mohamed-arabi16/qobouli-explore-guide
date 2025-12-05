// TODO: Refactor to address react-refresh/only-export-components (move context/provider/hook to separate files if rule persists)
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SessionContextType {
  sessionId: string | null;
  setSessionId: (id: string | null) => void;
}

export const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [sessionId, setSessionId] = useState<string | null>(null);

  return (
    <SessionContext.Provider value={{ sessionId, setSessionId }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
