import { motion } from "framer-motion";
import { 
  Bot, 
  Calendar, 
  FileText, 
  Mail, 
  MessageSquare, 
  Search, 
  Share2, 
  ShoppingCart,
  Video,
  Zap
} from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "AI Automation",
    description: "Streamline your workflows with intelligent automation using tools like Zapier, n8n, and GoHighLevel.",
  },
  {
    icon: Calendar,
    title: "Calendar & Task Management",
    description: "Efficient scheduling, meeting coordination, and project management using Monday.com, ClickUp, and Trello.",
  },
  {
    icon: Mail,
    title: "Email Management",
    description: "Inbox organization, cold emailing campaigns, and professional email correspondence.",
  },
  {
    icon: FileText,
    title: "Content Writing",
    description: "SEO content writing, blog posts, website content creation, and email marketing campaigns.",
  },
  {
    icon: Search,
    title: "Research & Lead Generation",
    description: "Comprehensive research, lead prospecting, and database management with Airtable.",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description: "Content planning, scheduling, and engagement across all social platforms.",
  },
  {
    icon: Video,
    title: "Video Editing",
    description: "Professional video editing using CapCut and Canva for engaging visual content.",
  },
  {
    icon: ShoppingCart,
    title: "Order Processing",
    description: "Efficient order management and customer service support.",
  },
  {
    icon: MessageSquare,
    title: "Customer Communication",
    description: "Professional client handling via Zoom, Slack, and other communication platforms.",
  },
  {
    icon: Zap,
    title: "CRM & Pipeline Management",
    description: "GoHighLevel expertise for CRM, pipelines, and business automation.",
  },
];

const Services = () => {
  return (
    <section id="services" className="section-padding relative overflow-hidden section-glow">
      {/* Background effects */}
      <div 
        className="absolute inset-0"
        style={{ background: 'var(--gradient-hero)' }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
      
      {/* Animated floating icons */}
      <motion.div
        className="absolute top-20 left-10 text-accent/20"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Bot size={40} />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 text-accent/20"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Zap size={35} />
      </motion.div>
      <motion.div
        className="absolute top-1/2 right-20 text-accent/15"
        animate={{ x: [0, 15, 0], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <Mail size={30} />
      </motion.div>
      
      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="text-accent font-semibold text-sm uppercase tracking-widest mb-4 block"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            What I Do
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Services I Offer
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive virtual assistance solutions tailored to help your business 
            grow and operate efficiently.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ y: -8 }}
              className="card-glass card-glow p-6 cursor-pointer group relative overflow-hidden transition-transform duration-500 ease-out"
            >
              {/* Card hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
              
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-500 ease-out relative z-10 group-hover:scale-110">
                <service.icon className="w-6 h-6 text-accent transition-transform duration-500 group-hover:rotate-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-accent transition-colors duration-400 ease-out relative z-10">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
                {service.description}
              </p>
              
              {/* Animated border on hover */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent w-0 group-hover:w-full transition-all duration-700 ease-out" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
