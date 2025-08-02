import * as React from 'react';

type Theme = 'dark';

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeProviderContext = React.createContext<ThemeProviderState | undefined>(undefined);

// The ThemeProvider is now a shell as dark mode is hardcoded in index.html.
// It exists to avoid breaking imports in other parts of the app.
export const ThemeProvider = ({ children }: {
    children: React.ReactNode;
    defaultTheme?: Theme; // Kept for prop compatibility
    storageKey?: string;  // Kept for prop compatibility
}) => {
    const value = {
        theme: 'dark' as const,
        setTheme: () => {}, // No-op function
    };

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
};

export const useTheme = () => {
    const context = React.useContext(ThemeProviderContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// Also export the type to be used in other components
export type { Theme };