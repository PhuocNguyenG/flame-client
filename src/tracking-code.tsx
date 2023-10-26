import Script from "next/script";

const TrackingCode = () => {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-QG7650LCV9"
      ></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-QG7650LCV9');
`}
      </Script>
    </>
  );
};

export default TrackingCode;
