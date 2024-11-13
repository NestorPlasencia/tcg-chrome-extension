
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCookie } from '../utils/cookieUtils';

interface SessionContextProps {
  sessionId: string;
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    const fetchSessionId = async () => {
      try {
        const visitorKey = await getCookie("mpapi.tcgplayer.com", "TCG_VisitorKey");
        setSessionId(visitorKey);
      } catch (error) {
        setSessionId("");
        console.error('Error fetching cookie:', error);
      }
    };

    fetchSessionId();
  }, []);

  return (
    <SessionContext.Provider value={{ sessionId }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextProps => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};