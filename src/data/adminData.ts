export interface DirectorItem {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  status: "Active" | "Inactive";
  order: number;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  description: string;
  interestRate: string;
  maxTenure: string;
  status: "Active" | "Draft";
  iconName: string;
}

export interface ImageGalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  date: string;
  caption: string;
}

export interface VideoGalleryItem {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  publishedDate: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  category: string;
  fileType: "PDF" | "DOCX" | "XLSX";
  fileSize: string;
  fileUrl: string;
  uploadDate: string;
}

export interface CareerItem {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  experience: string;
  deadline: string;
  applicantsCount: number;
  status: "Open" | "Closed";
  description: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  publishedDate: string;
  author: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  isFeatured: boolean;
  status: "Published" | "Draft";
}

export interface BranchItem {
  id: string;
  name: string;
  state: string;
  district: string;
  code: string;
  address: string;
  landmark: string;
  pinCode: string;
  phone: string;
  email: string;
  workingHours: string;
  status: "Operational" | "Maintenance";
}

// Initial Mock Data
export const initialDirectors: DirectorItem[] = [
  {
    id: "dir-1",
    name: "Manoj V Raman",
    role: "Chairman & Managing Director",
    image: "/director-portrait.png",
    bio: "Over 25 years of leadership in retail financial services, NBFC operations, and strategic expansion across South India.",
    status: "Active",
    order: 1,
  },
  {
    id: "dir-2",
    name: "K. Nandhakumar",
    role: "Executive Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=750&q=80",
    bio: "Expert in micro-finance scaling, audit controls, and risk assessment frameworks.",
    status: "Active",
    order: 2,
  },
  {
    id: "dir-3",
    name: "Christo George",
    role: "Director",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=750&q=80",
    bio: "Pioneer in tech-enabled financial services and digital loan origination platforms.",
    status: "Active",
    order: 3,
  },
  {
    id: "dir-4",
    name: "Roy Johnson",
    role: "Whole-time Director",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=750&q=80",
    bio: "Specializes in gold loan valuation processes and branch network governance.",
    status: "Active",
    order: 4,
  },
  {
    id: "dir-5",
    name: "Dr. V.K. Gopinathan",
    role: "Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&h=750&q=80",
    bio: "Senior economist and former Banking Ombudsman with deep expertise in compliance.",
    status: "Active",
    order: 5,
  },
];

export const initialServices: ServiceItem[] = [
  {
    id: "srv-1",
    name: "Gold Loan",
    category: "Secured Lending",
    description: "Instant cash against gold ornaments with competitive interest rates and minimal documentation.",
    interestRate: "8.9% p.a.",
    maxTenure: "12 Months",
    status: "Active",
    iconName: "Coins",
  },
  {
    id: "srv-2",
    name: "Microfinance Loan",
    category: "Inclusive Growth",
    description: "Financial empowerment for self-help groups and rural entrepreneurs with weekly repayment terms.",
    interestRate: "12.5% p.a.",
    maxTenure: "24 Months",
    status: "Active",
    iconName: "Users",
  },
  {
    id: "srv-3",
    name: "Business Loan",
    category: "Commercial Finance",
    description: "Customized collateral-free and collateral-backed credit solutions to fuel small business growth.",
    interestRate: "11.0% p.a.",
    maxTenure: "36 Months",
    status: "Active",
    iconName: "Briefcase",
  },
  {
    id: "srv-4",
    name: "Traders Loan",
    category: "Working Capital",
    description: "Flexible working capital limits for merchants, wholesalers, and retail store operators.",
    interestRate: "10.5% p.a.",
    maxTenure: "18 Months",
    status: "Active",
    iconName: "Store",
  },
  {
    id: "srv-5",
    name: "Vehicle Loan",
    category: "Asset Financing",
    description: "Quick approval financing for two-wheelers and commercial vehicles with easy EMIs.",
    interestRate: "9.5% p.a.",
    maxTenure: "48 Months",
    status: "Active",
    iconName: "Car",
  },
];

export const initialImages: ImageGalleryItem[] = [
  {
    id: "img-1",
    title: "Annual Leadership Summit 2025",
    category: "Events",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    date: "2025-11-14",
    caption: "Management leaders celebrating 100+ branch milestone.",
  },
  {
    id: "img-2",
    title: "New Corporate Headquarters Inauguration",
    category: "Corporate",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    date: "2025-08-20",
    caption: "State-of-the-art corporate tower opened in Thrissur.",
  },
  {
    id: "img-3",
    title: "Community Financial Literacy Workshop",
    category: "CSR",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    date: "2025-05-10",
    caption: "Educating rural women on savings and digital micro-investments.",
  },
];

export const initialVideos: VideoGalleryItem[] = [
  {
    id: "vid-1",
    title: "MaxValue Gold Loan Instant Process Walkthrough",
    category: "Products",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    duration: "02:45",
    publishedDate: "2025-10-05",
  },
  {
    id: "vid-2",
    title: "Customer Success Story - Empowering Local Businesses",
    category: "Testimonials",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    duration: "04:12",
    publishedDate: "2025-09-18",
  },
];

