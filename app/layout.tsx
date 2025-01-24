import { fetchFirebaseData } from "@/lib/api";
import { AppContextProvider } from "@/lib/AppContext";
import "@/styles/globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Magdalena Pęcak - Fotografia",
  description: "Opis aplikacji",
  icons: { icon: "/favicon.png" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await fetchFirebaseData();

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Arsenal:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppContextProvider initialData={data}>
          <>
            {children}
            <Footer />
          </>
        </AppContextProvider>
      </body>
    </html>
  );
}
