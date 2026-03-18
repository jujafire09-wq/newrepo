import { Capacitor, registerPlugin } from '@capacitor/core';
import { supabase } from '@/integrations/supabase/client';

export const isNative = () => Capacitor.isNativePlatform();

export async function signInWithGoogleNative() {
  if (!isNative()) {
    // Web fallback — use standard OAuth redirect
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: { prompt: 'select_account' },
      },
    });
    if (error) throw error;
    return null;
  }

  // Native flow — use registerPlugin to access the Capacitor plugin
  // without importing the npm package (which breaks web builds)
  const GoogleAuth: any = registerPlugin('GoogleAuth');

  try {
    await GoogleAuth.initialize({
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });

    const googleUser = await GoogleAuth.signIn();
    const idToken = googleUser.authentication?.idToken;
    if (!idToken) {
      throw new Error('No ID token received from Google Sign-In');
    }

    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: idToken,
    });

    if (error) throw error;
    return data;
  } catch (err: any) {
    if (err?.message?.includes('popup_closed') || err?.message?.includes('canceled')) {
      return null;
    }
    throw err;
  }
}
