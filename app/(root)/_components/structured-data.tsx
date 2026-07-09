export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Chelsea Portland House",
    url: "https://chelsea-portland.com",
    logo: "https://chelsea-portland.com/assets/logos/chelsea_portland_logo_152x56px.svg",
    image: "https://chelsea-portland.com/assets/images/hero_section_image.png",
    description:
      "Trusted UK commercial presence, local representation and practical support for overseas law firms, international businesses and investors. Based in London.",
    email: "partnerships@chelsea-portland.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Chelsea Portland House, 47–49 Park Royal Road",
      addressLocality: "London",
      postalCode: "NW10 7LG",
      addressCountry: "GB",
    },
    areaServed: "United Kingdom",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "partnerships@chelsea-portland.com",
        availableLanguage: ["English"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
