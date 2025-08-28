import { NextRequest } from 'next/server';

const BASE = 'http://46.202.88.87:8010/usuarios/api';

export async function GET(request: NextRequest) {
  try {
    const headers = new Headers(request.headers);
    headers.delete('host');
    headers.delete('content-length');

    const response = await fetch(`${BASE}/perfil/`, {
      method: 'GET',
      headers,
    });

    const responseHeaders = new Headers(response.headers);
    return new Response(response.body, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const runtime = 'nodejs';
