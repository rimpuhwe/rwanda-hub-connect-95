
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, Clock, Share2, Bookmark } from 'lucide-react';
import { getBlogById, getBlogs } from '@/data/mockBlogs';

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = getBlogById(id || '');
  const relatedBlogs = getBlogs()
    .filter(b => b.id !== id && b.category === blog?.category)
    .slice(0, 3);

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow flex flex-col items-center justify-center py-12">
          <h1 className="heading-2 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/blog')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 z-10" />
          <img 
            src={blog.image} 
            alt={blog.title}
            className="w-full h-[50vh] object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 container">
            <div className="max-w-4xl">
              <Badge className="mb-4">{blog.category}</Badge>
              <h1 className="heading-1 text-white mb-4">{blog.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-white">
                <div className="flex items-center">
                  <img 
                    src={blog.author.avatar} 
                    alt={blog.author.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span>{blog.author.name}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{blog.readTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {/* Navigation */}
              <div className="mb-6">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/blog')}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Articles
                </Button>
              </div>
              
              {/* Article content */}
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              </div>
              
              {/* Tags */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="font-medium mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Share */}
              <div className="mt-8 flex gap-4">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              {/* Author card */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={blog.author.avatar} 
                      alt={blog.author.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-medium">{blog.author.name}</h3>
                      <p className="text-sm text-gray-500">Travel Writer</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-4">
                    Passionate about exploring Rwanda's diverse landscapes and sharing authentic travel experiences with global audiences.
                  </p>
                  <Button variant="outline" className="w-full">View All Articles</Button>
                </CardContent>
              </Card>
              
              {/* Related articles */}
              <div>
                <h3 className="font-display text-xl font-semibold mb-4">Related Articles</h3>
                <div className="space-y-6">
                  {relatedBlogs.length > 0 ? (
                    relatedBlogs.map((relatedBlog) => (
                      <Link to={`/blog/${relatedBlog.id}`} key={relatedBlog.id}>
                        <div className="flex gap-4 group">
                          <img 
                            src={relatedBlog.image} 
                            alt={relatedBlog.title}
                            className="w-24 h-20 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-medium group-hover:text-rwandan-blue transition-colors line-clamp-2">
                              {relatedBlog.title}
                            </h4>
                            <div className="flex items-center text-gray-500 text-xs mt-1">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{relatedBlog.date}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-500">No related articles found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
