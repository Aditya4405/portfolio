import profilePortrait from '../assets/images/p1.png'
import aboutPhoto from '../assets/images/p2.png'
import petCarePreview from '../assets/images/smart-pet-care.png'
import sortingPreview from '../assets/images/sorting-visualizer.png'
import mapMockup from '../assets/images/mapmypsit-mockup.png'
import parkEaseMockup from '../assets/images/parkease-mockup.png'

// Certificate Imports
import nptelJava from '../assets/images/nptel.jpg'
import codsoftWeb from '../assets/images/cods.jpg'
import icpcCert from '../assets/images/icpc.png'

export const personalInfo = {
  name: 'Aditya Prajapati',
  title: 'JAVA Backend Developer · Interested in AI/ML · Open to Internships',
  email: 'adityaprajapati4405@gmail.com',
  githubUsername: 'Aditya4405',
  college: 'PSIT Kanpur',
  profileImage: profilePortrait,
  aboutImage: aboutPhoto,
  roles: ['JAVA Backend Developer', 'Interested in AI/ML', 'Open to Internships'],
  socials: [
    { label: 'GitHub', href: 'https://github.com/Aditya4405' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aditya-prajapati-4405q' },
    { label: 'Email', href: 'mailto:adityaprajapati4405@gmail.com' },
    { label: 'LeetCode', href: 'https://leetcode.com/Aditya_4405' },
  ],
}

export const aboutHighlights = [
  {
    icon: '💻',
    title: 'Full-Stack Dev',
    body: 'I build end-to-end web apps using the React and Java Backend.',
  },
  {
    icon: '🧩',
    title: 'Problem Solver',
    body: 'I enjoy breaking down complex problems and building clean solutions.',
  },
  {
    icon: '📊',
    title: 'DSA on LeetCode',
    body: 'Sharpening my problem-solving consistently alongside coursework.',
  },
  {
    icon: '🤝',
    title: 'Open to Collaborate',
    body: 'Looking for internships and open to working on interesting projects.',
  },
]

export const skills = {
  frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
  backend: ['Java', 'Spring Boot', 'REST APIs','Authentication'],
  tools: ['MySQL', 'Git', 'GitHub', 'Postman','Eclipse','VS Code'],
}

export const projects = [
  {
    title: 'Smart Pet Care',
    preview: petCarePreview,
    summary: 'A full-stack SaaS-style Smart Pet Care Management System designed to bridge the gap between pet owners and veterinarians. Features centralized health records, automated reminders, and an intelligent dashboard for holistic pet parenting.',
    stack: ['React', 'Spring Boot', 'MySQL', 'Tailwind CSS'],
    github: 'https://github.com/Aditya4405/smart-pet-care',
    demo: 'https://smart-pet-care-two.vercel.app/',
    featured: true,
  },
  {
    title: 'Sorting Visualizer',
    preview: sortingPreview,
    summary: 'An advanced algorithm visualization tool that brings complex sorting logic to life. Features real-time analytics, step-by-step execution, and support for multiple algorithms like Quick, Merge, and Radix sort.',
    stack: ['JavaScript', 'Tailwind CSS', 'HTML5', 'Netlify'],
    github: 'https://github.com/Aditya4405/shorting-vizualizer',
    demo: 'https://sorting-view.netlify.app/',
    featured: true,
  },
  {
    title: 'MapmyPSIT',
    preview: mapMockup,
    summary: 'An indoor campus navigation app for PSIT college. Users can find rooms, labs, and facilities on an interactive map. Built with React and a custom backend API to provide seamless wayfinding.',
    stack: ['React', 'Node.js', 'Express', 'Leaflet'],
    github: 'https://github.com/Aditya4405',
    demo: 'https://github.com/Aditya4405',
    featured: false,
  },
  {
    title: 'ParkEase',
    preview: parkEaseMockup,
    summary: 'A smart parking and reservation application featuring a production-level role-based access system. Designed to streamline parking management through automated booking and user management.',
    stack: ['Java', 'Spring Boot', 'React', 'MySQL'],
    github: 'https://github.com/Aditya4405',
    demo: '#',
    status: 'Under Development',
    featured: false,
  },
]

export const achievements = [
  {
    title: 'Programming In Java (Elite)',
    org: 'Indian Institute of Technology Kharagpur',
    platform: 'NPTEL / SWAYAM',
    year: '2025',
    skills: ['Java SE', 'Multithreading', 'Generics', 'GUI'],
    category: 'Java',
    description: 'Successfully completed the 12-week intensive course with an Elite certification score of 75%. Mastered core Java concepts and industrial implementation patterns.',
    image: nptelJava,
  },
  {
    title: 'ICPC Asia Kanpur Preliminary',
    org: 'ICPC Foundation',
    platform: 'Pranveer Singh Institute of Technology',
    year: '2024',
    skills: ['Algorithms', 'Data Structures', 'Competitive Programming'],
    category: 'DSA',
    description: 'Participated in the prestigious International Collegiate Programming Contest. Solved complex algorithmic challenges under strict competition constraints.',
    image: icpcCert,
  },
  {
    title: 'Web Development Internship',
    org: 'CodSoft',
    platform: 'Virtual Internship',
    year: '2024',
    skills: ['Frontend', 'UI Design', 'API Integration', 'Portfolio Development'],
    category: 'Web',
    description: 'Completed a 4-week virtual internship program. Delivered production-style web features with emphasis on implementation ownership and site execution standards.',
    image: codsoftWeb,
  },
]

export const milestones = [
  {
    title: 'IIT Kharagpur Elite Certified',
    text: 'Achieved elite status in NPTEL Programming in Java course with a 75% score.',
  },
  {
    title: 'ICPC Regional Participant',
    text: 'Represented PSIT at the prestigious ICPC Asia Kanpur Preliminary Contest 2024.',
  },
  {
    title: 'CodSoft Internship Graduate',
    text: 'Successfully delivered production-style web projects during Java/Web development stint.',
  },
]

export const counters = [
  { value: 4, suffix: '+', label: 'Projects Completed' },
  { value: 1, suffix: '+', label: 'Internships' },
  { value: 3, suffix: '+', label: 'Certifications' },
  { value: 12, suffix: '+', label: 'Technologies Used' },
]

export const chatbotReplies = {
  about:
    'Aditya is a 3rd-year B.Tech CSE student at PSIT Kanpur, focusing on Java Backend Development and building robust applications with Spring Boot.',
  projects:
    'Featured projects include Smart Pet Care, Sorting Visualizer, MapmyPSIT, and the upcoming ParkEase application.',
  skills:
    'Aditya is strong in React, Node.js, Java, Spring Boot, REST APIs, MySQL, MongoDB, and Firebase.',
  resume:
    'Use the Download Resume button in the hero or contact section.',
  contact:
    'Reach out via the contact form, email at adityaprajapati4405@gmail.com, or through the social links.',
}
