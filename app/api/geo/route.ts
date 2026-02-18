import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_COUNTRIES = ['SA', 'AE', 'QA', 'KW', 'OM'];
const DEFAULT_COUNTRY = 'SA';

export async function GET(request: NextRequest) {
    try {
        // Try to get country from Vercel/Cloudflare headers first (fastest, no external call)
        const vercelCountry = request.headers.get('x-vercel-ip-country');
        if (vercelCountry && SUPPORTED_COUNTRIES.includes(vercelCountry)) {
            return NextResponse.json({ country: vercelCountry });
        }

        const cfCountry = request.headers.get('cf-ipcountry');
        if (cfCountry && SUPPORTED_COUNTRIES.includes(cfCountry.toUpperCase())) {
            return NextResponse.json({ country: cfCountry.toUpperCase() });
        }

        // Fallback: use ip-api.com for local development / non-Vercel hosts
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded?.split(',')[0]?.trim() || '127.0.0.1';

        // Skip external call for localhost
        if (ip === '127.0.0.1' || ip === '::1') {
            return NextResponse.json({ country: DEFAULT_COUNTRY });
        }

        const res = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`, {
            next: { revalidate: 86400 }, // cache for 24h
        });

        if (res.ok) {
            const data = await res.json();
            const code = data.countryCode?.toUpperCase();
            if (SUPPORTED_COUNTRIES.includes(code)) {
                return NextResponse.json({ country: code });
            }
        }

        return NextResponse.json({ country: DEFAULT_COUNTRY });
    } catch {
        return NextResponse.json({ country: DEFAULT_COUNTRY });
    }
}
