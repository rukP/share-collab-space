
// Mock data for search functionality
export const MOCK_PROJECTS = [
  {
    id: 1,
    title: "AI-Powered School Assistant",
    description: "An AI chatbot to help RCA students with programming questions and course material",
    imageUrl: "https://picsum.photos/seed/1/800/600",
    likes: 32,
    author: "Eric Mutangana",
    status: "open", // open, closed, or completed
    requests: [
      { id: 1, userId: 2, status: "pending" }, // pending, accepted, or rejected
      { id: 2, userId: 3, status: "accepted" }
    ]
  },
  {
    id: 2,
    title: "Smart Agriculture IoT System",
    description: "IoT devices with Arduino to monitor and automate small-scale farming in Rwanda",
    imageUrl: "https://picsum.photos/seed/2/800/600",
    likes: 24,
    author: "Grace Uwamahoro",
    status: "closed", // closed for new members
    requests: []
  },
  {
    id: 3,
    title: "RCA Learning Platform",
    description: "A collaborative platform for RCA students to share notes and coding exercises",
    imageUrl: "https://picsum.photos/seed/3/800/600",
    likes: 45,
    author: "Jean-Claude Niyomugabo",
    status: "completed", // project is completed
    requests: []
  }
];

export const MOCK_TEAMS = [
  {
    id: 1,
    name: "RCA Web Developers",
    description: "A team focused on full-stack web development using React, Node.js, and MongoDB",
    members: 5,
    openPositions: 2,
    createdAt: "2023-09-15"
  },
  {
    id: 2,
    name: "Machine Learning Group",
    description: "Exploring machine learning algorithms and AI applications for local Rwandan problems",
    members: 4,
    openPositions: 3,
    createdAt: "2023-10-05"
  }
];

export const MOCK_USERS = [
  {
    id: 1,
    name: "Diane Ishimwe",
    course: "Software Engineering",
    avatar: "https://picsum.photos/seed/user1/300/300"
  },
  {
    id: 2,
    name: "Kevin Mugisha",
    course: "Network Engineering",
    avatar: "https://picsum.photos/seed/user2/300/300"
  },
  {
    id: 3,
    name: "Alice Uwase",
    course: "Data Science & AI",
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
    message: "I'd like to contribute my machine learning skills to improve the AI chatbot accuracy.",
    status: "pending",
    createdAt: "2024-04-02"
  },
  {
    id: 2, 
    userId: 3,
    projectId: 1,
    message: "I have experience with NLP and would like to work on the language model component.",
    status: "accepted",
    createdAt: "2024-04-01"
  }
];
