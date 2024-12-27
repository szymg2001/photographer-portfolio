import { fetchFirebaseData } from "@/lib/api";
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await fetchFirebaseData();

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
