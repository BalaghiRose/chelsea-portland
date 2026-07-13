type ContactCard = {
  icon?: "map" | "mail" | "globe";
  value: string;
};

export interface CmsSectionContent {
  sectionLabel: string;
  title?: string;
  paragraphs: string[];
  contactCards: ContactCard[];
  ctaLabel?: string;
  mapLink?: string;
  mapEmbedSrc?: string;
}

const DEFAULT_SECTION_CONTENT: Record<string, CmsSectionContent> = {
  about: {
    sectionLabel: "About Us",
    title: "Your Trusted Presence on the Ground in the UK",
    paragraphs: [
      "Chelsea Portland House was established by Hasan Balaghi, a British-qualified lawyer and co-founder of Balaghi & Rose Solicitors, after recognising that international clients often require more than legal and professional advice alone.",
      "Through working with overseas businesses, investors and advisers, Hasan identified a recurring challenge: clients could obtain expert advice, but often lacked a trusted presence within the United Kingdom to support, coordinate and assist with practical matters on the ground.",
      "Chelsea Portland House was created to bridge that gap.",
      "We support international clients seeking to establish, invest or expand within the United Kingdom, as well as those who already have existing UK business, investment, property or commercial interests requiring local support.",
      "Drawing on professional experience, commercial understanding and a trusted UK network, Chelsea Portland House provides overseas law firms, businesses, investors and private clients with a reliable point of contact within the United Kingdom.",
      "Our role is to understand each client’s objectives, coordinate with the appropriate professionals, facilitate introductions, support communication and provide practical involvement where UK-based assistance is beneficial.",
      "We work alongside existing advisers and professionals, helping clients turn international objectives into practical outcomes within the United Kingdom.",
    ],
    contactCards: [],
  },
  "how-we-help": {
    sectionLabel: "Who We Help",
    paragraphs: [
      "Chelsea Portland House works with overseas law firms, international businesses, investors, family offices, entrepreneurs and organisations with interests connected to the United Kingdom.",
      "Our clients include those seeking to enter the UK market, explore new opportunities or expand internationally, as well as those managing existing UK businesses, investments, property interests and commercial activities.",
      "We work closely with overseas law firms and professional advisers, supporting their clients where trusted UK involvement, coordination or local representation is required.",
      "From investors and business owners to developers, manufacturers and trading groups, our role is to provide a reliable UK connection that supports their wider objectives.",
    ],
    contactCards: [],
  },
  "why-us": {
    sectionLabel: "Why Us",
    paragraphs: [
      "International businesses, investors and private clients often require more than professional advice alone when dealing with matters connected to the United Kingdom.",
      "Whether establishing new opportunities or managing existing businesses, property interests, investments, transactions and projects, clients frequently require practical support and trusted involvement on the ground.",
      "Chelsea Portland House provides that solution.",
      "We act as a trusted UK representative, helping clients engage with stakeholders, coordinate projects, facilitate introductions and manage matters where local involvement is beneficial.",
      "Our clients benefit from having a reliable point of contact in the United Kingdom, supported by professional understanding, commercial insight and an established network of trusted relationships.",
      "Working alongside clients and their advisers, we help maintain clear communication, support progress and ensure matters receive the attention required.",
      "For many of our clients, Chelsea Portland House becomes their trusted first point of contact for UK-related matters.",
    ],
    contactCards: [],
  },
  contact: {
    sectionLabel: "Contact Us",
    paragraphs: [
      "For enquiries relating to UK business, investment, property or commercial interests, please contact Chelsea Portland House.",
      "We welcome enquiries from overseas law firms, businesses, investors and private clients.",
    ],
    contactCards: [
      {
        icon: "map",
        value:
          "Chelsea Portland House,\n47–49 Park Royal Road, London, NW10 7LG, United Kingdom.",
      },
      {
        icon: "mail",
        value: "partnerships@chelsea-portland.com",
      },
      {
        icon: "globe",
        value: "chelsea-portland.com",
      },
    ],
  },
  location: {
    sectionLabel: "London, United Kingdom",
    paragraphs: [
      "Located in North West London and supporting clients with interests across the United Kingdom.",
    ],
    contactCards: [],
    ctaLabel: "View on Google Maps",
    mapLink:
      "https://www.google.com/maps/place/Premier+Business+Centre/@51.5270563,-0.2693782,17z",
    mapEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.2455296996804!2d-0.26937817309932743!3d51.527056309266804!2m3!1f0!2f0!3f0!3m2!1s0x487611841acf0d3f%3A0xe3783e4c6636329!2sPremier+Business+Centre!5e0!3m2!1sen!2s!4v1782977736137!5m2!1sen!2s",
  },
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normaliseParagraphs(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item ?? "").trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\n+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function normalizeSectionContent(
  section: string,
  content?: unknown
): CmsSectionContent {
  const fallback = DEFAULT_SECTION_CONTENT[section] ?? {};
  const source = isObject(content) ? content : {};

  const paragraphs = normaliseParagraphs(source.paragraphs).length
    ? normaliseParagraphs(source.paragraphs)
    : fallback.paragraphs ?? [];

  const contactCards: ContactCard[] = Array.isArray(source.contactCards)
    ? source.contactCards.reduce<ContactCard[]>((results, item) => {
        if (!isObject(item) || typeof item.value !== "string") {
          return results;
        }

        const value = item.value.trim();
        if (!value) {
          return results;
        }

        const icon = item.icon;

        results.push({
          icon:
            icon === "map" || icon === "mail" || icon === "globe"
              ? icon
              : undefined,
          value,
        });

        return results;
      }, [])
    : fallback.contactCards ?? [];

  return {
    sectionLabel:
      typeof source.sectionLabel === "string"
        ? source.sectionLabel
        : fallback.sectionLabel ?? "",
    title:
      typeof source.title === "string" ? source.title : fallback.title,
    paragraphs,
    contactCards,
    ctaLabel:
      typeof source.ctaLabel === "string" ? source.ctaLabel : fallback.ctaLabel,
    mapLink:
      typeof source.mapLink === "string" ? source.mapLink : fallback.mapLink,
    mapEmbedSrc:
      typeof source.mapEmbedSrc === "string"
        ? source.mapEmbedSrc
        : fallback.mapEmbedSrc,
  };
}
