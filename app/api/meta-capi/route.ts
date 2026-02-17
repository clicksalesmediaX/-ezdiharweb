import { NextRequest, NextResponse } from 'next/server';

const PIXEL_ID = process.env.META_PIXEL_ID || '1433162158463755';
const ACCESS_TOKEN = process.env.META_CAPI_TOKEN || '';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { event_name, event_id, source_url, user_agent, fbc, fbp } = body;

        if (!ACCESS_TOKEN) {
            return NextResponse.json(
                { error: 'META_CAPI_TOKEN is not configured' },
                { status: 500 }
            );
        }

        // Get client IP from headers
        const clientIp =
            request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            request.headers.get('x-real-ip') ||
            '0.0.0.0';

        // Build the CAPI event payload
        const eventData = {
            data: [
                {
                    event_name: event_name || 'Contact',
                    event_time: Math.floor(Date.now() / 1000),
                    event_id: event_id, // For deduplication with client-side Pixel
                    action_source: 'website',
                    event_source_url: source_url || '',
                    user_data: {
                        client_ip_address: clientIp,
                        client_user_agent: user_agent || '',
                        ...(fbc && { fbc }),
                        ...(fbp && { fbp }),
                    },
                    custom_data: {
                        currency: 'SAR',
                        value: '0',
                        content_name: 'WhatsApp Contact',
                        content_category: 'Lead',
                    },
                },
            ],
            // Test event code can be added here for debugging:
            // test_event_code: 'TEST12345',
        };

        // Send to Facebook Conversions API
        const response = await fetch(
            `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            console.error('Meta CAPI Error:', result);
            return NextResponse.json(
                { error: 'Failed to send event to Meta', details: result },
                { status: response.status }
            );
        }

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error('Meta CAPI Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
