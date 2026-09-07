import { siteConfig } from "@/config/site";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  alternateName: siteConfig.legalName,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon/icon.png`,
  image: `${siteConfig.url}/icon/icon.png`,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.streetAddress,
    addressLocality: siteConfig.address.locality,
    postalCode: siteConfig.address.postalCode,
    addressRegion: siteConfig.address.region,
    addressCountry: siteConfig.address.country,
  },
  identifier: {
    "@type": "PropertyValue",
    name: "AMFI ARN",
    value: siteConfig.amfiArn,
  },
};
