import { fetchFirebaseData } from "@/lib/api";
import "./globals.css";
import { AppContextProvider } from "@/lib/AppContext";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await fetchFirebaseData();

  return (
    <html lang="en">
      <body>
        <AppContextProvider initialData={data}>{children}</AppContextProvider>
      </body>
    </html>
  );
}
