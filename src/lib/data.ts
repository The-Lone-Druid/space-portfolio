import { Hero, PersonalInfo, Project, Service, Skill } from '@/types'

export const personalInfo: PersonalInfo = {
  name: 'Zahid Shaikh',
  title: 'Full Stack Developer & Tech Innovator',
  bio: 'I craft modern web experiences and build scalable applications that drive user satisfaction. With a passion for clean code and innovative solutions, I transform ideas into powerful digital products.',
  email: 'reachtozahid@gmail.com',
  location: 'Mumbai, Maharashtra',
  resume_url: '#',
  social_links: [
    {
      name: 'GitHub',
      url: 'https://github.com/zahidshaikh',
      icon: 'fab fa-github',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/zahidshaikh',
      icon: 'fab fa-linkedin',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/zahidshaikh',
      icon: 'fab fa-twitter',
    },
  ],
}

export const heroStats: Hero = {
  verified_skills: 25,
  professional_projects: 12,
  personal_projects: 16,
}

export const skills: Skill[] = [
  { id: 0, name: 'HTML', category: 'Frontend' },
  { id: 1, name: 'CSS', category: 'Frontend' },
  { id: 2, name: 'SCSS', category: 'Frontend' },
  { id: 3, name: 'JavaScript', category: 'Frontend' },
  { id: 4, name: 'TypeScript', category: 'Frontend' },
  { id: 5, name: 'React', category: 'Frontend' },
  { id: 6, name: 'Next.js', category: 'Frontend' },
  { id: 7, name: 'Angular', category: 'Frontend' },
  { id: 8, name: 'React Native', category: 'Mobile' },
  { id: 9, name: 'Ionic', category: 'Mobile' },
  { id: 10, name: 'Capacitor.js', category: 'Mobile' },
  { id: 11, name: 'Node.js', category: 'Backend' },
  { id: 12, name: 'Firebase', category: 'Backend' },
  { id: 13, name: 'REST API', category: 'Backend' },
  { id: 14, name: 'WordPress', category: 'CMS' },
  { id: 15, name: 'Figma', category: 'Design' },
  { id: 16, name: 'Git', category: 'Tools' },
  { id: 17, name: 'GitHub', category: 'Tools' },
  { id: 18, name: 'Tailwind CSS', category: 'Frontend' },
  { id: 19, name: 'Material UI', category: 'Frontend' },
  { id: 20, name: 'Bootstrap', category: 'Frontend' },
  { id: 21, name: 'Responsive Design', category: 'Frontend' },
  { id: 22, name: 'jQuery', category: 'Frontend' },
  { id: 23, name: 'Webpack', category: 'Tools' },
  { id: 24, name: 'Vite', category: 'Tools' },
]

export const projects: Project[] = [
  {
    id: 1,
    project_name: 'Cosmic Portfolio',
    project_date: 'AUG 2025 - Present',
    project_description:
      'A stellar portfolio website built with Next.js 15, featuring space-themed animations and modern web technologies. Showcases projects in a cosmic interface with smooth animations.',
    project_link: 'https://zahidshaikh.space/',
    github_link: 'https://github.com/zahidshaikh/cosmic-portfolio',
    featured: true,
    project_tasks: [
      { id: 0, task: 'Designed and implemented space-themed UI components' },
      { id: 1, task: 'Built responsive layouts with Tailwind CSS' },
      { id: 2, task: 'Integrated smooth animations with Framer Motion' },
      { id: 3, task: 'Optimized performance and SEO' },
    ],
    skills_utilized: [
      { id: 0, name: 'Next.js' },
      { id: 1, name: 'TypeScript' },
      { id: 2, name: 'Tailwind CSS' },
      { id: 3, name: 'Framer Motion' },
      { id: 4, name: 'React' },
    ],
  },
  {
    id: 2,
    project_name: 'Spotfinder',
    project_date: 'APR 2022 - OCT 2022',
    project_description:
      'A revolutionary parking solution platform where users can book car parking spaces through mobile app and web interface with real-time availability.',
    project_link: 'https://spotfinder.app/',
    featured: true,
    project_tasks: [
      {
        id: 0,
        task: 'Converting Design Systems into reusable CSS and Components',
      },
      { id: 1, task: 'Making complex responsive layouts' },
      { id: 2, task: 'Developing and maintaining user interfaces' },
      { id: 3, task: 'Optimization, Performance and UX Improvement' },
      { id: 4, task: 'Integrating APIs and RESTful Services' },
    ],
    skills_utilized: [
      { id: 0, name: 'HTML' },
      { id: 1, name: 'SCSS' },
      { id: 2, name: 'JavaScript' },
      { id: 3, name: 'React' },
      { id: 4, name: 'React Native' },
      { id: 5, name: 'TypeScript' },
    ],
  },
  {
    id: 3,
    project_name: 'Neev Healthcare',
    project_date: 'FEB 2021 - APR 2022',
    project_description:
      'A comprehensive healthcare platform enabling users to book yoga classes, purchase health products, and access wellness services in one unified ecosystem.',
    project_link: '#',
    project_tasks: [
      { id: 0, task: 'Converting Design Systems into reusable components' },
      { id: 1, task: 'Building responsive healthcare interfaces' },
      { id: 2, task: 'Implementing booking and payment systems' },
      { id: 3, task: 'Optimizing user experience for wellness services' },
    ],
    skills_utilized: [
      { id: 0, name: 'React' },
      { id: 1, name: 'Node.js' },
      { id: 2, name: 'CSS' },
      { id: 3, name: 'JavaScript' },
      { id: 4, name: 'REST API' },
    ],
  },
]

export const services: Service[] = [
  {
    id: 0,
    name: 'Stellar Web Design',
    icon: 'fas fa-rocket',
    desc: 'I craft cosmic user experiences using cutting-edge design tools like Figma, creating prototypes that give clients a glimpse into their digital universe before launch.',
  },
  {
    id: 1,
    name: 'Code to Orbit Conversion',
    icon: 'fab fa-html5',
    desc: 'Transform your designs into responsive, pixel-perfect websites using modern web technologies. Your vision will be launched exactly as designed across all devices.',
  },
  {
    id: 2,
    name: 'Clean Cosmic Code',
    icon: 'fas fa-laptop-code',
    desc: 'Every line of code is written with stellar precision - 100% clean, valid, and maintainable. Built for scalability and easy understanding by future space travelers.',
  },
  {
    id: 3,
    name: 'Mission-Ready Customization',
    icon: 'fas fa-cogs',
    desc: 'Develop websites with modular architecture, making them easily customizable for evolving business needs and seamless feature integration.',
  },
  {
    id: 4,
    name: 'Multi-Device Exploration',
    icon: 'fas fa-mobile-alt',
    desc: 'Create responsive experiences that adapt perfectly across all devices - from mobile to desktop, ensuring your users can explore your digital space anywhere.',
  },
  {
    id: 5,
    name: 'Version Control Mission',
    icon: 'fab fa-github',
    desc: "Maintain your project's trajectory using advanced version control systems, ensuring smooth deployments and coordinated development across the team.",
  },
]

export const data = {
  personalInfo,
  heroStats,
  skills,
  projects,
  services,
}
