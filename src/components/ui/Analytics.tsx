"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { readConsent, CONSENT_UPDATED_EVENT, type ConsentPreferences } from "@/lib/utils/cookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;

export function Analytics() {
  const [consent, setConsent] = useState<ConsentPreferences | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads localStorage, which only exists client-side; must happen post-mount.
    setConsent(readConsent());
    const onUpdate = (e: Event) => setConsent((e as CustomEvent<ConsentPreferences>).detail);
    window.addEventListener(CONSENT_UPDATED_EVENT, onUpdate);
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, onUpdate);
  }, []);

  if (!consent) return null;

  return (
    <>
      {consent.analytics && GA_ID ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');`}
          </Script>
        </>
      ) : null}

      {consent.marketing && META_PIXEL_ID ? (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');`}
        </Script>
      ) : null}

      {consent.marketing && LINKEDIN_PARTNER_ID ? (
        <Script id="linkedin-insight-init" strategy="afterInteractive">
          {`_linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];
            var b=document.createElement("script");b.type="text/javascript";b.async=true;
            b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b,s);})(window.lintrk);`}
        </Script>
      ) : null}
    </>
  );
}
