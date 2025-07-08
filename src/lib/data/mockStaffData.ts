export interface Staff {
  id: string;
  name: string;
  role: string;
  email: string;
  status: 'Active' | 'Inactive';
  department: string;
  joinDate: string;
  phone: string;
}

export const mockStaffData: Staff[] = [
  {
    id: "ST001",
    name: "Ahmed Hassan",
    role: "Doctor",
    email: "ahmed.hassan@shefa.ly",
    status: "Active",
    department: "Cardiology",
    joinDate: "2023-01-15",
    phone: "+218-91-234-5678"
  },
  {
    id: "ST002",
    name: "Fatima Ali",
    role: "Nurse",
    email: "fatima.ali@shefa.ly",
    status: "Active",
    department: "Emergency",
    joinDate: "2023-03-20",
    phone: "+218-91-234-5679"
  },
  {
    id: "ST003",
    name: "Omar Khaled",
    role: "Technician",
    email: "omar.khaled@shefa.ly",
    status: "Inactive",
    department: "Laboratory",
    joinDate: "2022-11-10",
    phone: "+218-91-234-5680"
  },
  {
    id: "ST004",
    name: "Layla Mohamed",
    role: "Admin",
    email: "layla.mohamed@shefa.ly",
    status: "Active",
    department: "Administration",
    joinDate: "2022-08-05",
    phone: "+218-91-234-5681"
  },
  {
    id: "ST005",
    name: "Yusuf Ibrahim",
    role: "Doctor",
    email: "yusuf.ibrahim@shefa.ly",
    status: "Active",
    department: "Pediatrics",
    joinDate: "2023-05-12",
    phone: "+218-91-234-5682"
  },
  {
    id: "ST006",
    name: "Sara Ahmed",
    role: "Nurse",
    email: "sara.ahmed@shefa.ly",
    status: "Active",
    department: "Surgery",
    joinDate: "2023-07-18",
    phone: "+218-91-234-5683"
  },
  {
    id: "ST007",
    name: "Khalil Mansour",
    role: "Doctor",
    email: "khalil.mansour@shefa.ly",
    status: "Active",
    department: "Neurology",
    joinDate: "2022-12-03",
    phone: "+218-91-234-5684"
  },
  {
    id: "ST008",
    name: "Amina Hassan",
    role: "Technician",
    email: "amina.hassan@shefa.ly",
    status: "Active",
    department: "Radiology",
    joinDate: "2023-04-25",
    phone: "+218-91-234-5685"
  }
];