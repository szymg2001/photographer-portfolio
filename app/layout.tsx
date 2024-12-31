import { fetchFirebaseData } from "@/lib/api";
import { AppContextProvider } from "@/lib/AppContext";
import "./globals.css";
import Footer from "./components/Footer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await fetchFirebaseData();

  return (
    <html lang="en">
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
