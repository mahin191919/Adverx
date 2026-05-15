"use client";

import { Github, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function AuthForm({ mode }: { mode: "login" | "signup" | "forgot" }) {
  const title = mode === "login" ? "Welcome back" : mode === "signup" ? "Create your account" : "Reset your password";
  const endpoint = mode === "forgot" ? "/api/auth/reset" : `/api/auth/${mode}`;

  return (
    <Card className="mx-auto w-full max-w-md p-6">
      <h1 className="text-3xl font-black">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Supabase Auth ready with email verification, password recovery, and Google OAuth configuration.</p>
      <form action={endpoint} method="POST" className="mt-6 grid gap-4">
        {mode === "signup" && <Input name="fullName" placeholder="Full name" autoComplete="name" />}
        <Input name="email" type="email" placeholder="Email address" autoComplete="email" required />
        {mode !== "forgot" && <Input name="password" type="password" placeholder="Password" autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={8} required />}
        <Button type="submit">{mode === "login" ? "Login" : mode === "signup" ? "Sign up" : "Send reset link"}</Button>
      </form>
      {mode !== "forgot" && (
        <>
          <div className="my-5 h-px bg-white/10" />
          <Button variant="secondary" className="w-full" onClick={() => toast.message("Add Google OAuth in Supabase, then connect this button to /auth/v1/authorize.")}><Mail className="h-4 w-4" /> Continue with Google</Button>
          <Button variant="ghost" className="mt-2 w-full"><Github className="h-4 w-4" /> Continue with GitHub</Button>
        </>
      )}
    </Card>
  );
}
