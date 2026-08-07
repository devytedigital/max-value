export interface Branch {
  id: string;
  name: string;
  state: string;
  district: string;
  address: string;
  landmark: string;
  pinCode: string;
  phone: string;
  mobile: string;
  email: string;
  location: string;
  workingHours: string;
}

export const stateDistrictMap: Record<string, string[]> = {
  Kerala: [
    "Kollam",
    "Thrissur",
    "Ernakulam",
    "Thiruvananthapuram",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Kottayam",
    "Alappuzha",
    "Kannur",
  ],
  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Salem",
    "Tiruchirappalli",
    "Erode",
  ],
  Karnataka: [
    "Bengaluru Urban",
    "Mysuru",
    "Dakshina Kannada (Mangaluru)",
    "Dharwad (Hubballi)",
    "Udupi",
  ],
  "Andhra Pradesh": ["Visakhapatnam", "NTR (Vijayawada)", "Guntur", "Tirupati"],
};

export const branchDatabase: Branch[] = [
  // KERALA - KOLLAM
  {
    id: "chathannur-kollam",
    name: "CHATHANNUR",
    state: "Kerala",
    district: "Kollam",
    address: "Ground Floor Kaithapuzha Building No. 2",
    landmark: "Near Kollam District Co-operative Bank",
    pinCode: "691572",
    phone: "0474 2592799",
    mobile: "8590600512",
    email: "chathanoor@maxvaluecredits.com",
    location: "Near Kollam District Co-operative Bank",
    workingHours: "9:30 AM to 5:30 PM",
  },
  {
    id: "kollam-main",
    name: "KOLLAM MAIN",
    state: "Kerala",
    district: "Kollam",
    address: "1st Floor Royal Plaza, Chinnakada Junction",
    landmark: "Opposite High School Field Ground",
    pinCode: "691001",
    phone: "0474 2748500",
    mobile: "8590600515",
    email: "kollam@maxvaluecredits.com",
    location: "Chinnakada Junction",
    workingHours: "9:30 AM to 5:30 PM",
  },
  // KERALA - THRISSUR
  {
    id: "thrissur-head-office-branch",
    name: "THRISSUR MAIN",
    state: "Kerala",
    district: "Thrissur",
    address: "MaxValue Corporate Tower, MG Road",
    landmark: "Near Swaraj Round West",
    pinCode: "680001",
    phone: "0487 2428800",
    mobile: "8714771854",
    email: "thrissur@maxvaluecredits.com",
    location: "MG Road, Swaraj Round",
    workingHours: "9:30 AM to 5:30 PM",
  },
  {
    id: "triprayar-branch",
    name: "TRIPRAYAR",
    state: "Kerala",
    district: "Thrissur",
    address: "Ground Floor City Centre, Temple Road",
    landmark: "Near Triprayar Temple West Gate",
    pinCode: "680567",
    phone: "0487 2391200",
    mobile: "8590600520",
    email: "triprayar@maxvaluecredits.com",
    location: "Triprayar Temple Road",
    workingHours: "9:30 AM to 5:30 PM",
  },
  // KERALA - ERNAKULAM
  {
    id: "kochi-infopark",
    name: "KOCHI INFOPARK",
    state: "Kerala",
    district: "Ernakulam",
    address: "Suite 102, Tech Park Arcade, Kakkanad",
    landmark: "Opposite Infopark Phase 1 Main Gate",
    pinCode: "682030",
    phone: "0484 2985100",
    mobile: "8590600530",
    email: "infopark@maxvaluecredits.com",
    location: "Kakkanad Infopark Road",
    workingHours: "9:30 AM to 5:30 PM",
  },
  {
    id: "mg-road-kochi",
    name: "MG ROAD KOCHI",
    state: "Kerala",
    district: "Ernakulam",
    address: "Door No. 40/1250, City Heights, MG Road",
    landmark: "Near Maharaja's College Metro Station",
    pinCode: "682011",
    phone: "0484 2364500",
    mobile: "8590600535",
    email: "kochi@maxvaluecredits.com",
    location: "MG Road Metro Station",
    workingHours: "9:30 AM to 5:30 PM",
  },
  // KERALA - THIRUVANANTHAPURAM
  {
    id: "tvm-east-fort",
    name: "THIRUVANANTHAPURAM EAST FORT",
    state: "Kerala",
    district: "Thiruvananthapuram",
    address: "Building No. 12/450, MG Road, East Fort",
    landmark: "Near Pazhavangadi Ganapathy Temple",
    pinCode: "695023",
    phone: "0471 2478900",
    mobile: "8590600540",
    email: "tvm@maxvaluecredits.com",
    location: "East Fort MG Road",
    workingHours: "9:30 AM to 5:30 PM",
  },
  // KERALA - KOZHIKODE
  {
    id: "kozhikode-mavoor-road",
    name: "KOZHIKODE MAVOOR ROAD",
    state: "Kerala",
    district: "Kozhikode",
    address: "2nd Floor Paragon Complex, Mavoor Road",
    landmark: "Opposite KSRTC Bus Stand",
    pinCode: "673004",
    phone: "0495 2723400",
    mobile: "8590600550",
    email: "calicut@maxvaluecredits.com",
    location: "Mavoor Road Bus Stand",
    workingHours: "9:30 AM to 5:30 PM",
  },

  // TAMIL NADU - CHENNAI
  {
    id: "chennai-t-nagar",
    name: "CHENNAI T-NAGAR",
    state: "Tamil Nadu",
    district: "Chennai",
    address: "Door No. 15, Usman Road, T. Nagar",
    landmark: "Near Panagal Park Bus Stop",
    pinCode: "600017",
    phone: "044 24348900",
    mobile: "9445012340",
    email: "tnagar@maxvaluecredits.com",
    location: "Usman Road Panagal Park",
    workingHours: "9:30 AM to 5:30 PM",
  },
  // TAMIL NADU - COIMBATORE
  {
    id: "coimbatore-gandhipuram",
    name: "COIMBATORE GANDHIPURAM",
    state: "Tamil Nadu",
    district: "Coimbatore",
    address: "No. 45, Cross Cut Road, Gandhipuram",
    landmark: "Near Town Bus Stand",
    pinCode: "641012",
    phone: "0422 2523400",
    mobile: "9445012350",
    email: "coimbatore@maxvaluecredits.com",
    location: "Cross Cut Road Gandhipuram",
    workingHours: "9:30 AM to 5:30 PM",
  },

  // KARNATAKA - BENGALURU URBAN
  {
    id: "bengaluru-koramangala",
    name: "BENGALURU KORAMANGALA",
    state: "Karnataka",
    district: "Bengaluru Urban",
    address: "No. 88, 80 Feet Road, 4th Block, Koramangala",
    landmark: "Opposite Sony World Signal",
    pinCode: "560034",
    phone: "080 25529000",
    mobile: "9880012340",
    email: "koramangala@maxvaluecredits.com",
    location: "80 Feet Road Koramangala",
    workingHours: "9:30 AM to 5:30 PM",
  },
  // KARNATAKA - MYSURU
  {
    id: "mysuru-devaraja",
    name: "MYSURU DEVARAJA MOHALLA",
    state: "Karnataka",
    district: "Mysuru",
    address: "No. 12, Sayyaji Rao Road, Devaraja Mohalla",
    landmark: "Near K.R. Circle",
    pinCode: "570001",
    phone: "0821 2423400",
    mobile: "9880012360",
    email: "mysuru@maxvaluecredits.com",
    location: "K.R. Circle Sayyaji Rao Road",
    workingHours: "9:30 AM to 5:30 PM",
  },

  // ANDHRA PRADESH - VISAKHAPATNAM
  {
    id: "vizag-dwarakanagar",
    name: "VISAKHAPATNAM DWARAKANAGAR",
    state: "Andhra Pradesh",
    district: "Visakhapatnam",
    address: "D.No. 47-10-12, 1st Lane, Dwarakanagar",
    landmark: "Near RTC Complex",
    pinCode: "530016",
    phone: "0891 2754300",
    mobile: "9989012340",
    email: "vizag@maxvaluecredits.com",
    location: "Dwarakanagar RTC Complex",
    workingHours: "9:30 AM to 5:30 PM",
  },
  // ANDHRA PRADESH - NTR (VIJAYAWADA)
  {
    id: "vijayawada-mg-road",
    name: "VIJAYAWADA MG ROAD",
    state: "Andhra Pradesh",
    district: "NTR (Vijayawada)",
    address: "Door No. 29-2-5, Governorpet, MG Road",
    landmark: "Opposite PWD Grounds",
    pinCode: "520002",
    phone: "0866 2578900",
    mobile: "9989012350",
    email: "vijayawada@maxvaluecredits.com",
    location: "Governorpet MG Road",
    workingHours: "9:30 AM to 5:30 PM",
  },
];
