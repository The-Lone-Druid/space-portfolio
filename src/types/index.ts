export interface Hero {
  verified_skills: number
  professional_projects: number
  personal_projects: number
}

export interface Skill {
  id: number
  name: string
  category?: string
}

export interface ProjectTask {
  id: number
  task: string
}

export interface SkillUtilized {
  id: number
  name: string
}

export interface Project {
  id: number
  project_name: string
  project_date: string
  project_description: string
  project_link: string
  project_tasks: ProjectTask[]
  skills_utilized: SkillUtilized[]
  image?: string
  github_link?: string
  featured?: boolean
}

export interface Service {
  id: number
  name: string
  desc: string
  icon: string
}

export interface ContactForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface PersonalInfo {
  name: string
  title: string
  bio: string
  email: string
  location: string
  resume_url?: string
  social_links: SocialLink[]
}
