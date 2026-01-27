import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Branch Manager",
    company: "Desmark Corporation - Digos Branch",
    period: "July 2022 - Present",
    description: "Managed branch budget within 5% of figures while exceeding sales targets by 20%. Improved collection efficiency by 18% through optimized processes and tailored payment plans.",
    highlights: ["Budget Management", "Sales Leadership", "Team Supervision"],
  },
  {
    type: "work",
    title: "Branch Manager",
    company: "Premio Corporation - Matina Branch",
    period: "April 2021 - July 2022",
    description: "Promoted from Branch OIC due to outstanding leadership and operational performance. Led branch operations and achieved consistent sales growth.",
    highlights: ["Operations Management", "Staff Leadership", "Performance Excellence"],
  },
  {
    type: "work",
    title: "Branch OIC",
    company: "Premio Corporation - Matina Branch",
    period: "November 2020 - April 2021",
    description: "Assumed responsibility for branch operations and staff supervision in the absence of the Branch Manager.",
    highlights: ["Operations Oversight", "Team Management"],
  },
  {
    type: "work",
    title: "Credit Investigator / Collection Officer",
    company: "Premio Corporation - Matina Branch",
    period: "October 2017 - November 2020",
    description: "Investigated creditworthiness of customers and managed overdue accounts. Successfully reduced overdue accounts by 18%.",
    highlights: ["Credit Analysis", "Collections", "Customer Relations"],
  },
  {
    type: "work",
    title: "Product Field Specialist",
    company: "LG Electronics, Du Ek Sam Digos",
    period: "June 2017 - September 2017",
    description: "Demonstrated product features and benefits to customers. Worked towards achieving daily, weekly, and monthly sales targets.",
    highlights: ["Product Demonstration", "Sales Achievement"],
  },
];

const education = {
  degree: "Bachelor of Arts",
  major: "Major in English",
  school: "Southeastern College of Padada",
  period: "November 2015 - May 2017",
};

const certifications = [
  "Civil Service Exam Passer - Professional Level (80.26%)",
  "Masterclass Virtual Assistant (MVA) - Surge Marketplace Training Center",
  "Safety Officer 1 - DOLE Occupational Safety and Health Center",
  "Honda Phil. Multi Brand Staff Training",
  "Capability Building Seminar - DTI Davao del Sur",
];

const Experience = () => {
  return (
    <section id="experience" className="section-padding">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest mb-4 block">
            Career Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Work Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Over 7 years of progressive experience in management, operations, and customer service.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="timeline-line hidden md:block" />
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative md:pl-16"
              >
                {/* Timeline Dot */}
                <motion.div 
                  className="hidden md:flex absolute left-0 top-0 w-12 h-12 rounded-full bg-card border-2 border-accent items-center justify-center"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Briefcase className="w-5 h-5 text-accent" />
                </motion.div>
                
                <motion.div 
                  className="card-glass p-6 hover:shadow-xl transition-shadow"
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                    <span className="text-sm text-accent font-medium">{exp.period}</span>
                  </div>
                  <p className="text-muted-foreground font-medium mb-3">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight) => (
                      <motion.span
                        key={highlight}
                        className="px-3 py-1 text-xs font-medium bg-secondary rounded-full text-secondary-foreground cursor-default"
                        whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--accent) / 0.2)" }}
                      >
                        {highlight}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-glass p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Education</h3>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{education.degree}</h4>
              <p className="text-muted-foreground">{education.major}</p>
              <p className="text-sm text-muted-foreground mt-1">{education.school}</p>
              <p className="text-sm text-accent mt-2">{education.period}</p>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card-glass p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Certifications</h3>
            </div>
            <ul className="space-y-3">
              {certifications.map((cert, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  {cert}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
