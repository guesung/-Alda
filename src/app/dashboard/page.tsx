import Script from "next/script";

export default function Dashboard() {
  return (
    <>
      <Script
        type="application/javascript"
        src="/assets/packages/flutter_inappwebview/assets/web/web_support.js"
      />
    </>
  );
}
