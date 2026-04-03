import { motion } from "framer-motion";
import { Calendar, Linkedin, Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent("New Message From My Website");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nSource: Website Contact Form`
    );
    window.open(`mailto:marwinemia0525@gmail.com?subject=${subject}&body=${body}`, "_self");
    
    setIsSubmitted(true);
    toast({
      title: "Message prepared!",
      description: "Your email client will open with the message. I will get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden section-glow">
      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 sm:mb-4 block">Contact</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">Let's Automate Your Business.</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            Ready to eliminate manual work? Let's discuss how automation can transform your operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card-glass p-6 sm:p-8 text-center"
              >
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-accent mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Message Prepared!</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Your email client should open with your message. I will get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-1.5">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-card border ${errors.name ? "border-destructive" : "border-border"} text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all text-sm`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-[11px] sm:text-xs text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-1.5">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-card border ${errors.email ? "border-destructive" : "border-border"} text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all text-sm`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-[11px] sm:text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-1.5">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => { setFormData({ ...formData, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-card border ${errors.message ? "border-destructive" : "border-border"} text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all text-sm resize-none`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && <p className="text-[11px] sm:text-xs text-destructive mt-1">{errors.message}</p>}
                </div>
                <button type="submit" className="btn-cta w-full justify-center">
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            )}

            <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
              <a href="mailto:marwinemia0525@gmail.com" className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-card border border-border hover:border-accent/30 transition-all duration-300 text-xs sm:text-sm text-muted-foreground hover:text-foreground">
                <Mail size={14} className="text-accent sm:w-4 sm:h-4" />
                Email Me
              </a>
              <a href="https://calendly.com/marwinemia0525/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-card border border-border hover:border-accent/30 transition-all duration-300 text-xs sm:text-sm text-muted-foreground hover:text-foreground">
                <Calendar size={14} className="text-accent sm:w-4 sm:h-4" />
                Schedule Call
              </a>
              <a
                href="https://www.upwork.com/freelancers/~0176000d5826043a12"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-white text-xs sm:text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: "#14A800", boxShadow: "0 2px 10px rgba(20, 168, 0, 0.25)" }}
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor">
                  <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
                </svg>
                Hire Me
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-between"
          >
            <div className="space-y-3 sm:space-y-4">
              <a href="mailto:marwinemia0525@gmail.com" className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 card-glass hover:-translate-y-0.5 transition-transform duration-300">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'hsl(var(--accent) / 0.1)', border: '1px solid hsl(var(--accent) / 0.2)' }}>
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Email</p>
                  <p className="text-xs sm:text-sm font-medium truncate">marwinemia0525@gmail.com</p>
                </div>
              </a>
              <a href="tel:+639300531734" className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 card-glass hover:-translate-y-0.5 transition-transform duration-300">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'hsl(var(--accent) / 0.1)', border: '1px solid hsl(var(--accent) / 0.2)' }}>
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Phone</p>
                  <p className="text-xs sm:text-sm font-medium">+63 930 053 1734</p>
                </div>
              </a>
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 card-glass">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'hsl(var(--accent) / 0.1)', border: '1px solid hsl(var(--accent) / 0.2)' }}>
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Location</p>
                  <p className="text-xs sm:text-sm font-medium">Davao del Sur, Philippines</p>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 flex gap-3">
              <a href="https://www.linkedin.com/in/marwin-emia-74a8aa366" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-card border border-border hover:border-accent/30 transition-all duration-300 text-xs sm:text-sm text-muted-foreground hover:text-foreground">
                <Linkedin size={14} className="sm:w-4 sm:h-4" />
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
