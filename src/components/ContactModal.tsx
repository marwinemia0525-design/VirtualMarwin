import { motion } from "framer-motion";
import { Calendar, Linkedin, Mail, MapPin, Phone, ExternalLink, FileText, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactModal = ({ open, onOpenChange }: ContactModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-primary text-primary-foreground border-primary-foreground/10">
        <DialogHeader>
          <DialogTitle className="text-center">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest mb-2 block">
              Get In Touch
            </span>
            <span className="text-2xl md:text-3xl font-bold">
              Let's Work Together
            </span>
          </DialogTitle>
          <p className="text-primary-foreground/70 text-center text-sm mt-2">
            Ready to streamline your business operations? Let's discuss how I can help you achieve your goals.
          </p>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <a
                href="mailto:marwinemia0525@gmail.com"
                className="flex items-center gap-3 p-3 rounded-xl bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/60">Email</p>
                  <p className="text-sm font-medium group-hover:text-accent transition-colors">marwinemia0525@gmail.com</p>
                </div>
              </a>

              <a
                href="tel:+63763147667"
                className="flex items-center gap-3 p-3 rounded-xl bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/60">Phone</p>
                  <p className="text-sm font-medium group-hover:text-accent transition-colors">+63 763 147 667</p>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-primary-foreground/5">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/60">Location</p>
                  <p className="text-sm font-medium">Davao del Sur, Philippines 8007</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://www.linkedin.com/in/marwin-emia-74a8aa366"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors text-xs"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
              <a
                href="https://www.onlinejobs.ph/jobseekers/info/4179763"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors text-xs"
              >
                <FileText size={14} />
                OnlineJobs Profile
              </a>
            </div>
          </div>

          {/* Book a Call CTA */}
          <div className="flex flex-col justify-center">
            <div className="p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10">
              <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Schedule a Discovery Call</h3>
              <p className="text-primary-foreground/70 mb-4 text-sm">
                Book a free 30-minute consultation to discuss your business needs and how I can help streamline your operations.
              </p>
              <a
                href="https://calendly.com/marwinemia0525/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center text-sm"
              >
                <Calendar size={16} />
                Book a 30-Min Call
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
