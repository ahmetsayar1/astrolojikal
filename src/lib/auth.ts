import { supabase } from './supabase/client';
import { AuthError, User } from '@supabase/supabase-js';

export const signIn = async (email: string, password: string): Promise<{
  user: User | null;
  error: AuthError | null;
}> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { user: data?.user || null, error };
  } catch (error) {
    console.error('Giriş hatası:', error);
    return { user: null, error: error as AuthError };
  }
};

export const signUp = async (email: string, password: string): Promise<{
  user: User | null;
  error: AuthError | null;
}> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    return { user: data?.user || null, error };
  } catch (error) {
    console.error('Kayıt hatası:', error);
    return { user: null, error: error as AuthError };
  }
};

export const signOut = async (): Promise<void> => {
  await supabase.auth.signOut();
};

export const resetPassword = async (email: string): Promise<{
  error: AuthError | null;
}> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    
    return { error };
  } catch (error) {
    console.error('Şifre sıfırlama hatası:', error);
    return { error: error as AuthError };
  }
};

export const updatePassword = async (newPassword: string): Promise<{
  error: AuthError | null;
}> => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    
    return { error };
  } catch (error) {
    console.error('Şifre güncelleme hatası:', error);
    return { error: error as AuthError };
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data } = await supabase.auth.getUser();
    return data?.user || null;
  } catch (error) {
    console.error('Kullanıcı bilgisi alma hatası:', error);
    return null;
  }
};

export const getUserSession = async () => {
  try {
    const { data } = await supabase.auth.getSession();
    return data.session;
  } catch (error) {
    console.error('Oturum bilgisi alma hatası:', error);
    return null;
  }
}; 