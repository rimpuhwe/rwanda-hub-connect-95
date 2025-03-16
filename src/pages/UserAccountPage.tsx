
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  User, Briefcase, FileText, CreditCard, Award, Link2, LogOut,
  Hotel, MessageSquare, Heart, Calendar, Share2, Settings
} from 'lucide-react';

const UserAccountPage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    } else {
      // Redirect to login
      toast.error('Please login to access your account');
      navigate('/login');
    }
    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast.success('Logged out successfully');
    navigate('/');
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow flex flex-col items-center justify-center py-12">
          <h1 className="heading-2 mb-4">Not Logged In</h1>
          <p className="text-gray-600 mb-6">Please login to access your account</p>
          <Button onClick={() => navigate('/login')}>
            Sign In
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const copyReferralLink = () => {
    navigator.clipboard.writeText(currentUser.referralLink)
      .then(() => {
        toast.success('Referral link copied to clipboard');
      })
      .catch(() => {
        toast.error('Failed to copy referral link');
      });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* User profile sidebar */}
            <div className="md:w-64">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <User className="h-12 w-12 text-gray-500" />
                    </div>
                    <h2 className="font-display text-xl font-semibold">{currentUser.fullName}</h2>
                    <p className="text-gray-600 text-sm">{currentUser.email}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Marks Earned</span>
                      <span className="font-semibold flex items-center">
                        <Award className="h-4 w-4 mr-1 text-amber-500" />
                        {currentUser.marks || 0}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Referral Token</span>
                      <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">
                        {currentUser.referralToken}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mb-2"
                      onClick={copyReferralLink}
                    >
                      <Link2 className="mr-2 h-4 w-4" />
                      Copy Referral Link
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-red-600 hover:text-red-600 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              <Tabs defaultValue="applications">
                <TabsList className="mb-6 grid grid-cols-2 md:grid-cols-4 lg:flex">
                  <TabsTrigger value="applications">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Applications
                  </TabsTrigger>
                  <TabsTrigger value="bookings">
                    <Hotel className="h-4 w-4 mr-2" />
                    Bookings
                  </TabsTrigger>
                  <TabsTrigger value="reviews">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Reviews
                  </TabsTrigger>
                  <TabsTrigger value="favorites">
                    <Heart className="h-4 w-4 mr-2" />
                    Favorites
                  </TabsTrigger>
                  <TabsTrigger value="payments">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Payments
                  </TabsTrigger>
                  <TabsTrigger value="documents">
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
                  </TabsTrigger>
                </TabsList>
                
                {/* Applications Tab */}
                <TabsContent value="applications">
                  <h3 className="heading-3 mb-4">Your Job Applications</h3>
                  
                  {currentUser.applications && currentUser.applications.length > 0 ? (
                    <div className="space-y-4">
                      {currentUser.applications.map((application: any) => (
                        <Card key={application.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{application.jobTitle}</h4>
                                <p className="text-gray-600 text-sm">{application.company}</p>
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>Applied on {new Date(application.appliedAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                application.status === 'pending' 
                                  ? 'bg-amber-100 text-amber-800' 
                                  : application.status === 'approved'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h4 className="text-lg font-medium mb-2">No applications yet</h4>
                      <p className="text-gray-600 mb-4">You haven't applied for any jobs yet</p>
                      <Button asChild>
                        <Link to="/jobs">Browse Jobs</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                {/* Bookings Tab */}
                <TabsContent value="bookings">
                  <h3 className="heading-3 mb-4">Your Bookings</h3>
                  
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Hotel className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h4 className="text-lg font-medium mb-2">No bookings yet</h4>
                    <p className="text-gray-600 mb-4">You haven't made any accommodation bookings yet</p>
                    <Button asChild>
                      <Link to="/services">Browse Hotels & Airbnbs</Link>
                    </Button>
                  </div>
                </TabsContent>
                
                {/* Reviews Tab */}
                <TabsContent value="reviews">
                  <h3 className="heading-3 mb-4">Your Reviews</h3>
                  
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h4 className="text-lg font-medium mb-2">No reviews yet</h4>
                    <p className="text-gray-600 mb-4">You haven't left any reviews yet</p>
                  </div>
                </TabsContent>
                
                {/* Favorites Tab */}
                <TabsContent value="favorites">
                  <h3 className="heading-3 mb-4">Your Favorites</h3>
                  
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h4 className="text-lg font-medium mb-2">No favorites yet</h4>
                    <p className="text-gray-600 mb-4">You haven't saved any favorites yet</p>
                  </div>
                </TabsContent>
                
                {/* Payments Tab */}
                <TabsContent value="payments">
                  <h3 className="heading-3 mb-4">Your Payments</h3>
                  
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h4 className="text-lg font-medium mb-2">No payments yet</h4>
                    <p className="text-gray-600 mb-4">You haven't made any payments yet</p>
                  </div>
                </TabsContent>
                
                {/* Documents Tab */}
                <TabsContent value="documents">
                  <h3 className="heading-3 mb-4">Your Documents</h3>
                  
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h4 className="text-lg font-medium mb-2">No documents yet</h4>
                    <p className="text-gray-600 mb-4">You haven't uploaded any documents yet</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserAccountPage;
