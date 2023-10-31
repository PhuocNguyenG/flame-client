import Script from "next/script";

const ScriptConfig = () => {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-QG7650LCV9"
      />
      <Script id="google-analytics" defer>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-QG7650LCV9');
        `}
      </Script>

      <script
        async
        id="sitelinks-search-box-script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Nông sản Flame",
              url: "https://flameagricultural.com",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://flameagricultural.com/tim-kiem?s={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            },
            null,
            "\t"
          ),
        }}
        data-nscript="beforeInteractive"
      />
      {/* eslint-disable-next-line @next/next/next-script-for-ga */}
      <script
        defer
        id="gtm-script"
        dangerouslySetInnerHTML={{
          __html: `setTimeout(() => {
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                "https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MT9NB5T9');
          }, 2000);`,
        }}
      />
    </>
  );
};

export default ScriptConfig;
