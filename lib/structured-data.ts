// Structured Data (JSON-LD) for SEO
// https://schema.org

type Organization = {
  '@context': string
  '@type': string
  '@id': string
  name: string
  legalName: string
  url: string
  logo: string
  description: string
  sameAs?: string[]
  contactPoint: {
    '@type': string
    contactType: string
    availableLanguage: string[]
    areaServed: {
      '@type': string
      name: string
    }
  }
}

type WebApplication = {
  '@context': string
  '@type': string
  '@id': string
  name: string
  applicationCategory: string
  applicationSubCategory: string
  operatingSystem: string
  browserRequirements: string
  url: string
  description: string
  inLanguage: string[]
  screenshot: string
  offers: Array<{
    '@type': string
    name: string
    description: string
    priceCurrency: string
  }>
  featureList: string[]
  audience: {
    '@type': string
    audienceType: string
    geographicArea: {
      '@type': string
      name: string
    }
  }
}

export function getOrganizationSchema(): Organization {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://dentobridge.com/#organization',
    name: 'DentoBridge',
    legalName: 'DentoBridge',
    url: 'https://dentobridge.com',
    logo: 'https://dentobridge.com/Logo_Vertical_80.png',
    description: 'Plateforme SaaS de gestion de laboratoire dentaire pour l\'Algérie',
    sameAs: [
      // TODO: Add actual social media URLs
      // 'https://www.facebook.com/dentobridge',
      // 'https://www.instagram.com/dentobridge',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['French', 'Arabic'],
      areaServed: {
        '@type': 'Country',
        name: 'Algeria',
      },
    },
  }
}

export function getSoftwareApplicationSchema(): WebApplication {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': 'https://dentobridge.com/#software',
    name: 'DentoBridge',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'HealthcareApplication',
    operatingSystem: 'Web Browser',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    url: 'https://dentobridge.com',
    description: 'Plateforme SaaS de gestion de laboratoire dentaire pour l\'Algérie. Facturation en un clic, réception de scans en ligne, communication intégrée.',
    inLanguage: ['fr-DZ', 'fr'],
    screenshot: 'https://dentobridge.com/og-image.png',
    offers: [
      {
        '@type': 'Offer',
        name: 'Silver Smile',
        description: 'Package de démarrage pour laboratoires dentaires',
        priceCurrency: 'DZD',
        // TODO: Add actual price when available
      },
      {
        '@type': 'Offer',
        name: 'Gold Crown',
        description: 'Package premium pour laboratoires dentaires',
        priceCurrency: 'DZD',
        // TODO: Add actual price when available
      },
    ],
    featureList: [
      'Gestion centralisée des commandes',
      'Facturation automatique conforme aux normes algériennes',
      'Réception de scans d\'empreintes en ligne',
      'Communication intégrée avec les dentistes',
      'Suivi des travaux en temps réel',
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'Dental Laboratories',
      geographicArea: {
        '@type': 'Country',
        name: 'Algeria',
      },
    },
  }
}

export function getAllStructuredData() {
  return [
    getOrganizationSchema(),
    getSoftwareApplicationSchema(),
  ]
}
