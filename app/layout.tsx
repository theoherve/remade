import "@/app/globals.css";
import type { Metadata } from "next";
import MainLayout from "@/components/layout/MainLayout";
import { Toaster } from "sonner";
import AuthProvider from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Remade - Mode éco-responsable",
  description: "La marketplace qui permet aux créateurs de transformer des vêtements usagés en pièces uniques.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      <body className={`min-h-full`}>
        <AuthProvider>
          <MainLayout>{children}</MainLayout>
          <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
