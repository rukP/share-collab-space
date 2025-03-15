// Mock data for search functionality
export const MOCK_PROJECTS = [
  {
    id: 1,
    title: "Interactive Art Installation",
    description: "A dynamic light installation responding to viewer movement",
    imageUrl: "https://picsum.photos/seed/1/800/600",
    likes: 24,
    author: "Alice Chen",
    status: "open", // open, closed, or completed
    requests: [
      { id: 1, userId: 2, status: "pending" }, // pending, accepted, or rejected
      { id: 2, userId: 3, status: "accepted" }
    ]
  },
  {
    id: 2,
    title: "Sustainable Fashion Collection",
    description: "Exploring eco-friendly materials in contemporary fashion",
    imageUrl: "https://picsum.photos/seed/2/800/600",
    likes: 18,
    author: "James Wilson",
    status: "closed", // closed for new members
    requests: []
  },
  {
    id: 3,
    title: "Digital Typography Experiment",
    description: "Playing with variable fonts and animation",
    imageUrl: "https://picsum.photos/seed/3/800/600",
    likes: 32,
    author: "Sarah Park",
    status: "completed", // project is completed
    requests: []
  }
];

export const MOCK_TEAMS = [
  {
    id: 1,
    name: "Design Innovators",
    description: "A team focused on experimental design approaches across various media",
    members: 4,
    openPositions: 2,
    createdAt: "2024-02-15"
  },
  {
    id: 2,
    name: "Digital Fabrication Group",
    description: "Exploring the intersection of digital design and physical fabrication techniques",
    members: 3,
    openPositions: 1,
    createdAt: "2024-02-10"
  }
];

export const MOCK_USERS = [
  {
    id: 1,
    name: "Emma Johnson",
    course: "Visual Communication",
    avatar: "https://picsum.photos/seed/user1/300/300"
  },
  {
    id: 2,
    name: "Michael Robinson",
    course: "Information Experience Design",
    avatar: "https://picsum.photos/seed/user2/300/300"
  },
  {
    id: 3,
    name: "Sarah Park",
    course: "Animation",
    avatar: "https://picsum.photos/seed/user3/300/300"
  }
];

// Mock project request
export interface ProjectRequest {
  id: number;
  userId: number;
  projectId: number;
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export const MOCK_REQUESTS: ProjectRequest[] = [
  {
    id: 1,
    userId: 2,
    projectId: 1,
    message: "I'd love to contribute my programming skills to this installation!",
    status: "pending",
    createdAt: "2024-04-02"
  },
  {
    id: 2, 
    userId: 3,
    projectId: 1,
    message: "I have experience with lighting design and would like to join.",
    status: "accepted",
    createdAt: "2024-04-01"
  }
];
