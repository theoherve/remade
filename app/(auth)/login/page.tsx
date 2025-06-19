import { Metadata } from "next"
import AuthSideHero from "@/components/auth/AuthSideHero"
import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh]">
      {/* Section gauche : image + texte, cachée sur mobile */}
      <AuthSideHero />
      {/* Section droite : formulaire */}
      <div className="flex flex-1 items-center justify-center bg-neutral-500">
        <div className="w-full max-w-md p-10">
          <h1 className="text-3xl font-unbounded font-bold mb-2 text-neutral-900">Connexion à votre compte</h1>
          <p className="text-lg font-unbounded mb-6 text-neutral-700">Entrez vos identifiants pour accéder à Remade</p>
          <LoginForm />
          <p className="mt-6 text-center text-sm text-neutral-600">
            <Link href="/register" className="hover:text-black underline underline-offset-4 font-unbounded">
              Pas encore de compte ? Inscrivez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
