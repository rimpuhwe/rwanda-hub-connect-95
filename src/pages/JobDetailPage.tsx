
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getJobById } from '@/data/mockJobs';
import { ArrowLeft, MapPin, Calendar, Briefcase, DollarSign, Share2, Bookmark, Mail, Phone, Clock } from 'lucide-react';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = getJobById(id || '');

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow flex flex-col items-center justify-center py-12">
          <h1 className="heading-2 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-6">The job listing you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/jobs')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const formatSalary = () => {
    const { min, max, currency, period } = job.salary;
    let periodText = '';
    
    switch (period) {
      case 'hour':
        periodText = '/hr';
        break;
      case 'month':
        periodText = '/month';
        break;
      case 'year':
        periodText = '/year';
        break;
    }
    
    return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}${periodText}`;
  };

  const calculateDaysLeft = () => {
    const deadline = new Date(job.deadline);
    const today = new Date();
    const diffTime = Math.abs(deadline.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container py-12">
          <Button 
            variant="outline" 
            size="sm" 
            className="mb-6"
            onClick={() => navigate('/jobs')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <img 
                      src={job.logo} 
                      alt={job.company}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h1 className="heading-2 mb-1">{job.title}</h1>
                      <p className="text-gray-700 text-lg">{job.company}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-gray-700">
                      <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                      <span>{job.location}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <Briefcase className="h-5 w-5 mr-2 text-gray-500" />
                      <span className="capitalize">{job.type}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <DollarSign className="h-5 w-5 mr-2 text-gray-500" />
                      <span>{formatSalary()}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                      <span>Posted on {job.postedDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mb-8">
                    <Badge>{job.category}</Badge>
                    <Badge variant="outline" className="capitalize">{job.type}</Badge>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-display text-xl font-semibold mb-3">Job Description</h2>
                      <p className="text-gray-700 whitespace-pre-line">
                        {job.description}
                      </p>
                    </div>
                    
                    <div>
                      <h2 className="font-display text-xl font-semibold mb-3">Requirements</h2>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {job.requirements.map((requirement, index) => (
                          <li key={index}>{requirement}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h2 className="font-display text-xl font-semibold mb-3">Responsibilities</h2>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {job.responsibilities.map((responsibility, index) => (
                          <li key={index}>{responsibility}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-semibold mb-4">Apply for this job</h3>
                    
                    <div className="mb-6">
                      <div className="flex items-center text-amber-600 mb-2">
                        <Clock className="h-5 w-5 mr-2" />
                        <span className="font-medium">Application Deadline</span>
                      </div>
                      <p className="text-gray-700">{job.deadline} ({calculateDaysLeft()} days left)</p>
                    </div>
                    
                    <Button className="w-full mb-3">Apply Now</Button>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Bookmark className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-semibold mb-4">Contact Information</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Email</p>
                          <a href={`mailto:${job.contact.email}`} className="text-rwandan-blue hover:underline">
                            {job.contact.email}
                          </a>
                        </div>
                      </div>
                      
                      {job.contact.phone && (
                        <div className="flex items-start">
                          <Phone className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                          <div>
                            <p className="font-medium">Phone</p>
                            <a href={`tel:${job.contact.phone}`} className="text-rwandan-blue hover:underline">
                              {job.contact.phone}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-semibold mb-4">About {job.company}</h3>
                    <p className="text-gray-700 mb-4">
                      {job.company} is a leading organization in the {job.category.toLowerCase()} industry in Rwanda, 
                      committed to excellence and innovation.
                    </p>
                    <Button variant="outline" className="w-full">
                      Company Profile
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobDetailPage;
