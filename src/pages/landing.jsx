import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Briefcase, Building2, Users, Clock, DollarSign, MapPin, ChevronRight, Sparkles, ChevronDown, HelpCircle, Copy, MessageCircle, MessageSquare, BookOpen } from 'lucide-react';
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import { useUser } from '@clerk/clerk-react';


const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const LandingPage = () => {
  const [openFAQIndex, setOpenFAQIndex] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const heroRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const { user } = useUser();

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroStyle = {
    transform: `translateY(${scrollY * 0.3}px)`,
    transition: 'transform 0.1s ease-out'
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 to-transparent opacity-20"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,transparent)]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="space-y-8">
              <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium bg-blue-500/10 border-blue-500/30 text-blue-300 hover:bg-blue-500/20">
                New Features Just Launched
              </Badge>
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Find Your Dream <span className="text-blue-400">Tech Job</span> Today
              </motion.h1>

              <motion.p
                className="text-lg text-gray-300 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Connect with top companies and discover opportunities that match your skills and aspirations.
                Join thousands of professionals who found their perfect role with us.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link to="/jobs" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-12 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-0.5">
                    Explore Jobs <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/post-job" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-6 border-gray-700 bg-gray-800/50 hover:bg-gray-800 text-white font-medium rounded-lg backdrop-blur-sm transition-all duration-300">
                    Post a Job <Briefcase className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                className="pt-4 flex items-center text-sm text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&auto=format",
                    "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=766&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format",
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face&auto=format"
                  ].map((avatar, i) => (
                    <motion.div
                      key={i}
                      className="relative"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.6 + (i * 0.1) }}
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                    >
                      <img
                        src={avatar}
                        alt={`Professional ${i + 1}`}
                        className="h-8 w-8 rounded-full border-2 border-gray-800 hover:border-blue-400 transition-all duration-300 object-cover"
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                  <motion.div
                    className="h-8 w-8 rounded-full border-2 border-gray-800 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white hover:scale-110 transition-transform duration-300 cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    +
                  </motion.div>
                </div>
                <span className="ml-3">Join our community of professionals</span>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-1 shadow-2xl border border-gray-800 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
                <div className="relative bg-gray-900 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-gray-800 flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="flex-1"></div>
                    <div className="text-xs text-gray-500">job-portal.dev</div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center p-4 bg-gray-800/50 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-colors">
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-white">Senior Frontend Engineer</h3>
                          <div className="flex flex-wrap items-center mt-1 text-sm text-gray-400">
                            <span className="flex items-center"><Building2 className="h-3.5 w-3.5 mr-1" /> TechCorp</span>
                            <span className="mx-2">•</span>
                            <span className="flex items-center"><MapPin className="h-3.5 w-3.5 mr-1" /> Remote</span>
                            <span className="mx-2">•</span>
                            <span className="flex items-center"><DollarSign className="h-3.5 w-3.5 mr-1" /> $120k–$160k</span>
                          </div>
                        </div>
                        <div className="ml-auto">
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        </div>
                      </div>

                      <div className="flex items-center p-4 bg-gray-800/50 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-colors">
                        <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-white">Product Designer</h3>
                          <div className="flex flex-wrap items-center mt-1 text-sm text-gray-400">
                            <span className="flex items-center"><Building2 className="h-3.5 w-3.5 mr-1" /> DesignHub</span>
                            <span className="mx-2">•</span>
                            <span className="flex items-center"><MapPin className="h-3.5 w-3.5 mr-1" /> San Francisco, CA</span>
                            <span className="mx-2">•</span>
                            <span className="flex items-center"><DollarSign className="h-3.5 w-3.5 mr-1" /> $110k–$150k</span>
                          </div>
                        </div>
                        <div className="ml-auto">
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        </div>
                      </div>

                      <div className="flex items-center p-4 bg-gray-800/50 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-colors">
                        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-white">DevOps Engineer</h3>
                          <div className="flex flex-wrap items-center mt-1 text-sm text-gray-400">
                            <span className="flex items-center"><Building2 className="h-3.5 w-3.5 mr-1" /> CloudScale</span>
                            <span className="mx-2">•</span>
                            <span className="flex items-center"><MapPin className="h-3.5 w-3.5 mr-1" /> Remote</span>
                            <span className="mx-2">•</span>
                            <span className="flex items-center"><DollarSign className="h-3.5 w-3.5 mr-1" /> $130k–$170k</span>
                          </div>
                        </div>
                        <div className="ml-auto">
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-800">
                      <div className="flex items-center">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <input
                            type="text"
                            placeholder="Search jobs, companies, or keywords..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white placeholder-gray-500"
                          />
                        </div>
                        <button className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors">
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-500/10 rounded-full filter blur-3xl"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm uppercase tracking-wider text-gray-400 mb-3">TRUSTED BY INNOVATIVE TEAMS</p>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto my-4"></div>
          </motion.div>

          <div className="relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>

            <motion.div
              className="flex items-center gap-8 md:gap-16 py-4"
              initial={{ x: 0 }}
              animate={{
                x: ['0%', '-50%'],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear'
              }}
            >
              {[...companies, ...companies].map((company, index) => (
                <div
                  key={`${company.id}-${index}`}
                  className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-300"
                >
                  <img
                    src={company.path}
                    alt={company.name}
                    className="h-8 sm:h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    title={company.name}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
{/* Features Section */}
<section className="py-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <motion.div 
      className="text-center max-w-3xl mx-auto mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium bg-green-500/10 border-green-500/30 text-green-300 hover:bg-green-500/20 mb-4">
          Why Choose Us
        </Badge>
      </motion.div>
      <motion.h2 
        className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Everything you need to advance your career
      </motion.h2>
      <motion.p 
        className="text-lg text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        We provide the tools and opportunities to help you find your dream job or the perfect candidate.
      </motion.p>
    </motion.div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {[
        {
          icon: <Briefcase className="h-6 w-6" />,
          title: "Job Matching",
          description: "Advanced algorithms match you with the most relevant job opportunities based on your skills and preferences.",
          color: "blue"
        },
        {
          icon: <Building2 className="h-6 w-6" />,
          title: "Company Insights",
          description: "Get detailed information about companies, including culture, benefits, and employee reviews.",
          color: "purple"
        },
        {
          icon: <Users className="h-6 w-6" />,
          title: "Networking",
          description: "Connect with industry professionals and expand your professional network.",
          color: "green"
        },
        {
          icon: <Clock className="h-6 w-6" />,
          title: "Time-Saving",
          description: "Our platform streamlines the job search process, saving you time and effort.",
          color: "yellow"
        },
        {
          icon: <DollarSign className="h-6 w-6" />,
          title: "Salary Insights",
          description: "Access salary data to help you negotiate better compensation packages.",
          color: "red"
        },
        {
          icon: <MapPin className="h-6 w-6" />,
          title: "Global Opportunities",
          description: "Find job opportunities from top companies around the world, both remote and on-site.",
          color: "pink"
        }
      ].map((feature, index) => (
        <motion.div
          key={index}
          className="group relative"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ 
            y: -8,
            transition: { duration: 0.3 }
          }}
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></div>
          
          {/* Animated border on hover */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px]">
            <div className="h-full w-full bg-gray-900 rounded-xl"></div>
          </div>
          
          <div className={`relative p-6 bg-gray-900/80 rounded-xl border border-gray-800 group-hover:border-transparent backdrop-blur-sm transition-all duration-300 overflow-hidden`}>
            
            {/* Floating particles background */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            
            {/* Icon with floating animation on hover */}
            <motion.div 
              className={`p-3 rounded-lg bg-${feature.color}-500/10 text-${feature.color}-400 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-${feature.color}-500/20 transition-colors`}
              whileHover={{ 
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 }
              }}
            >
              {feature.icon}
            </motion.div>
            
            {/* Title with slide-in underline on hover */}
            <div className="relative">
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                {feature.title}
              </h3>
              <motion.div 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500"
                initial={false}
              />
            </div>
            
            <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors duration-300">
              {feature.description}
            </p>
            
            {/* Animated "Learn more" button */}
            <motion.div 
              className={`flex items-center text-sm font-medium text-${feature.color}-400 group-hover:text-${feature.color}-300 transition-colors cursor-pointer`}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Learn more
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <ChevronRight className="ml-2 h-4 w-4" />
              </motion.div>
            </motion.div>
            
            {/* Subtle shimmer effect */}
            <div className="absolute top-0 -left-full group-hover:left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-700 group-hover:duration-1000"></div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"></div>
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              Ready to find your dream job?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who found their perfect role with us. It only takes a few minutes to get started.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup" className="inline-flex">
                <Button size="lg" className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-0.5">
                  Get Started for Free
                </Button>
              </Link>
              <Link to="/contact" className="inline-flex">
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-gray-700 bg-gray-800/50 hover:bg-gray-800 text-white font-medium rounded-xl backdrop-blur-sm transition-all duration-300">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
<section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
  <div className="max-w-4xl mx-auto">
    <motion.div 
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20 mb-4 inline-block">
          <Sparkles className="h-3 w-3 inline mr-1" /> FAQ
        </Badge>
      </motion.div>
      <motion.h2 
        className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Frequently Asked Questions
      </motion.h2>
      <motion.p 
        className="text-lg text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Can't find the answer you're looking for?{" "}
        <Link to="/contact" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors">
          Reach out to our support team
        </Link>
      </motion.p>
    </motion.div>
    
<div className="space-y-4">
  {faqs.map((faq, index) => (
    <motion.div 
      key={index}
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <motion.div 
        className={`p-6 bg-gray-900/50 rounded-xl border transition-all duration-300 cursor-pointer
          ${openFAQIndex === index 
            ? 'border-blue-500/30 bg-gray-900/70 shadow-lg shadow-blue-500/5' 
            : 'border-gray-800 hover:border-gray-700 hover:bg-gray-900/70'
          }`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
      >
        {/* FAQ Header */}
        <motion.div 
          className="flex items-center justify-between"
          animate={openFAQIndex === index ? "open" : "closed"}
        >
          <div className="flex items-center">
            {/* Animated number indicator */}
            <motion.div 
              className={`w-8 h-8 rounded-lg flex items-center justify-center mr-4 text-sm font-bold
                ${openFAQIndex === index 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'bg-gray-800 text-gray-400'
                }`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {index + 1}
            </motion.div>
            
            <h3 className="text-lg font-medium text-white pr-8">
              {faq.question}
            </h3>
          </div>
          
          {/* Animated chevron */}
          <motion.div
            animate={{ rotate: openFAQIndex === index ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`flex-shrink-0 p-2 rounded-lg transition-colors
              ${openFAQIndex === index 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'bg-gray-800 text-gray-500 group-hover:bg-gray-700 group-hover:text-gray-300'
              }`}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
        
        {/* FAQ Answer with animation */}
        <motion.div
          initial={false}
          animate={{
            height: openFAQIndex === index ? "auto" : 0,
            opacity: openFAQIndex === index ? 1 : 0,
            marginTop: openFAQIndex === index ? "1.5rem" : 0
          }}
          transition={{ 
            duration: 0.4,
            ease: "easeInOut"
          }}
          className="overflow-hidden"
        >
          <div className="pl-12">
            <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-800">
              <p className="text-gray-300 leading-relaxed">
                {faq.answer}
              </p>
              
              {/* Additional action buttons when open */}
              {openFAQIndex === index && (
                <motion.div 
                  className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-800"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link 
                    to="/help-center" 
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                  >
                    <HelpCircle className="h-4 w-4 mr-1" />
                    More help
                  </Link>
                  <span className="text-gray-600">•</span>
                  <button 
                    className="text-sm text-gray-400 hover:text-gray-300 transition-colors flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(faq.answer);
                    }}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy answer
                  </button>
                </motion.div>
              )}
            </div>
            
            {/* Decorative line animation */}
            {openFAQIndex === index && (
              <motion.div 
                className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mt-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  ))}
</div>
    
    {/* Additional help CTA */}
    <motion.div 
      className="mt-12 p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl border border-gray-800 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 mb-4">
        <MessageCircle className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Still have questions?</h3>
      <p className="text-gray-400 mb-4">
        Our support team is here to help you 24/7
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/contact">
          <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Support
          </Button>
        </Link>
        <Link to="/help-center">
          <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
            <BookOpen className="h-4 w-4 mr-2" />
            Visit Help Center
          </Button>
        </Link>
      </div>
    </motion.div>
  </div>
</section>
    </div>
  );
};

export default LandingPage;
