import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type AudienceMode = 'share' | 'discover';

interface AudienceContextValue {
  mode: AudienceMode;
  setMode: (mode: AudienceMode) => void;
}

const STORAGE_KEY = 'jt-audience-mode';

const AudienceContext = createContext<AudienceContextValue | undefined>(undefined);

export const AudienceProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setModeState] = useState<AudienceMode>('share');

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored === 'share' || stored === 'discover') {
      setModeState(stored);
    }
  }, []);

  const setMode = (next: AudienceMode) => {
    setModeState(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, next);
    }
  };

  return (
    <AudienceContext.Provider value={{ mode, setMode }}>
      {children}
    </AudienceContext.Provider>
  );
};

export const useAudience = () => {
  const ctx = useContext(AudienceContext);
  if (!ctx) throw new Error('useAudience must be used within AudienceProvider');
  return ctx;
};

// Veilige variant: geeft null terug wanneer er geen provider is (bijv. op andere pagina's).
export const useAudienceOptional = () => {
  return useContext(AudienceContext) ?? null;
};