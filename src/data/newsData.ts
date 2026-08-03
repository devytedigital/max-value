export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  summary: string;
  bannerImage: string;
  supportingImages: {
    url: string;
    caption: string;
  }[];
  content: {
    type: "paragraph" | "heading" | "quote" | "list";
    text?: string;
    items?: string[];
  }[];
}

export const newsArticles: NewsArticle[] = [
  {
    id: "maxvalue-expands-branch-network-south-india-2026",
    title: "Max Value Expands Branch Network to Over 150 Locations Across South India",
    category: "Expansion & Growth",
    date: "February 02, 2026",
    author: "Corporate Desk",
    readTime: "4 min read",
    summary: "Max Value Credits & Investments Ltd. marks a major growth milestone by expanding its physical branch footprint to over 150 fully operational locations across Kerala, Tamil Nadu, and Karnataka.",
    bannerImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    supportingImages: [
      {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
        caption: "Newly inaugurated branch office showcasing modern customer service desks."
      },
      {
        url: "https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&w=1000&q=80",
        caption: "Inaugural ribbon-cutting ceremony attended by executive leadership."
      }
    ],
    content: [
      {
        type: "paragraph",
        text: "Max Value Credits & Investments Ltd. has officially crossed a significant growth milestone by establishing over 150 customer-centric branch offices across South India. The rapid expansion reflects the institution's unwavering commitment to making quick, transparent, and hassle-free financial services accessible to urban and semi-urban communities."
      },
      {
        type: "heading",
        text: "Strengthening Community Financial Access"
      },
      {
        type: "paragraph",
        text: "Each new branch is equipped with state-of-the-art security systems, gold valuation technology, and digital customer support infrastructure. This ensures that borrowers receive transparent loan processing with minimal turnaround time."
      },
      {
        type: "quote",
        text: "Our expansion strategy is centered around bringing trustworthy financial support directly to the doorsteps of everyday families, small traders, and entrepreneurs. Reaching 150 branches is a reflection of the trust our customers place in us every day."
      },
      {
        type: "heading",
        text: "Key Features of New Branch Locations"
      },
      {
        type: "list",
        items: [
          "Express Gold Loan appraisal and instant disbursement counters.",
          "Dedicated Microfinance and Traders Loan consultation desks.",
          "Enhanced security vaults with 24/7 monitoring systems.",
          "Multi-lingual customer relationship managers to assist first-time borrowers."
        ]
      },
      {
        type: "paragraph",
        text: "Looking ahead, Max Value plans to add another 35 branch locations by the end of the current financial year, focusing on underserved rural corridors to foster financial inclusion."
      }
    ]
  },
  {
    id: "maxvalue-launches-digital-gold-loan-portal-2026",
    title: "Max Value Launches Instant Digital Gold Loan Express Portal",
    category: "Digital Innovation",
    date: "January 18, 2026",
    author: "Technology Desk",
    readTime: "3 min read",
    summary: "Introducing a seamless digital portal for quick eligibility checks, doorstep valuation booking, and instant Gold Loan processing with transparent interest rates.",
    bannerImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    supportingImages: [
      {
        url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80",
        caption: "Digital application workflow on smartphone and tablet screens."
      },
      {
        url: "https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&w=1000&q=80",
        caption: "Instant digital gold valuation calculator for borrowers."
      }
    ],
    content: [
      {
        type: "paragraph",
        text: "In a move to digitize financial services, Max Value Credits & Investments Ltd. has launched its innovative Gold Loan Express portal. The new platform enables customers to calculate their eligible gold loan amounts, check live gold rates, and schedule branch appointments or doorstep evaluations in just a few clicks."
      },
      {
        type: "heading",
        text: "Seamless Customer-Centric Experience"
      },
      {
        type: "paragraph",
        text: "The portal combines intuitive UI design with robust data security protocols, ensuring that sensitive applicant information remains completely protected. Borrowers can track their ongoing loan accounts, view interest payment schedules, and make online repayments effortlessly."
      },
      {
        type: "quote",
        text: "Technology should simplify borrowing, not complicate it. Our new digital portal cuts down paper documentation while keeping our human touch intact."
      },
      {
        type: "heading",
        text: "Key Digital Features"
      },
      {
        type: "list",
        items: [
          "Live 22K/24K Gold Rate tracking updated every morning.",
          "Instant Gold Loan EMI and LTV calculation engine.",
          "One-click WhatsApp integration for instant branch support.",
          "Safe online interest repayment gateway with digital receipts."
        ]
      }
    ]
  },
  {
    id: "maxvalue-awarded-best-nbfc-customer-service-2025",
    title: "Max Value Honored with Best NBFC Customer Service Excellence Award 2025",
    category: "Awards & Recognition",
    date: "December 22, 2025",
    author: "Editorial Team",
    readTime: "5 min read",
    summary: "Max Value Credits recognized for outstanding customer satisfaction benchmarks, ethical lending practices, and transparent financial products at the Regional Banking Summit.",
    bannerImage: "https://images.unsplash.com/photo-1531058020387-3be344559be6?auto=format&fit=crop&w=1200&q=80",
    supportingImages: [
      {
        url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80",
        caption: "Managing Director accepting the award trophy at the grand ceremony."
      }
    ],
    content: [
      {
        type: "paragraph",
        text: "Max Value Credits & Investments Ltd. was conferred the prestigious 'Best NBFC Customer Service Excellence Award 2025' at the annual Regional Banking & Financial Services Leadership Summit held in Kochi. The honor recognizes the organization's exemplary dedication to customer transparency and ethical lending standards."
      },
      {
        type: "heading",
        text: "A Benchmark of Ethical Lending"
      },
      {
        type: "paragraph",
        text: "The selection panel evaluated over 40 financial institutions across multiple criteria, including processing transparency, turnaround times, grievance redressal speed, and customer retention metrics."
      },
      {
        type: "quote",
        text: "This award belongs to our hard-working branch executives and the millions of customers who entrust us with their dreams every day."
      }
    ]
  },
  {
    id: "maxvalue-microfinance-empowers-10000-women-entrepreneurs",
    title: "Max Value Microfinance Initiative Empowers 10,000+ Women Entrepreneurs",
    category: "Community & CSR",
    date: "November 14, 2025",
    author: "CSR Bureau",
    readTime: "4 min read",
    summary: "Empowering rural micro-enterprises with tailored Mahila Kshema credit assistance, financial literacy workshops, and self-help group mentorship.",
    bannerImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    supportingImages: [
      {
        url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80",
        caption: "Financial literacy workshop for women self-help groups."
      },
      {
        url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=80",
        caption: "Microfinance grant distribution to local women entrepreneurs."
      }
    ],
    content: [
      {
        type: "paragraph",
        text: "Max Value's flagship Mahila Kshema Microfinance program has achieved a major milestone by providing accessible credit assistance and financial training to over 10,000 women entrepreneurs across South India."
      },
      {
        type: "heading",
        text: "Fostering Grassroots Economic Independence"
      },
      {
        type: "paragraph",
        text: "The scheme offers micro-loans for cottage industries, handicraft units, tailoring shops, and agricultural allied trades. Alongside credit support, Max Value conducts weekly workshops on digital payments, household budgeting, and loan management."
      },
      {
        type: "quote",
        text: "When you empower a woman entrepreneur, you uplift an entire household and community. Our microfinance vision is built around long-term economic self-reliance."
      }
    ]
  },
  {
    id: "annual-general-meet-tarang-2025-concludes",
    title: "Annual Leadership Summit & TARANG 2025 Concludes with Strategic Growth Roadmap",
    category: "Corporate Events",
    date: "October 29, 2025",
    author: "Corporate Communications",
    readTime: "4 min read",
    summary: "Executive leadership outlines an ambitious 5-year vision focused on technology integration, expanded credit schemes, and regional market leadership.",
    bannerImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    supportingImages: [
      {
        url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
        caption: "Cultural performance during the TARANG 2025 gala celebration."
      }
    ],
    content: [
      {
        type: "paragraph",
        text: "Max Value's annual flagship gathering, TARANG 2025, concluded on a high note with participation from over 800 employees, branch heads, and executive directors from across South India."
      },
      {
        type: "heading",
        text: "Key Takeaways & Future Directions"
      },
      {
        type: "paragraph",
        text: "The summit highlighted key operational achievements, unveiled enhanced employee welfare schemes, and awarded top-performing branch teams across multiple operational categories."
      }
    ]
  },
  {
    id: "traders-loan-scheme-revamped-for-small-businesses",
    title: "Max Value Revamps Traders Loan Schemes to Boost Small Business Growth",
    category: "Product Launch",
    date: "September 05, 2025",
    author: "Business Desk",
    readTime: "3 min read",
    summary: "Enhanced loan limits and flexible repayment terms introduced for retail traders, shop owners, and small business operators under Max Vanijya and Vyapari Kshema.",
    bannerImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    supportingImages: [
      {
        url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80",
        caption: "Small business owner receiving customized financial consultation."
      }
    ],
    content: [
      {
        type: "paragraph",
        text: "To support retail traders and small enterprise owners preparing for festival inventory demand, Max Value Credits has introduced revamped Traders Loan options with flexible collateral and higher limit ceilings."
      },
      {
        type: "heading",
        text: "Tailored Financial Solutions"
      },
      {
        type: "paragraph",
        text: "The four distinct schemes — Max Vanijya, Max Samrudhi, Vyapari Kshema, and Mahila Kshema — cater to varying collateral preferences, allowing traders to choose between unsecured and gold-backed options."
      }
    ]
  }
];
