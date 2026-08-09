import type { AssessmentLevel } from "./analysis-data";
import type { ProductCategory } from "./mock-data";

export type SourceCategory =
  | "government"
  | "regulatory"
  | "scientific"
  | "product_information"
  | "food_database";

export type SourceAuthority = "primary" | "scientific" | "supporting";

export type EvidenceSourceDetail = {
  id: string;
  sourceName: string;
  sourceType: SourceCategory;
  authority: SourceAuthority;
  summary: string;
  relevantInformation: string;
  usedFor: string[];
  url?: string;
  lastUpdated?: string;
};

export type AssessmentFactor = {
  category: "ingredients" | "nutrition" | "data_quality";
  title: string;
  description: string;
};

export type IngredientEvidenceItem = {
  id: string;
  name: string;
  function: string;
  assessment: AssessmentLevel;
  evidence: string;
  source: string;
};

export type NutritionEvidenceItem = {
  nutrient: string;
  value: string;
  source: string;
  usedInAssessment: boolean;
};

export type EvidencePageData = {
  id: string;
  productName: string;
  brand: string;
  category: ProductCategory;
  barcode: string;
  scanDate: string;
  assessment: AssessmentLevel;
  assessmentDescription: string;
  assessmentFactors: AssessmentFactor[];
  sources: EvidenceSourceDetail[];
  ingredientEvidence: IngredientEvidenceItem[];
  nutritionEvidence: NutritionEvidenceItem[];
  evidenceStatus: "sufficient" | "limited" | "insufficient";
  evidenceStatusExplanation: string;
  dataQuality: "high" | "medium" | "low";
  dataQualityExplanation: string;
  aiExplanation: string;
};

