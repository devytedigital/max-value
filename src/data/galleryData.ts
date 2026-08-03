export interface GalleryItem {
  id: string;
  category: string;
  title: string;
  date: string;
  description: string;
  image: string;
  images: {
    url: string;
    caption: string;
  }[];
}

export const galleryItems: GalleryItem[] = [
  {
    id: "specialized-workshop-top-performers",
    category: "Workshop",
    title: "Specialized Workshop Conducted For Top Performers",
    date: "February 12, 2026",
    description: "An intensive leadership and professional excellence workshop conducted for top performing branch managers and relationship executives across South India.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
        caption: "Opening keynote address by executive leadership"
      },
      {
        url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
        caption: "Interactive breakout session with branch leads"
      },
      {
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
        caption: "Team strategy formulation & group discussion"
      },
      {
        url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
        caption: "Skill enhancement seminar and practical exercise"
      },
      {
        url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
        caption: "Recognition of top performing team members"
      }
    ]
  },
  {
    id: "triprayar-branch-inauguration",
    category: "Branch Launch",
    title: "Triprayar Branch Inauguration",
    date: "January 24, 2026",
    description: "Official inauguration of our new state-of-the-art branch in Triprayar, expanding our physical footprint to serve local customers better.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
        caption: "Ribbon cutting ceremony by distinguished guests"
      },
      {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
        caption: "Modern interior of the newly opened Triprayar branch"
      },
      {
        url: "https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&w=1200&q=80",
        caption: "Lighting the traditional lamp during ceremony"
      },
      {
        url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
        caption: "First customer welcome and account opening"
      },
      {
        url: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80",
        caption: "Branch team and executive management group photo"
      }
    ]
  },
  {
    id: "tarang-2025",
    category: "Annual Event",
    title: "TARANG 2025",
    date: "December 18, 2025",
    description: "Grand annual celebration TARANG 2025 bringing together staff members and leadership from across all regional offices for awards and cultural performances.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
        caption: "Spectacular stage lighting at TARANG 2025"
      },
      {
        url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
        caption: "Cultural dance performance by employee delegates"
      },
      {
        url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
        caption: "Keynote address on annual achievements and future vision"
      },
      {
        url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80",
        caption: "Annual excellence award distribution on stage"
      },
      {
        url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
        caption: "Musical concert performance during evening celebrations"
      }
    ]
  },
  {
    id: "community-empowerment-campaign",
    category: "CSR Initiative",
    title: "Community Empowerment Campaign",
    date: "November 10, 2025",
    description: "A grassroots social responsibility campaign focused on financial literacy, self-help group support, and educational assistance in rural communities.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
        caption: "Community financial literacy workshop session"
      },
      {
        url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
        caption: "Educational kit distribution to school students"
      },
      {
        url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
        caption: "Volunteers engaging with local self-help group members"
      },
      {
        url: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?auto=format&fit=crop&w=1200&q=80",
        caption: "Support grant handover to aspiring women entrepreneurs"
      },
      {
        url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
        caption: "Community gathering and interactive feedback session"
      }
    ]
  },
  {
    id: "kochi-infopark-branch-opening",
    category: "Branch Launch",
    title: "Kochi Infopark Branch Opening",
    date: "October 05, 2025",
    description: "Inauguration of our new corporate branch at Kochi Infopark to cater to corporate employees, tech professionals, and local enterprises.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
        caption: "Contemporary reception and lounge area at Infopark branch"
      },
      {
        url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
        caption: "Customer consultation desks and digital services area"
      },
      {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
        caption: "Exterior view of the Infopark office complex"
      },
      {
        url: "https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&w=1200&q=80",
        caption: "Dignitaries cutting the inaugural cake"
      },
      {
        url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
        caption: "Branch team ready to welcome early customers"
      }
    ]
  },
  {
    id: "best-financial-partner-award-2025",
    category: "Award Ceremony",
    title: "Best Financial Partner Award 2025",
    date: "September 15, 2025",
    description: "Max Value recognized as the Best Financial Partner of the Year at the Regional Banking & NBFC Leadership Summit.",
    image: "https://images.unsplash.com/photo-1531058020387-3be344559be6?auto=format&fit=crop&w=1200&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1531058020387-3be344559be6?auto=format&fit=crop&w=1200&q=80",
        caption: "Managing Director accepting the prestigious award trophy"
      },
      {
        url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
        caption: "Leadership delegation on stage during victory photo"
      },
      {
        url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
        caption: "Acceptance speech highlighting customer trust & innovation"
      },
      {
        url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
        caption: "Gala dinner and celebratory gathering with industry peers"
      }
    ]
  },
  {
    id: "maxvalue-sports-meet-2025",
    category: "Annual Event",
    title: "MaxValue Sports Meet 2025",
    date: "August 20, 2025",
    description: "Annual sports meet encouraging teamwork, health, and athletic spirit among employee teams from all districts.",
    image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=1200&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=1200&q=80",
        caption: "Action moment from the inter-branch football final"
      },
      {
        url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
        caption: "Track and field sprint race competition"
      },
      {
        url: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=1200&q=80",
        caption: "Cheering audience and regional support squads"
      },
      {
        url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
        caption: "Medal presentation to winning sports team"
      }
    ]
  },
  {
    id: "free-health-camp-medicine-distribution",
    category: "CSR Initiative",
    title: "Free Health Camp & Medicine Distribution",
    date: "July 08, 2025",
    description: "Free medical check-up camp organized in association with leading hospitals, providing free diagnostics and essential medicines.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
        caption: "Doctors examining local community members"
      },
      {
        url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
        caption: "Free diagnostic testing and blood pressure check"
      },
      {
        url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
        caption: "Essential medicine counter and distribution team"
      },
      {
        url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
        caption: "Health awareness talk by medical specialists"
      }
    ]
  }
];
