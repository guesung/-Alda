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
      <body className="flex h-[100dvh] w-screen justify-center bg-slate-50">
        <div className="relative h-full w-full max-w-[360px] bg-white px-[1.375rem] ">
          {children}
        </div>
      </body>
    </html>
  );
}
