import AuthLayout from "@/components/AuthLayout";
import Providers from "./Providers";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html className="light">
        <body>{children}</body>
      </html>
    </Providers>
  );
}
