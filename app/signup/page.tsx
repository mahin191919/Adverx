import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
export default function SignupPage(){return <main className="container grid min-h-screen place-items-center py-12"><div className="w-full"><AuthForm mode="signup"/><p className="mt-6 text-center text-sm text-muted-foreground">Already registered? <Link href="/login">Login</Link></p></div></main>}
