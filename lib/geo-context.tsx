'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
    type CountryCode,
    type CountryConfig,
    COUNTRY_CONFIGS,
    DEFAULT_COUNTRY,
    getCountryConfig,
    ALL_COUNTRY_CODES,
} from './country-config';

interface GeoContextType {
    config: CountryConfig;
    countryCode: CountryCode;
    setCountry: (code: CountryCode) => void;
    isLoading: boolean;
}

const GeoContext = createContext<GeoContextType>({
    config: COUNTRY_CONFIGS[DEFAULT_COUNTRY],
    countryCode: DEFAULT_COUNTRY,
    setCountry: () => { },
    isLoading: true,
});

export function GeoProvider({ children }: { children: React.ReactNode }) {
    const [countryCode, setCountryCode] = useState<CountryCode>(DEFAULT_COUNTRY);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check localStorage for manual override first
        const saved = localStorage.getItem('geo-country');
        if (saved && ALL_COUNTRY_CODES.includes(saved as CountryCode)) {
            setCountryCode(saved as CountryCode);
            setIsLoading(false);
            return;
        }

        // Auto-detect via API
        fetch('/api/geo')
            .then((res) => res.json())
            .then((data) => {
                if (data.country && ALL_COUNTRY_CODES.includes(data.country)) {
                    setCountryCode(data.country as CountryCode);
                }
            })
            .catch(() => {
                // Keep default (SA) on error
            })
            .finally(() => setIsLoading(false));
    }, []);

    const setCountry = useCallback((code: CountryCode) => {
        setCountryCode(code);
        localStorage.setItem('geo-country', code);
    }, []);

    const config = getCountryConfig(countryCode);

    // Set CSS custom properties for dynamic theming
    useEffect(() => {
        document.documentElement.style.setProperty('--accent', config.accentColor);
        document.documentElement.style.setProperty('--accent-dark', config.accentColorDark);
        document.documentElement.style.setProperty('--accent-rgb', config.accentRgb);
    }, [config]);

    // Update document title dynamically
    useEffect(() => {
        document.title = config.seoTitle;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', config.seoDescription);
        }
    }, [config]);

    return (
        <GeoContext.Provider value={{ config, countryCode, setCountry, isLoading }}>
            {children}
        </GeoContext.Provider>
    );
}

export function useGeo() {
    return useContext(GeoContext);
}

// Country Selector component
export function CountrySelector({ className }: { className?: string }) {
    const { countryCode, setCountry } = useGeo();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`relative ${className || ''}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium backdrop-blur-sm border border-white/10"
                aria-label="اختر الدولة"
            >
                <span className="text-lg leading-none">{COUNTRY_CONFIGS[countryCode].flag}</span>
                <span className="hidden sm:inline text-xs">{COUNTRY_CONFIGS[countryCode].name}</span>
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50 min-w-[160px]">
                        {ALL_COUNTRY_CODES.map((code) => {
                            const c = COUNTRY_CONFIGS[code];
                            return (
                                <button
                                    key={code}
                                    onClick={() => {
                                        setCountry(code);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-right ${countryCode === code
                                            ? 'bg-slate-100 text-slate-900'
                                            : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <span className="text-lg">{c.flag}</span>
                                    <span>{c.name}</span>
                                    {countryCode === code && (
                                        <span className="mr-auto text-xs" style={{ color: c.accentColor }}>✓</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
