import { NextRequest } from 'next/server';

const BASE = 'http://46.202.88.87:8010/usuarios/api';

export async function PATCH(request: NextRequest) {
  try {
    const headers = new Headers(request.headers);
    headers.delete('host');
    headers.delete('content-length');

    const response = await fetch(`${BASE}/perfil/foto/`, {
      method: 'PATCH',
      headers,
      body: request.body,
      duplex: 'half',
    } as RequestInit);

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
