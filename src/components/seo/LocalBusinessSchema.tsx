export function LocalBusinessSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "PRG Property Group",
    "image": "https://prgpropertygroup.com/logo.png",
    "url": "https://prgpropertygroup.com",
    "telephone": "+13055550198",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1200 Brickell Ave, Suite 1500",
      "addressLocality": "Miami",
      "addressRegion": "FL",
      "postalCode": "33131",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.761681,
      "longitude": -80.191788
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Miami"
      },
      {
        "@type": "Neighborhood",
        "name": "Key Biscayne"
      },
      {
        "@type": "Neighborhood",
        "name": "Midtown Miami"
      },
      {
        "@type": "Neighborhood",
        "name": "Design District"
      }
    ],
    "priceRange": "$$$$"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
