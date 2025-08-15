import { API_BASE, HMAC_SECRET } from '../env';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import encHex from 'crypto-js/enc-hex';

export async function apiPost(path: string, payload: any) {
  const ts = Date.now().toString();
  const base = `${ts}:POST:${path}:${JSON.stringify(payload||{})}`;
  const sig = HmacSHA256(base, HMAC_SECRET).toString(encHex);
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-visiongram-ts': ts,
      'x-visiongram-sig': sig,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
