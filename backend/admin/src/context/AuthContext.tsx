"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  getMe,
  login as apiLogin,
  logout as apiLogout,
  type AdminProfile,
  type LoginResponse,
} from "@/lib/auth-api";

interface AuthContextValue {
  user: AdminProfile | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<AdminProfile | null>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthRoute =
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/forgot-password") ||
    pathname?.startsWith("/reset-password");

  const refreshUser = useCallback(async (): Promise<AdminProfile | null> => {
    try {
      const profile = await getMe();
      setUser(profile);
      setError(null);
      return profile;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      // If we are already on an auth page, skip initial eager profile fetch
      if (isAuthRoute) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const profile = await getMe();
        if (isMounted) {
          setUser(profile);
          setError(null);
        }
      } catch {
        if (isMounted) {
          setUser(null);
          // If unauthenticated and on a protected page, navigate to /login
          router.replace("/login");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    initAuth();

    return () => {
      isMounted = false;
    };
  }, [isAuthRoute, router]);

  const login = useCallback(
    async (username: string, password: string): Promise<LoginResponse> => {
      setError(null);
      const res = await apiLogin(username, password);
      const profile: AdminProfile = {
        id: res.user.id,
        username: res.user.username,
        fullName: res.user.fullName,
        lastLoginAt: new Date().toISOString(),
      };
      setUser(profile);
      return res;
    },
    [],
  );

  const logout = useCallback(async (): Promise<void> => {
    try {
      await apiLogout();
    } catch {
      // Ignore network errors on logout to ensure client cleanup proceeds
    } finally {
      setUser(null);
      router.replace("/login");
    }
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
