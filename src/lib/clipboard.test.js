import { afterEach, describe, expect, it, vi } from 'vitest';
import { copyText } from './clipboard';
import { wifiPayload } from '../pages/Wifi';

afterEach(() => vi.restoreAllMocks());

describe('copyText', () => {
  it('utilise l’API Clipboard quand elle est disponible', async () => {
    const writeText = vi.fn().mockResolvedValue();
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    Object.defineProperty(window, 'isSecureContext', { value: true, configurable: true });
    expect(await copyText('abc')).toBe(true);
    expect(writeText).toHaveBeenCalledWith('abc');
  });

  it('retombe sur execCommand puis signale l’échec', async () => {
    Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true });
    document.execCommand = vi.fn().mockReturnValue(true);
    expect(await copyText('abc')).toBe(true);
    document.execCommand = vi.fn().mockReturnValue(false);
    expect(await copyText('abc')).toBe(false);
  });
});

describe('wifiPayload', () => {
  it('échappe les caractères spéciaux du format WIFI: (antislash compris)', () => {
    const BS = String.fromCharCode(92);
    const out = wifiPayload({ ssid: 'Mon;Wifi', password: ['a:b,c"d', 'e'].join(BS), security: 'WPA' });
    expect(out).toBe(['WIFI:T:WPA;S:Mon', BS, ';Wifi;P:a', BS, ':b', BS, ',c', BS, '"d', BS, BS, 'e;;'].join(''));
  });
});
