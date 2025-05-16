import "@/app/globals.css";
import type { Metadata } from "next";
// import { Montserrat, Caveat, Indie_Flower } from "next/font/google";
import MainLayout from "@/components/layout/MainLayout";
import { Toaster } from "sonner";
import AuthProvider from "@/components/providers/AuthProvider";

// const montserrat = Montserrat({ 
//   subsets: ["latin"],
//   variable: '--font-montserrat',
// });

// const caveat = Caveat({
//   subsets: ["latin"],
//   variable: '--font-caveat',
// });

// const indieFlower = Indie_Flower({
//   weight: "400",
//   subsets: ["latin"],
//   variable: '--font-indie-flower',
// });

export const metadata: Metadata = {
  title: "UpCycle - Mode éco-responsable",
  description: "La marketplace qui permet aux créateurs de transformer des vêtements usagés en pièces uniques.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      {/* <body className={`${montserrat.variable} ${caveat.variable} ${indieFlower.variable} min-h-full`}> */}
      <body className={`min-h-full`}>
        <AuthProvider>
          <MainLayout>{children}</MainLayout>
          <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
