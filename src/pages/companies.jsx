import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Building2, MapPin, Briefcase, Star, Filter, X, Loader2, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@clerk/clerk-react';
import { getCompanies } from '@/api/apiCompanies';
import { toast } from 'sonner';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } }
};

const Companies = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    industry: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [uniqueIndustries, setUniqueIndustries] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef(null);

  // Fetch companies with filters
  const fetchCompanies = async () => {
    if (!isLoaded) return;
    
    setIsLoading(true);
    try {
      const token = await user?.getIdToken();
      const { data } = await getCompanies(token, {
        search: searchTerm,
        location: filters.location,
        industry: filters.industry
      });
      
      setCompanies(data || []);
      
      // Extract unique locations and industries for filters
      if (data?.length > 0) {
        const locations = [...new Set(data.map(company => company.location))];
        const industries = [...new Set(data.flatMap(company => company.industry || []))];
        setUniqueLocations(locations);
        setUniqueIndustries(industries);
      }
    } catch (error) {
      console.error('Failed to fetch companies:', error);
      toast.error('Failed to load companies. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCompanies();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm, filters, isLoaded]);

  const clearFilters = () => {
    setFilters({
      location: '',
      industry: '',
    });
  };

  // Handle scroll for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading skeleton
  if (isLoading && companies.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-32" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-12 w-12 rounded-md" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-4" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky search header */}
      <div className={`sticky top-16 z-40 bg-background/80 backdrop-blur-md transition-all ${isScrolled ? 'border-b shadow-sm' : ''}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                ref={searchRef}
                type="text"
                placeholder="Search companies..."
                className="pl-10 w-full bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant={showFilters ? "default" : "outline"} 
              className="gap-2 shrink-0"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </Button>
          </div>
          
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: '1rem' }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={filters.location}
                          onChange={(e) => setFilters({...filters, location: e.target.value})}
                        >
                          <option value="">All Locations</option>
                          {uniqueLocations.map((location) => (
                            <option key={location} value={location}>
                              {location}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Industry</label>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={filters.industry}
                          onChange={(e) => setFilters({...filters, industry: e.target.value})}
                        >
                          <option value="">All Industries</option>
                          {uniqueIndustries.map((industry) => (
                            <option key={industry} value={industry}>
                              {industry}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {(filters.location || filters.industry) && (
                      <div className="flex justify-end mt-4">
                        <Button 
                          variant="ghost" 
                          onClick={clearFilters} 
                          className="text-primary hover:bg-primary/10"
                          size="sm"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Clear Filters
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial="hidden"
          animate="show"
          variants={container}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <motion.h1 variants={item} className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Find Top Companies
          </motion.h1>
          <motion.p variants={item} className="text-lg text-muted-foreground">
            Discover the best companies to work for and find your dream job today.
          </motion.p>
        </motion.div>


        {/* Companies Grid */}
        <AnimatePresence mode="wait">
          {companies.length > 0 ? (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {companies.map((company) => (
                <motion.div 
                  key={company.id}
                  variants={item}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  onClick={() => navigate(`/companies/${company.id}`)}
                  className="cursor-pointer group"
                >
                  <Card className="h-full transition-all duration-300 group-hover:shadow-md group-hover:border-primary/50 overflow-hidden">
                    <CardHeader className="pb-3 relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10 flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg bg-muted/50 flex items-center justify-center overflow-hidden">
                            {company.logo ? (
                              <img 
                                src={`/companies/${company.logo}`} 
                                alt={company.name}
                                className="h-10 w-10 object-contain"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/companies/default-company.png';
                                }}
                              />
                            ) : (
                              <Building2 className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                              {company.name}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center text-amber-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="ml-1 text-sm text-foreground/80">
                                  {company.rating || 'N/A'}
                                </span>
                              </div>
                              <span className="text-sm text-muted-foreground">•</span>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Briefcase className="h-4 w-4 mr-1" />
                                {company.jobs || 0} {company.jobs === 1 ? 'job' : 'jobs'}
                              </div>
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant={company.jobType?.toLowerCase() === 'hiring' ? 'default' : 'secondary'}
                          className="shrink-0 text-xs"
                        >
                          {company.jobType || 'Hiring'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-3 min-h-[60px]">
                        {company.description || 'No description available'}
                      </p>
                      {company.industry?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2 mb-4">
                          {company.industry.slice(0, 3).map((tag) => (
                            <Badge 
                              key={tag} 
                              variant="secondary" 
                              className="text-xs bg-secondary/50 hover:bg-secondary/70"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
                          <span className="truncate">{company.location || 'Location not specified'}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-primary">
                          View <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="mx-auto h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground">No companies found</h3>
              <p className="mt-1 text-muted-foreground max-w-md mx-auto">
                {searchTerm || filters.location || filters.industry 
                  ? "We couldn't find any companies matching your criteria."
                  : "There are currently no companies listed. Check back later!"}
              </p>
              {(searchTerm || filters.location || filters.industry) && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={clearFilters}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Clear all filters'
                  )}
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Companies;
