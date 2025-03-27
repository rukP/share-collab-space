
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
    createdAt: "2023-09-15",
    category: "Web Development",
    meetingTimes: "Tuesdays & Thursdays at 4PM",
    isRecruiting: true,
    teamLeader: "Grace Ishimwe",
    teamMembers: [
      { id: 1, name: "Grace Ishimwe", role: "Team Leader", avatar: "https://picsum.photos/seed/user1/300/300" },
      { id: 2, name: "Kevin Mugisha", role: "Frontend Developer", avatar: "https://picsum.photos/seed/user2/300/300" },
      { id: 3, name: "Alice Uwase", role: "Backend Developer", avatar: "https://picsum.photos/seed/user3/300/300" },
      { id: 4, name: "Jean Mugabo", role: "UI/UX Designer", avatar: "https://picsum.photos/seed/user4/300/300" },
      { id: 5, name: "Marie Uwimana", role: "DevOps Engineer", avatar: "https://picsum.photos/seed/user5/300/300" }
    ],
    projects: [
      { id: 1, title: "RCA Student Portal", description: "A comprehensive student portal for course management", imageUrl: "https://picsum.photos/seed/p1/800/600" },
      { id: 2, title: "Alumni Tracking System", description: "Platform to keep track of RCA alumni and their achievements", imageUrl: "https://picsum.photos/seed/p2/800/600" }
    ]
  },
  {
    id: 2,
    name: "Machine Learning Group",
    description: "Exploring machine learning algorithms and AI applications for local Rwandan problems",
    members: 4,
    openPositions: 3,
    createdAt: "2023-10-05",
    category: "Artificial Intelligence",
    meetingTimes: "Mondays & Fridays at 3PM",
    isRecruiting: true,
    teamLeader: "Eric Manzi",
    teamMembers: [
      { id: 6, name: "Eric Manzi", role: "Team Leader", avatar: "https://picsum.photos/seed/user6/300/300" },
      { id: 7, name: "Sophie Mukandayisenga", role: "Data Scientist", avatar: "https://picsum.photos/seed/user7/300/300" },
      { id: 8, name: "Claude Ndayisaba", role: "ML Engineer", avatar: "https://picsum.photos/seed/user8/300/300" },
      { id: 9, name: "Diane Uwera", role: "Research Assistant", avatar: "https://picsum.photos/seed/user9/300/300" }
    ],
    projects: [
      { id: 3, title: "Kinyarwanda Speech Recognition", description: "Machine learning model for Kinyarwanda speech recognition", imageUrl: "https://picsum.photos/seed/p3/800/600" },
      { id: 4, title: "Health Diagnosis Assistant", description: "AI system to assist with preliminary medical diagnoses", imageUrl: "https://picsum.photos/seed/p4/800/600" }
    ]
  },
  {
    id: 3,
    name: "Mobile App Developers",
    description: "Building cross-platform mobile applications with Flutter and React Native",
    members: 6,
    openPositions: 0,
    createdAt: "2023-08-20",
    category: "Mobile Development",
    meetingTimes: "Wednesdays at 5PM",
    isRecruiting: false,
    teamLeader: "Patrick Mugisha",
    teamMembers: [
      { id: 10, name: "Patrick Mugisha", role: "Team Leader", avatar: "https://picsum.photos/seed/user10/300/300" },
      { id: 11, name: "Samuel Kwizera", role: "Flutter Developer", avatar: "https://picsum.photos/seed/user11/300/300" },
      { id: 12, name: "Emma Abimana", role: "React Native Developer", avatar: "https://picsum.photos/seed/user12/300/300" },
      { id: 13, name: "David Niyonzima", role: "UI Designer", avatar: "https://picsum.photos/seed/user13/300/300" },
      { id: 14, name: "Sarah Umuhoza", role: "Backend Developer", avatar: "https://picsum.photos/seed/user14/300/300" },
      { id: 15, name: "John Mugwaneza", role: "QA Tester", avatar: "https://picsum.photos/seed/user15/300/300" }
    ],
    projects: [
      { id: 5, title: "RCA Connect", description: "Mobile app connecting RCA students and alumni", imageUrl: "https://picsum.photos/seed/p5/800/600" },
      { id: 6, title: "Kigali Transit", description: "Public transport tracking app for Kigali", imageUrl: "https://picsum.photos/seed/p6/800/600" }
    ]
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
