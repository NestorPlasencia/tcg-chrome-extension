import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCookie } from '../utils/cookieUtils';

interface SessionContextProps {
  tcgPlayerSessionId: string;
  tcgCompareToken: string;
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tcgPlayerSessionId, setTcgPlayerSessionId] = useState<string>("");
  const [tcgCompareToken, setTcgCompareToken] = useState<string>("");

  useEffect(() => {
    if (window.location.hostname.includes("tcgplayer.com")) {
      const fetchSessionId = async () => {
        try {
          const visitorKey = await getCookie("mpapi.tcgplayer.com", "TCG_VisitorKey");
          setTcgPlayerSessionId(visitorKey);
        } catch (error) {
          setTcgPlayerSessionId("");
          console.error('Error fetching cookie:', error);
        }
      };

      fetchSessionId();
    }
  }, []);

  useEffect(() => {
    if (window.location.hostname.includes("tcgcompare.com")) {
      const fetchToken = async () => {
        try {
          const token = await getCookie(".tcgcompare.com", "XSRF-TOKEN");
          setTcgCompareToken(token);
        } catch (error) {
          chrome.runtime.sendMessage({ action: "getCookies", url: window.location.href }, (response) => {
            if (response?.cookies) {
              const token = response.cookies.find((cookie: any) => cookie.name === "XSRF-TOKEN")?.value;
              setTcgCompareToken(token);
            } else {
              console.error("No se pudieron obtener las cookies.");
            }
          });
        }
      };

      fetchToken();
    }
  }, []);

  return (
    <SessionContext.Provider value={{ tcgPlayerSessionId, tcgCompareToken }}>
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