const MOCK_EVIDENCE: Record<string, EvidencePageData> = {
  "8901234567890": {
    id: "ev-001",
    productName: "GlowCare Face Wash",
    brand: "GlowCare",
    category: "cosmetics",
    barcode: "8901234567890",
    scanDate: "09 Aug 2026",
    assessment: "moderate",
    assessmentDescription:
      "Some aspects of this product deserve closer attention based on its ingredient profile. While generally safe for most users, certain ingredients may warrant consideration for sensitive individuals.",
    assessmentFactors: [
      {
        category: "ingredients",
        title: "Ingredient Factors",
        description:
          "Several ingredients were identified for additional attention, including sodium lauryl sulfate (known irritant) and methylparaben (under regulatory review).",
      },
      {
        category: "ingredients",
        title: "Fragrance Disclosure",
        description:
          "The fragrance blend is proprietary and individual components are not disclosed, limiting full transparency.",
      },
      {
        category: "data_quality",
        title: "Data Quality",
        description:
          "The available product information was sufficient for the current assessment. Ingredient data was sourced from regulatory databases and peer-reviewed research.",
      },
    ],
    sources: [
      {
        id: "src-001",
        sourceName: "EWG Skin Deep Database",
        sourceType: "food_database",
        authority: "supporting",
        summary:
          "Comprehensive database rating cosmetic ingredients based on available safety data. Provides hazard scores and usage information.",
        relevantInformation:
          "Ingredient hazard ratings and known concerns for each component in the formulation.",
        usedFor: ["Ingredient safety ratings", "Hazard identification"],
        url: "https://www.ewg.org/skindeep/",
        lastUpdated: "2026",
      },
      {
        id: "src-002",
        sourceName: "EU Scientific Committee on Consumer Safety",
        sourceType: "regulatory",
        authority: "primary",
        summary:
          "Provides scientific opinions on the safety of cosmetic ingredients sold in the European Union. Authoritative regulatory body for cosmetic safety assessment.",
        relevantInformation:
          "Safety opinions on parabens, formaldehyde releasers, and other cosmetic preservatives.",
        usedFor: ["Regulatory status assessment", "Safety threshold evaluation"],
        url: "https://ec.europa.eu/health/scientific_committees/consumer_safety",
        lastUpdated: "2025",
      },
      {
        id: "src-003",
        sourceName: "Contact Dermatitis Journal",
        sourceType: "scientific",
        authority: "scientific",
        summary:
          "Published peer-reviewed research on skin reactions and allergies related to cosmetic ingredients. Primary source for irritation and sensitization data.",
        relevantInformation:
          "Clinical studies documenting SLS irritation potential and fragrance allergen prevalence.",
        usedFor: ["Ingredient irritation assessment", "Allergen identification"],
        lastUpdated: "2024",
      },
      {
        id: "src-004",
        sourceName: "Official Product Label",
        sourceType: "product_information",
        authority: "primary",
        summary:
          "Product ingredient list and manufacturer information as displayed on the physical product packaging.",
        relevantInformation:
          "Complete ingredient list in INCI nomenclature, product category, and brand information.",
        usedFor: ["Ingredient identification", "Product categorization"],
      },
    ],
    ingredientEvidence: [
      {
        id: "sodium-lauryl-sulfate",
        name: "Sodium Lauryl Sulfate",
        function: "Surfactant / Cleansing Agent",
        assessment: "high",
        evidence:
          "Multiple clinical studies confirm irritant potential. The American Academy of Dermatology notes SLS may aggravate skin conditions.",
        source: "Journal of the American Academy of Dermatology",
      },
      {
        id: "methylparaben",
        name: "Methylparaben",
        function: "Preservative",
        assessment: "moderate",
        evidence:
          "EU SCCS has reviewed parabens and restricted certain concentrations. Current evidence suggests low risk at typical cosmetic levels.",
        source: "EU SCCS Opinion on Parabens",
      },
      {
        id: "fragrance-parfum",
        name: "Fragrance (Parfum)",
        function: "Scent / Sensory Enhancer",
        assessment: "moderate",
        evidence:
          "Proprietary blend. Some fragrance components identified as potential allergens in patch-test studies.",
        source: "Contact Dermatitis Journal",
      },
      {
        id: "glycerin",
        name: "Glycerin",
        function: "Humectant / Moisturizer",
        assessment: "low",
        evidence:
          "Consistently rated as safe and effective by dermatological research.",
        source: "International Journal of Cosmetic Science",
      },
    ],
    nutritionEvidence: [],
    evidenceStatus: "sufficient",
    evidenceStatusExplanation:
      "Sufficient information was available from regulatory databases, peer-reviewed research, and product labeling to support the current assessment.",
    dataQuality: "high",
    dataQualityExplanation:
      "Ingredient data is complete. Source information is available from multiple authoritative databases. Product identification is confident.",
    aiExplanation:
      "Based on the available evidence, this product contains ingredients that are generally safe for most users. However, sodium lauryl sulfate is a known skin irritant that may cause dryness or discomfort with repeated use, particularly on sensitive skin. Methylparaben is under ongoing regulatory review for potential endocrine interaction, though current evidence suggests low risk at typical cosmetic concentrations. The proprietary fragrance blend limits full ingredient transparency. The overall assessment of moderate attention reflects these documented considerations while acknowledging that the product is likely safe for most consumers when used as directed.",
  },
  "8901234567891": {
    id: "ev-002",
    productName: "OatPlus Protein Bar",
    brand: "OatPlus",
    category: "food",
    barcode: "8901234567891",
    scanDate: "09 Aug 2026",
    assessment: "low",
    assessmentDescription:
      "No major concerns were identified. This product has a relatively clean ingredient profile with recognizable ingredients.",
    assessmentFactors: [
      {
        category: "ingredients",
        title: "Ingredient Factors",
        description:
          "All ingredients are commonly used food ingredients with well-established safety profiles.",
      },
      {
        category: "nutrition",
        title: "Nutrition Factors",
        description:
          "Moderate sugar content (8g) and good protein content (15g). Nutritional profile is reasonable for a protein bar format.",
      },
      {
        category: "data_quality",
        title: "Data Quality",
        description:
          "Complete product labeling information was available including full nutrition facts and ingredient list.",
      },
    ],
    sources: [
      {
        id: "src-005",
        sourceName: "USDA FoodData Central",
        sourceType: "food_database",
        authority: "supporting",
        summary:
          "Comprehensive nutrient data for foods, maintained by the USDA Agricultural Research Service. Primary US government nutrition database.",
        relevantInformation:
          "Nutrient profiles for oats, soy lecithin, and other whole-food ingredients.",
        usedFor: ["Nutrition verification", "Ingredient reference"],
        url: "https://fdc.nal.usda.gov/",
        lastUpdated: "2026",
      },
      {
        id: "src-006",
        sourceName: "WHO Guidelines on Sugar Intake",
        sourceType: "government",
        authority: "primary",
        summary:
          "Evidence-based guidelines on dietary sugar, sodium, and fat intake from the World Health Organization.",
        relevantInformation:
          "Recommended limits for free sugar intake (less than 10% of total energy, ideally below 5%).",
        usedFor: ["Sugar assessment thresholds", "Nutrition context"],
        url: "https://www.who.int/publications/i/item/9789241549028",
        lastUpdated: "2025",
      },
      {
        id: "src-007",
        sourceName: "Product Nutrition Label",
        sourceType: "product_information",
        authority: "primary",
        summary:
          "Official nutrition facts label from the product packaging as required by food labeling regulations.",
        relevantInformation:
          "Complete nutrition facts including calories, macronutrients, and serving size information.",
        usedFor: ["Nutrition data source", "Serving size reference"],
      },
    ],
    ingredientEvidence: [
      {
        id: "oats",
        name: "Oats",
        function: "Whole Grain / Base Ingredient",
        assessment: "low",
        evidence:
          "Whole oats are recognized as a heart-healthy food by the FDA. Rich in beta-glucan fiber.",
        source: "USDA FoodData Central",
      },
      {
        id: "soy-lecithin",
        name: "Soy Lecithin",
        function: "Emulsifier",
        assessment: "low",
        evidence:
          "Generally recognized as safe for food use by the FDA.",
        source: "FDA GRAS Notices",
      },
    ],
    nutritionEvidence: [
      {
        nutrient: "Protein",
        value: "15g per serving",
        source: "Product nutrition label",
        usedInAssessment: true,
      },
      {
        nutrient: "Dietary Fibre",
        value: "4g per serving",
        source: "Product nutrition label",
        usedInAssessment: true,
      },
      {
        nutrient: "Added Sugar",
        value: "5g per serving",
        source: "Product nutrition label",
        usedInAssessment: true,
      },
    ],
    evidenceStatus: "sufficient",
    evidenceStatusExplanation:
      "Sufficient information was available from product labeling, government nutrition databases, and WHO guidelines to support the assessment.",
    dataQuality: "high",
    dataQualityExplanation:
      "Complete product labeling with full nutrition facts and ingredient list. All standard data fields available.",
    aiExplanation:
      "Based on the available evidence, this product has a favorable nutritional profile. The primary ingredient (oats) is recognized as a heart-healthy whole grain. The product provides meaningful protein content (15g) and dietary fibre (4g) per serving. The sugar content (8g total, 5g added) is moderate for a protein bar format. No artificial colors or flavors are present. The overall assessment of low concern reflects the clean ingredient profile and reasonable nutritional characteristics.",
  },
};

export function lookupEvidence(
  barcode: string,
): EvidencePageData | null {
  return MOCK_EVIDENCE[barcode.trim()] ?? null;
}
