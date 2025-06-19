import { Metadata } from "next"
import Link from "next/link"
import AuthSideHero from "@/components/auth/AuthSideHero"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Inscription",
  description: "Créez votre compte UpCycle",
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-[80vh]">
      {/* Section gauche : image + texte, cachée sur mobile */}
      <AuthSideHero />
      {/* Section droite : formulaire */}
      <div className="flex flex-1 items-center justify-center bg-neutral-500">
        <div className="w-full max-w-md p-10">
          <h1 className="text-3xl font-unbounded font-bold mb-2 text-neutral-900">Créer un compte</h1>
          <p className="text-lg font-unbounded mb-6 text-neutral-700">Entrez vos informations pour créer votre compte</p>
          <RegisterForm />
          <p className="mt-6 text-center text-sm text-neutral-600">
            <Link href="/login" className="hover:text-black underline underline-offset-4 font-unbounded">
              Déjà un compte ? Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 