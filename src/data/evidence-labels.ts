export type EvidenceLabels = {
  header: {
    title: string;
    subtitle: string;
    backToAnalysis: string;
  };
  product: {
    scanDate: string;
  };
  whyAssessment: {
    title: string;
  };
  evidenceList: {
    title: string;
    sourceType: string;
    usedFor: string;
    viewSource: string;
    viewDetails: string;
  };
  sourcePriority: {
    primary: string;
    scientific: string;
    supporting: string;
  };
  ingredientEvidence: {
    title: string;
    function: string;
    assessment: string;
    evidence: string;
    source: string;
    viewDetails: string;
  };
  nutritionEvidence: {
    title: string;
    nutrient: string;
    value: string;
    source: string;
    usedInAssessment: string;
    viewDetails: string;
  };
  evidenceStatus: {
    title: string;
    sufficient: string;
    sufficientDescription: string;
    limited: string;
    limitedDescription: string;
    insufficient: string;
    insufficientDescription: string;
  };
  dataQuality: {
    title: string;
    high: string;
    medium: string;
    low: string;
  };
  aiExplanation: {
    title: string;
    disclaimer: string;
  };
  transparency: {
    title: string;
    message: string;
    medicalDisclaimer: string;
  };
  filters: {
    all: string;
    ingredients: string;
    nutrition: string;
    regulatory: string;
    scientific: string;
    productInfo: string;
  };
  sourceDetail: {
    title: string;
    sourceType: string;
    lastUpdated: string;
    relevantInformation: string;
    usedFor: string;
    visitSource: string;
    close: string;
  };
  actions: {
    backToAnalysis: string;
    viewIngredients: string;
    viewNutrition: string;
    searchAlternatives: string;
  };
};

const en: EvidenceLabels = {
  header: {
    title: "Evidence & Sources",
    subtitle: "Review the information and sources used to support this product analysis.",
    backToAnalysis: "Back to Product Analysis",
  },
  product: {
    scanDate: "Scanned",
  },
  whyAssessment: {
    title: "Why This Assessment?",
  },
  evidenceList: {
    title: "Supporting Evidence",
    sourceType: "Source Type",
    usedFor: "Used For",
    viewSource: "View Source",
    viewDetails: "View Details",
  },
  sourcePriority: {
    primary: "Primary / Authoritative",
    scientific: "Scientific",
    supporting: "Supporting",
  },
  ingredientEvidence: {
    title: "Ingredient Evidence",
    function: "Function",
    assessment: "Assessment",
    evidence: "Evidence",
    source: "Source",
    viewDetails: "View Ingredient Details",
  },
  nutritionEvidence: {
    title: "Nutrition Evidence",
    nutrient: "Nutrient",
    value: "Value",
    source: "Source",
    usedInAssessment: "Used in Assessment",
    viewDetails: "View Nutrition Details",
  },
  evidenceStatus: {
    title: "Evidence Status",
    sufficient: "Sufficient Evidence",
    sufficientDescription:
      "Sufficient information was available to support the current assessment with reasonable confidence.",
    limited: "Limited Evidence",
    limitedDescription:
      "Some relevant information was available, but the available data was not sufficient for a high-confidence assessment.",
    insufficient: "Insufficient Evidence",
    insufficientDescription:
      "There is not enough available data to provide a comprehensive assessment. Results should be interpreted with caution.",
  },
  dataQuality: {
    title: "Data Quality",
    high: "High",
    medium: "Medium",
    low: "Low",
  },
  aiExplanation: {
    title: "AI Explanation",
    disclaimer: "Generated from structured product analysis and available evidence",
  },
  transparency: {
    title: "Important",
    message:
      "The assessment is based on the product information and evidence available to the system. Missing or incomplete information may affect the result.",
    medicalDisclaimer:
      "The assessment is informational and is not a medical diagnosis.",
  },
  filters: {
    all: "All",
    ingredients: "Ingredients",
    nutrition: "Nutrition",
    regulatory: "Regulatory",
    scientific: "Scientific",
    productInfo: "Product Information",
  },
  sourceDetail: {
    title: "Source Details",
    sourceType: "Source Type",
    lastUpdated: "Last Updated",
    relevantInformation: "Relevant Information",
    usedFor: "Used For",
    visitSource: "Visit Source",
    close: "Close",
  },
  actions: {
    backToAnalysis: "Back to Product Analysis",
    viewIngredients: "View Ingredient Details",
    viewNutrition: "View Nutrition Details",
    searchAlternatives: "Search Alternatives",
  },
};

