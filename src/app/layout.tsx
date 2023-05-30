import "./globals.css";

export const metadata = {
  title: "Tech Tree",
  description: "Welcome to Tech Tred!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body >{children}</body>
    </html>
  );
}
