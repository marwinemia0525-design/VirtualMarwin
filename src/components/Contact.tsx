import { motion } from "framer-motion";
import { Calendar, Linkedin, Mail, MapPin, Phone, ExternalLink, FileText } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="section-padding relative overflow-hidden section-glow">
      {/* Background - using gradient instead of solid color */}
      <div 
        className="absolute inset-0"
        style={{ background: 'var(--gradient-hero)' }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]" style={{ background: 'var(--gradient-glow)' }} />
      
      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Let's Work Together
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to streamline your business operations? Let's discuss how I can help you achieve your goals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <a
                href="mailto:marwinemia0525@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium group-hover:text-accent transition-colors">marwinemia0525@gmail.com</p>
                </div>
              </a>

              <a
                href="tel:+63763147667"
                className="flex items-center gap-4 p-4 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium group-hover:text-accent transition-colors">+63 763 147 667</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Davao del Sur, Philippines 8007</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/in/marwin-emia-74a8aa366"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card/60 backdrop-blur-sm border border-border/50 hover:border-accent/50 hover:text-accent transition-all text-sm"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
              <a
                href="https://www.onlinejobs.ph/jobseekers/info/4179763"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card/60 backdrop-blur-sm border border-border/50 hover:border-accent/50 hover:text-accent transition-all text-sm"
              >
                <FileText size={18} />
                OnlineJobs Profile
              </a>
            </div>
          </motion.div>

          {/* Book a Call CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="card-glass card-glow p-8">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6" style={{ boxShadow: '0 0 30px hsl(var(--accent) / 0.2)' }}>
                <Calendar className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Schedule a Discovery Call</h3>
              <p className="text-muted-foreground mb-6">
                Book a free 30-minute consultation to discuss your business needs and how I can help streamline your operations.
              </p>
              <a
                href="https://calendly.com/marwinemia0525/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                <Calendar size={18} />
                Book a 30-Min Call
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
