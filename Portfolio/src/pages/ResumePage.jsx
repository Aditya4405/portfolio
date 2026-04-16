import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, Printer, Mail, MapPin, Phone, ExternalLink, Award, BookOpen, Briefcase, Code, GraduationCap, CheckCircle2 } from 'lucide-react'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { personalInfo } from '../data/portfolio'
import { useTheme } from '../hooks/useTheme'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
})

const SectionHeader = ({ icon: Icon, title }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', marginTop: '32px' }}>
    <div style={{ 
      width: '36px', 
      height: '36px', 
      borderRadius: '10px', 
      background: 'rgba(239, 68, 68, 0.1)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: '#ef4444'
    }}>
      <Icon size={18} />
    </div>
    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>{title}</h2>
    <div style={{ flex: 1, height: '1px', background: 'var(--card-border)', marginLeft: '12px' }} />
  </div>
)

const ResumePage = () => {
  const { theme } = useTheme()
  const resumeUrl = '/Aditya_Prajapati_Resume.pdf'

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = "Aditya Prajapati | Resume"
  }, [])

  const handlePrint = () => {
    window.print()
  }

  const resumeData = {
    name: "ADITYA PRAJAPATI",
    location: "Kanpur, Uttar Pradesh, India",
    email: "adityaprajapati4405@gmail.com",
    phone: "6388244464",
    linkedin: "linkedin.com/in/aditya-prajapati-4405q/",
    github: "github.com/Aditya4405",
    objective: "Motivated Computer Science undergraduate with hands-on experience in full-stack development using Java, Spring Boot, and React.js. Passionate about building scalable applications and solving real-world problems while continuously improving technical and collaborative skills.",
    education: [
      {
        inst: "Pranveer Singh Institute of Technology, Kanpur",
        degree: "Bachelor of Technology | CGPA: 7.73",
        period: "2023 — 2027"
      },
      {
        inst: "S.G.M International School, Kanpur",
        degree: "Intermediate | Percentage: 81.4",
        period: "2021 — 2022"
      },
      {
        inst: "S.G.M International School, Kanpur",
        degree: "High School | Percentage: 85.6",
        period: "2019 — 2020"
      }
    ],
    skills: {
      languages: ["Java", "SQL", "C", "JavaScript"],
      backend: ["Spring Boot", "REST APIs", "JWT Authentication"],
      core: ["Data Structures & Algorithms", "Object-Oriented Programming (OOP)"],
      tools: ["Git", "GitHub", "Visual Studio Code", "Eclipse IDE", "MySQL"],
      soft: ["Communication", "Team Collaboration", "Time Management"]
    },
    experience: [
      {
        company: "Infosys",
        role: "Backend Developer Intern",
        period: "Feb 2026 — Present",
        points: [
          "Developing Smart PetCare, a multi-role platform for pet healthcare and services.",
          "Implementing RESTful APIs, JWT Authentication, and RBAC for secure access.",
          "Designing and managing relational database schemas for pets and appointments.",
          "Building features like pet health records and marketplace with cart/order tracking.",
          "Integrating React.js frontend with Spring Boot backend for real-time application."
        ]
      }
    ],
    projects: [
      {
        title: "Health Report Analyzer",
        stack: "Java, Spring Boot, MySQL | 2025",
        points: [
          "Developed a healthcare platform for secure storage and management of patient reports.",
          "Built RESTful backend services using Spring Boot with centralized interface.",
          "Implemented real-time data synchronization using Firebase for reliability.",
          "Ensured data security through role-based access and optimized backend design."
        ]
      },
      {
        title: "Sorting Visualizer",
        stack: "HTML, CSS, JavaScript | 2025",
        points: [
          "Designed an interactive web application to visualize various sorting algorithms.",
          "Implemented Bubble, Selection, Insertion, and other sorting with dynamic animations.",
          "Enabled users to analyze time complexity and understand algorithm behavior."
        ]
      }
    ],
    certificates: [
      "Programming with Java – NPTEL",
      "Introduction to HTML – Infosys",
      "Database Management System – Infosys Springboard"
    ]
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--bg-primary)', 
      color: 'var(--text-primary)',
      padding: '24px 0 80px',
      position: 'relative'
    }}>
      {/* ── TOP NAV ── */}
      <div style={{ 
        position: 'sticky', 
        top: '12px', 
        zIndex: 100, 
        width: 'min(1000px, 92%)', 
        margin: '0 auto 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 20px',
        background: 'rgba(5, 5, 5, 0.8)',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        border: '1px solid var(--card-border)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }} className="top-nav-wrap">
        <a href="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          fontSize: '0.9rem', 
          fontWeight: 600, 
          color: 'var(--text-secondary)',
          textDecoration: 'none'
        }}>
          <ArrowLeft size={18} /> Back to Portfolio
        </a>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handlePrint} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.75rem' }}>
            <Printer size={15} /> Print
          </button>
          <a href={resumeUrl} download className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.75rem' }}>
            <Download size={15} /> Download
          </a>
        </div>
      </div>

      {/* ── MAIN RESUME CARD ── */}
      <main className="container" style={{ maxWidth: '900px', width: '92%' }}>
        <motion.div 
          {...fadeUp(0)}
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '24px',
            padding: '48px',
            boxShadow: 'var(--card-shadow)',
            position: 'relative',
          }}
          className="resume-container"
        >
          {/* Header Section */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <motion.h1 
              {...fadeUp(0.1)}
              style={{ fontSize: '2.6rem', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.04em' }}
            >
              {resumeData.name}
            </motion.h1>
            
            <motion.div 
              {...fadeUp(0.2)}
              style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center', 
                columnGap: '24px', 
                rowGap: '8px',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                marginBottom: '24px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={15} style={{ color: '#ef4444' }} /> {resumeData.location}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={15} style={{ color: '#ef4444' }} /> {resumeData.email}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={15} style={{ color: '#ef4444' }} /> {resumeData.phone}</div>
            </motion.div>

            <motion.div 
               {...fadeUp(0.3)}
               style={{ display: 'flex', justifyContent: 'center', gap: '24px', fontSize: '0.9rem' }}
            >
              <a href={"https://" + resumeData.linkedin} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', textDecoration: 'none' }} className="link-hover"><FiLinkedin size={15} /> LinkedIn</a>
              <a href={"https://" + resumeData.github} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', textDecoration: 'none' }} className="link-hover"><FiGithub size={15} /> GitHub</a>
            </motion.div>
          </div>

          {/* Career Objective */}
          <motion.div {...fadeUp(0.4)}>
            <SectionHeader icon={Briefcase} title="Career Objective" />
            <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{resumeData.objective}</p>
          </motion.div>

          {/* Education */}
          <motion.div {...fadeUp(0.5)}>
            <SectionHeader icon={GraduationCap} title="Education" />
            <div style={{ display: 'grid', gap: '20px' }}>
              {resumeData.education.map((edu, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                   <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{edu.inst}</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{edu.degree}</p>
                   </div>
                   <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{edu.period}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div {...fadeUp(0.6)}>
            <SectionHeader icon={Code} title="Skills" />
            <div style={{ display: 'grid', gap: '16px' }}>
               {[
                 { label: 'Programming Languages', val: resumeData.skills.languages },
                 { label: 'Backend Technologies', val: resumeData.skills.backend },
                 { label: 'Core Computer Science', val: resumeData.skills.core },
                 { label: 'Tools and Platforms', val: resumeData.skills.tools },
                 { label: 'Soft Skills', val: resumeData.skills.soft }
               ].map((skillGrp, i) => (
                 <div key={i} style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>• {skillGrp.label}:</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{skillGrp.val.join(', ')}</span>
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div {...fadeUp(0.7)}>
            <SectionHeader icon={Briefcase} title="Experience" />
            {resumeData.experience.map((exp, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{exp.company} | <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{exp.role}</span></h4>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{exp.period}</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '8px' }}>
                  {exp.points.map((p, j) => (
                    <li key={j} style={{ display: 'flex', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      <span style={{ color: '#ef4444' }}>•</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* Projects */}
          <motion.div {...fadeUp(0.8)}>
            <SectionHeader icon={BookOpen} title="Projects" />
            <div style={{ display: 'grid', gap: '28px' }}>
              {resumeData.projects.map((proj, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>{proj.title} | <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{proj.stack}</span></h4>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '6px' }}>
                    {proj.points.map((p, j) => (
                      <li key={j} style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        <span style={{ color: '#ef4444' }}>•</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certificates */}
          <motion.div {...fadeUp(0.9)}>
            <SectionHeader icon={Award} title="Certificates" />
            <div style={{ display: 'grid', gap: '10px' }}>
              {resumeData.certificates.map((cert, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} style={{ color: '#ef4444' }} /> {cert}
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </main>

      <style>{`
        @media print {
          .top-nav-wrap, .chatbot-trigger { display: none !important; }
          body { background: white !important; color: black !important; padding: 0 !important; }
          .resume-container { 
            border: none !important; 
            box-shadow: none !important; 
            padding: 0 !important; 
            background: white !important;
          }
          .resume-container * { color: black !important; }
        }
        .link-hover:hover { color: #ef4444 !important; }
      `}</style>
    </div>
  )
}

export default ResumePage
