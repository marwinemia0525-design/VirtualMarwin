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
      
      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest mb-4 block">
            What I Do
          </span>
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              className="card-glass card-glow p-6 cursor-pointer group"
            >
              <motion.div 
                className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.4 }}
              >
                <service.icon className="w-6 h-6 text-accent" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
