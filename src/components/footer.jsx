import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Github,
  Linkedin,
  Youtube,
  Send,
  Heart,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Browse Jobs', href: '/jobs' },
      { name: 'Companies', href: '/companies' },
      { name: 'Post a Job', href: '/post-job' },
      { name: 'Saved Jobs', href: '/saved-jobs' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Community', href: '/community' },
      { name: 'Status', href: '/status' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://x.com/ankitgupta_79', color: 'hover:text-blue-400' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/ankit-gupta-git/ai-job-portal', color: 'hover:text-gray-300' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/iamankit-gupta', color: 'hover:text-blue-500' },
    { name: 'Portfolio', icon: Youtube, href: 'https://portfolio-v1-eta-rosy.vercel.app/', color: 'hover:text-red-500' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gray-900/95 backdrop-blur-xl border-t border-gray-800/50">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-purple-500/5"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Company Info */}
            <motion.div
              className="lg:col-span-4 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center">
                <img src="/logo.png" alt="logo" className="h-10 w-16" />
              </div>

              <p className="text-gray-300 leading-relaxed max-w-md">
                Connecting talent with opportunity through innovative technology.
                We're revolutionizing the way people find jobs and companies discover talent.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">hello@hirrd.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
              </div>
            </motion.div>

            {/* Footer Links */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                >
                  <h3 className="text-white font-semibold mb-4 capitalize">
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          to={link.href}
                          className="text-gray-400 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 inline-block"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <motion.div
            className="mt-12 pt-8 border-t border-gray-800/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="max-w-md mx-auto text-center lg:mx-0 lg:text-left lg:max-w-none lg:flex lg:items-center lg:justify-between">
              <div className="lg:flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Stay updated with the latest jobs
                </h3>
                <p className="text-gray-400 text-sm mb-4 lg:mb-0">
                  Get weekly job recommendations and career insights delivered to your inbox.
                </p>
              </div>
              <div className="lg:ml-8 lg:flex-shrink-0">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500/50 focus:border-blue-500/50"
                  />
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white whitespace-nowrap">
                    <Send className="h-4 w-4 mr-2" />
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <Separator className="bg-gray-800/50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div
              className="flex items-center space-x-2 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span>© {currentYear} Hirrd. Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>by Ankit</span>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className={`text-gray-400 ${social.color} transition-all duration-200 p-2 rounded-lg hover:bg-gray-800/50`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </motion.a>
              ))}
            </motion.div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800/50"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <ArrowUp className="h-4 w-4" />
              <span className="text-sm">Back to top</span>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;