// context/AuthContext.js
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    console.log("Fetching initial session...");
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) console.error("Error fetching session:", error);
      setSession(session);
    });

    console.log("Setting up auth state listener...");
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session);
      setSession(session);
    });

    return () => {
      console.log("Unsubscribing auth listener...");
      subscription.unsubscribe();
    };
  }, []);

  async function signUp(email, password, fullName) {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    console.log("Attempting sign up:", { email, fullName });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName || "Unknown" } },
    });
    if (error) {
      console.error("Sign up error:", error);
      throw error;
    }
    console.log("Sign up successful:", data);
    return data;
  }

  async function signIn(email, password) {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    console.log("Attempting sign in:", { email });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Sign in error:", error);
      throw error;
    }
    console.log("Sign in successful:", data);
    return data;
  }

  async function signOut() {
    console.log("Attempting sign out...");
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out error:", error);
      throw error;
    }
    console.log("Sign out successful");
  }

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user || null, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
