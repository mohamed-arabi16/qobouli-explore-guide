// FE-2: Local metadata look-ups for university data

export interface UniversityMeta {
  logo: string; // URL to the logo
  currency: string; // e.g., "USD", "TRY"
  country_en: string;
  country_ar: string;
}

export const universityMetaData: Record<string, UniversityMeta> = {
  // TODO: Populate this with actual data for all universities
  // The key should be the exact 'university_name' string from the 'programs_view'.
  "Istanbul University": {
    logo: "/logos/istanbul-university-logo.png", // Example path, ensure logos are in /public/logos or similar
    currency: "TRY",
    country_en: "Turkey",
    country_ar: "تركيا",
  },
  "Bahcesehir University": {
    logo: "/logos/bahcesehir-university-logo.png",
    currency: "USD",
    country_en: "Turkey",
    country_ar: "تركيا",
  },
  // Add more universities here...
};

// Helper function to safely get meta data
export const getUniversityMeta = (universityName: string): UniversityMeta | null => {
  return universityMetaData[universityName] || null;
};
