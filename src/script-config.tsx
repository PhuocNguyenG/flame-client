import Script from "next/script";

const ScriptConfig = () => {
  return (
    <>
      {/* Google tag  */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-QG7650LCV9" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-QG7650LCV9');
        `}
      </Script>
      <Script
        id="gtm-script"
        dangerouslySetInnerHTML={{
          __html: `setTimeout(() => {
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                "https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MT9NB5T9');
          }, 3000);`,
        }}
      />
      {/* End Google tag */}

      <script
        async
        id="sitelinks-search-box-script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "#nongsanflame",
              name: "Nông sản Flame",
              alternateName: "Nông sản Flame",
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
      <script
        async
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              "@context": "http://schema.org",
              "@type": "NewsArticle",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://google.com/article",
              },
              headline: "Nông sản Flame",
              image: {
                "@type": "ImageObject",
                url: "https://flameagricultural.com/static/flame-logo.svg",
                height: 100,
                width: 100,
              },
              dateModified: new Date(),
              author: {
                "@type": "Person",
                name: "Công Ty TNHH Thương Mại Dịch Vụ Xuất Nhập Khẩu Phước Linh",
              },
              publisher: {
                "@type": "Organization",
                name: "Nông sản Flame",
                logo: {
                  "@type": "ImageObject",
                  url: "flameagricultural.com/static/flame-logo-simple.png",
                  width: 100,
                  height: 100,
                },
              },
              description:
                "Nông sản Flame | Chuyên cung cấp các sản phẩm về nông sản, xuất nhập khẩu thế giới.",
            },
            null,
            "\t"
          ),
        }}
        data-nscript="beforeInteractive"
      />
      <script
        async
        id="logo-organization-script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              url: "https://flameagricultural.com",
              logo: "flameagricultural.com/static/flame-logo-simple.png",
            },
            null,
            "\t"
          ),
        }}
        data-nscript="beforeInteractive"
      />
    </>
  );
};

export default ScriptConfig;
