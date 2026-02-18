import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "إزدهار ويب | باقة النمو الرقمي المتكاملة - السعودية، الإمارات، قطر، الكويت، عُمان",
  description: "خدمات تسويقية احترافية بجودة عالمية وأسعار تنافسية في الخليج. مواقع، متاجر، إعلانات جوجل، وإدارة سوشيال ميديا - باقة شاملة تبدأ من 99 دينار شهرياً.",
  keywords: "تسويق رقمي, تصميم مواقع, إعلانات جوجل, سوشيال ميديا, السعودية, الإمارات, قطر, الكويت, عُمان, إزدهار ويب",
  icons: {
    icon: "/ezdiharfav.png",
    shortcut: "/ezdiharfav.png",
    apple: "/ezdiharfav.png",
  },
  openGraph: {
    title: "إزدهار ويب | باقة النمو الرقمي المتكاملة",
    description: "خدمات تسويقية احترافية بجودة عالمية وأسعار تنافسية. مواقع، متاجر، إعلانات جوجل، وإدارة سوشيال ميديا.",
    type: "website",
    locale: "ar_SA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1433162158463755');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1433162158463755&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3Z6HTRV6EB"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3Z6HTRV6EB');
            `,
          }}
        />
        {/* End Google Analytics */}

        {children}
      </body>
    </html>
  );
}
