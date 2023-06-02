import "./globals.css";

export const metadata = {
  title: "Tech Tree",
  description: "Welcome to Tech Tree!",
  name: "viewport",
  content: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="flex h-[100dvh] w-screen justify-center bg-slate-50">
        <div className="relative h-full w-full max-w-[28.125rem] px-[1.375rem] bg-[#FCFDFF] text-[#242424] font-normal text-base leading-[1.375rem] font-sans">
          {children}
        </div>
      </body>
    </html>
  );
}