const hi: EvidenceLabels = {
  header: {
    title: "प्रमाण और स्रोत",
    subtitle: "इस उत्पाद विश्लेषण को समर्थन देने के लिए उपयोग की गई जानकारी और स्रोतों की समीक्षा करें।",
    backToAnalysis: "उत्पाद विश्लेषण पर वापस जाएं",
  },
  product: {
    scanDate: "स्कैन किया गया",
  },
  whyAssessment: {
    title: "यह मूल्यांकन क्यों?",
  },
  evidenceList: {
    title: "समर्थन प्रमाण",
    sourceType: "स्रोत प्रकार",
    usedFor: "उपयोग किया गया",
    viewSource: "स्रोत देखें",
    viewDetails: "विवरण देखें",
  },
  sourcePriority: {
    primary: "प्राथमिक / अधिकृत",
    scientific: "वैज्ञानिक",
    supporting: "सहायक",
  },
  ingredientEvidence: {
    title: "सामग्री प्रमाण",
    function: "कार्य",
    assessment: "मूल्यांकन",
    evidence: "प्रमाण",
    source: "स्रोत",
    viewDetails: "सामग्री विवरण देखें",
  },
  nutritionEvidence: {
    title: "पोषण प्रमाण",
    nutrient: "पोषक तत्व",
    value: "मान",
    source: "स्रोत",
    usedInAssessment: "मूल्यांकन में उपयोग",
    viewDetails: "पोषण विवरण देखें",
  },
  evidenceStatus: {
    title: "प्रमाण स्थिति",
    sufficient: "पर्याप्त प्रमाण",
    sufficientDescription:
      "वर्तमान मूल्यांकन को समर्थन देने के लिए पर्याप्त जानकारी उपलब्ध थी।",
    limited: "सीमित प्रमाण",
    limitedDescription:
      "कुछ प्रासंगिक जानकारी उपलब्ध थी, लेकिन उपलब्ध डेटा उच्च-विश्वास मूल्यांकन के लिए पर्याप्त नहीं था।",
    insufficient: "अपर्याप्त प्रमाण",
    insufficientDescription:
      "व्यापक मूल्यांकन प्रदान करने के लिए पर्याप्त डेटा उपलब्ध नहीं है।",
  },
  dataQuality: {
    title: "डेटा गुणवत्ता",
    high: "उच्च",
    medium: "मध्यम",
    low: "कम",
  },
  aiExplanation: {
    title: "AI व्याख्या",
    disclaimer: "संरचित उत्पाद विश्लेषण और उपलब्ध प्रमाण से उत्पन्न",
  },
  transparency: {
    title: "महत्वपूर्ण",
    message:
      "मूल्यांकन सिस्टम को उपलब्ध उत्पाद जानकारी और प्रमाण पर आधारित है। गायब या अपूर्ण जानकारी परिणाम को प्रभावित कर सकती है।",
    medicalDisclaimer:
      "मूल्यांकन सूचनात्मक है और चिकित्सा निदान नहीं है।",
  },
  filters: {
    all: "सभी",
    ingredients: "सामग्री",
    nutrition: "पोषण",
    regulatory: "नियामक",
    scientific: "वैज्ञानिक",
    productInfo: "उत्पाद जानकारी",
  },
  sourceDetail: {
    title: "स्रोत विवरण",
    sourceType: "स्रोत प्रकार",
    lastUpdated: "अंतिम अपडेट",
    relevantInformation: "प्रासंगिक जानकारी",
    usedFor: "उपयोग किया गया",
    visitSource: "स्रोत पर जाएं",
    close: "बंद करें",
  },
  actions: {
    backToAnalysis: "उत्पाद विश्लेषण पर वापस जाएं",
    viewIngredients: "सामग्री विवरण देखें",
    viewNutrition: "पोषण विवरण देखें",
    searchAlternatives: "विकल्प खोजें",
  },
};

const labelsMap: Record<string, EvidenceLabels> = { en, hi };

export function getEvidenceLabels(lang: string): EvidenceLabels {
  return labelsMap[lang] ?? en;
}
