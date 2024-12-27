import { fetchFirebaseData } from "@/lib/api";
import { AppContextProvider } from "@/lib/AppContext";
import "./globals.css";

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