export const initialDownloads: DownloadItem[] = [
  {
    id: "dl-1",
    title: "Annual Financial Report FY 2024-25",
    category: "Financials",
    fileType: "PDF",
    fileSize: "4.8 MB",
    fileUrl: "#",
    uploadDate: "2025-07-01",
  },
  {
    id: "dl-2",
    title: "Gold Loan Application Form & Guidelines",
    category: "Forms",
    fileType: "PDF",
    fileSize: "1.2 MB",
    fileUrl: "#",
    uploadDate: "2025-04-12",
  },
  {
    id: "dl-3",
    title: "Fair Practices Code & Ombudsman Contact Details",
    category: "Compliance",
    fileType: "PDF",
    fileSize: "850 KB",
    fileUrl: "#",
    uploadDate: "2025-01-15",
  },
];

export const initialCareers: CareerItem[] = [
  {
    id: "car-1",
    title: "Branch Operations Manager",
    department: "Branch Operations",
    location: "Kochi, Kerala",
    type: "Full-time",
    experience: "3 - 5 Years",
    deadline: "2026-09-15",
    applicantsCount: 24,
    status: "Open",
    description: "Oversee daily branch activities, gold appraisal protocols, customer relationships, and audit compliance.",
  },
  {
    id: "car-2",
    title: "Senior Credit Analyst (Microfinance)",
    department: "Risk & Credit",
    location: "Thrissur, Kerala",
    type: "Full-time",
    experience: "4 - 7 Years",
    deadline: "2026-09-30",
    applicantsCount: 18,
    status: "Open",
    description: "Evaluate borrower creditworthiness, perform field verifications, and monitor loan portfolio performance.",
  },
  {
    id: "car-3",
    title: "Relationship Officer - Gold Loans",
    department: "Sales & Acquisition",
    location: "Chennai, Tamil Nadu",
    type: "Full-time",
    experience: "1 - 3 Years",
    deadline: "2026-08-25",
    applicantsCount: 42,
    status: "Open",
    description: "Drive gold loan customer onboarding, manage local community outreach, and assist borrowers with documentation.",
  },
];

export const initialNews: NewsItem[] = [
  {
    id: "news-1",
    title: "MaxValue Achieves Record 150 Branch Milestone Across South India",
    category: "Corporate Expansion",
    publishedDate: "2026-01-20",
    author: "Corporate Communications",
    excerpt: "MaxValue Group continues its rapid trajectory by inaugurating 15 new technology-enabled branches in Tamil Nadu & Karnataka.",
    content: "Detailed news article contents regarding company growth and future branch network roadmap.",
    imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    status: "Published",
  },
  {
    id: "news-2",
    title: "Introducing Zero Doorstep Processing Charges for Senior Citizens",
    category: "Service Update",
    publishedDate: "2025-11-08",
    author: "Product Team",
    excerpt: "Special gold loan service initiatives launched to facilitate hassle-free doorstep evaluation for senior citizens.",
    content: "Full news release text.",
    imageUrl: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    status: "Published",
  },
];

export const initialBranches: BranchItem[] = [
  {
    id: "br-1",
    name: "THRISSUR MAIN",
    state: "Kerala",
    district: "Thrissur",
    code: "MV-KL-001",
    address: "MaxValue Corporate Tower, MG Road, Swaraj Round West",
    landmark: "Near Swaraj Round West",
    pinCode: "680001",
    phone: "0487 2428800",
    email: "thrissur@maxvaluecredits.com",
    workingHours: "9:30 AM to 5:30 PM",
    status: "Operational",
  },
  {
    id: "br-2",
    name: "KOCHI INFOPARK",
    state: "Kerala",
    district: "Ernakulam",
    code: "MV-KL-002",
    address: "Suite 102, Tech Park Arcade, Kakkanad",
    landmark: "Opposite Infopark Phase 1 Main Gate",
    pinCode: "682030",
    phone: "0484 2985100",
    email: "infopark@maxvaluecredits.com",
    workingHours: "9:30 AM to 5:30 PM",
    status: "Operational",
  },
  {
    id: "br-3",
    name: "CHENNAI T-NAGAR",
    state: "Tamil Nadu",
    district: "Chennai",
    code: "MV-TN-010",
    address: "Door No. 15, Usman Road, T. Nagar",
    landmark: "Near Panagal Park Bus Stop",
    pinCode: "600017",
    phone: "044 24348900",
    email: "tnagar@maxvaluecredits.com",
    workingHours: "9:30 AM to 5:30 PM",
    status: "Operational",
  },
  {
    id: "br-4",
    name: "BENGALURU KORAMANGALA",
    state: "Karnataka",
    district: "Bengaluru Urban",
    code: "MV-KA-005",
    address: "No. 88, 80 Feet Road, 4th Block, Koramangala",
    landmark: "Opposite Sony World Signal",
    pinCode: "560034",
    phone: "080 25529000",
    email: "koramangala@maxvaluecredits.com",
    workingHours: "9:30 AM to 5:30 PM",
    status: "Operational",
  },
];
