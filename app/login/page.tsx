import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
export default function LoginPage(){return <main className="container grid min-h-screen place-items-center py-12"><div className="w-full"><AuthForm mode="login"/><p className="mt-6 text-center text-sm text-muted-foreground"><Link href="/forgot-password">Forgot password?</Link> · <Link href="/signup">Create account</Link></p></div></main>}
