export const faqData = [
  // AGE-RELATED QUESTIONS - Young Adults (18-30)
  {
    id: 1,
    question: "Can I get life insurance at 18 in Ontario?",
    answer: "Yes, you can purchase life insurance at 18 in Ontario. This is actually the best time to get coverage as premiums are lowest and you're likely in good health.",
    category: "Age-Related",
    subcategory: "Young Adults (18-30)",
    tags: ["young", "18", "ontario", "premiums", "health", "best time"],
    ageGroup: "18-30",
    keywords: ["eighteen", "young adult", "start", "begin", "first policy"]
  },
  {
    id: 2,
    question: "Why should I get life insurance in my 20s if I'm single?",
    answer: "Even single people benefit from life insurance to cover debts, funeral costs, and to lock in low premiums while healthy. It also provides future insurability.",
    category: "Age-Related",
    subcategory: "Young Adults (18-30)",
    tags: ["20s", "single", "debt", "funeral", "premiums", "insurability"],
    ageGroup: "18-30",
    keywords: ["twenties", "unmarried", "student loans", "future protection"]
  },
  {
    id: 3,
    question: "How much life insurance do I need as a new graduate with student loans?",
    answer: "At minimum, enough to cover your student debt plus funeral expenses (typically $50,000-$100,000). Consider 5-10x your annual income if you have dependents.",
    category: "Age-Related",
    subcategory: "Young Adults (18-30)",
    tags: ["graduate", "student loans", "coverage amount", "debt", "income"],
    ageGroup: "18-30",
    keywords: ["university", "college", "education debt", "new job", "entry level"]
  },

  // POLICY TYPES - Term Life Insurance
  {
    id: 16,
    question: "What's the difference between 10, 20, and 30-year term policies?",
    answer: "The number indicates how long premiums remain level. Longer terms cost more initially but protect against future rate increases.",
    category: "Policy Types",
    subcategory: "Term Life Insurance",
    tags: ["term", "10 year", "20 year", "30 year", "premiums", "level"],
    ageGroup: "all",
    keywords: ["duration", "length", "period", "renewable"]
  },

  // MEDICAL CONDITIONS - Heart Conditions
  {
    id: 33,
    question: "Can I get life insurance with high blood pressure?",
    answer: "Yes, mild to moderate high blood pressure is often insurable at standard or slightly higher rates if well-controlled.",
    category: "Medical Conditions",
    subcategory: "Heart Conditions",
    tags: ["high blood pressure", "hypertension", "controlled", "rates"],
    ageGroup: "all",
    keywords: ["BP", "medication", "cardiovascular", "heart health"]
  },

  // MEDICAL CONDITIONS - Diabetes
  {
    id: 38,
    question: "Can diabetics get life insurance in Ontario?",
    answer: "Yes, both Type 1 and Type 2 diabetics can get coverage, though rates vary based on control, complications, and age at diagnosis.",
    category: "Medical Conditions",
    subcategory: "Diabetes",
    tags: ["diabetes", "Type 1", "Type 2", "coverage", "control", "complications"],
    ageGroup: "all",
    keywords: ["diabetic", "blood sugar", "insulin", "glucose"]
  },

  // CLAIMS AND BENEFICIARIES
  {
    id: 73,
    question: "Who can I name as my life insurance beneficiary in Ontario?",
    answer: "Anyone you choose - spouse, children, parents, charities, or your estate. You're not limited to family members.",
    category: "Claims and Beneficiaries",
    subcategory: "Beneficiary Designations",
    tags: ["beneficiary", "spouse", "children", "parents", "charities", "estate"],
    ageGroup: "all",
    keywords: ["recipient", "inheritance", "death benefit", "payout"]
  },

  // YOUNG FAMILIES
  {
    id: 132,
    question: "How much life insurance do new parents need?",
    answer: "Enough to replace lost income until children are independent, plus education costs and mortgage payoff.",
    category: "Young Families",
    subcategory: "New Parents",
    tags: ["new parents", "income replacement", "children", "education", "mortgage"],
    ageGroup: "25-45",
    keywords: ["family protection", "childcare", "financial security", "dependents"]
  },

  // COMMON MISTAKES
  {
    id: 189,
    question: "What's the biggest mistake people make when applying for life insurance?",
    answer: "Not being completely honest about health conditions, which can void coverage when it's needed most.",
    category: "Common Mistakes",
    subcategory: "Application Mistakes",
    tags: ["mistake", "honest", "health conditions", "void coverage"],
    ageGroup: "all",
    keywords: ["honesty", "disclosure", "medical history", "claim denial"]
  },

  // FINAL CONSIDERATIONS
  {
    id: 200,
    question: "When is the best time to buy life insurance?",
    answer: "When you're young and healthy, have people depending on your income, or have debts that would burden survivors.",
    category: "Final Considerations",
    subcategory: "Timing",
    tags: ["best time", "young", "healthy", "dependents", "debt"],
    ageGroup: "all",
    keywords: ["optimal timing", "right time", "when to buy", "financial protection"]
  }
];

// Helper functions for searching and filtering
export const searchFAQs = (query, faqs = faqData) => {
  if (!query || query.trim() === '') return faqs;
  
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);
  
  return faqs.filter(faq => {
    const searchableText = [
      faq.question,
      faq.answer,
      faq.category,
      faq.subcategory,
      ...faq.tags,
      ...faq.keywords
    ].join(' ').toLowerCase();
    
    return searchTerms.some(term => searchableText.includes(term));
  }).sort((a, b) => {
    // Score based on how many search terms match
    const aMatches = searchTerms.filter(term => 
      [a.question, a.answer, ...a.tags, ...a.keywords]
        .join(' ').toLowerCase().includes(term)
    ).length;
    
    const bMatches = searchTerms.filter(term => 
      [b.question, b.answer, ...b.tags, ...b.keywords]
        .join(' ').toLowerCase().includes(term)
    ).length;
    
    return bMatches - aMatches;
  });
};

export const getCategories = () => {
  const categories = {};
  faqData.forEach(faq => {
    if (!categories[faq.category]) {
      categories[faq.category] = new Set();
    }
    categories[faq.category].add(faq.subcategory);
  });
  
  // Convert Sets to Arrays
  Object.keys(categories).forEach(category => {
    categories[category] = Array.from(categories[category]);
  });
  
  return categories;
};

export const getPopularFAQs = (limit = 6) => {
  // Return most common questions based on categories that users typically ask
  const popularIds = [1, 2, 33, 38, 73, 200, 132, 189, 16];
  return faqData.filter(faq => popularIds.includes(faq.id)).slice(0, limit);
};