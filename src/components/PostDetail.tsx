import React from 'react';
import { BlogPost } from '../types';
import { ArrowLeft, Calendar, User, Tag, Share2, Link2, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import SEO from './SEO';

interface PostDetailProps {
  post: BlogPost;
  onBack: () => void;
  onTagClick?: (tag: string) => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onBack, onTagClick }) => {
  const [copied, setCopied] = React.useState(false);

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${window.location.pathname}?post=${post.id}`
    : '';
  const shareTitle = post.title;

  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin' | 'copy') => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return;
    }

    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={post.title}
        description={post.excerpt}
        image={post.image}
        type="article"
      />
      
      {/* Article Header */}
      <header className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 lg:p-16">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </button>
            <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary-light" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-light" />
                {post.date}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            <div className="markdown-body prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 font-medium italic mb-8 border-l-4 border-primary pl-6">
                {post.excerpt}
              </p>
              
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3 flex-wrap">
                <Tag className="w-4 h-4 text-gray-400" />
                {post.tags.map(tag => (
                  <span 
                    key={tag} 
                    onClick={() => onTagClick?.(tag)}
                    className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-28 space-y-8">
              <div className="p-6 bg-soft-beige rounded-2xl border border-gray-100">
                <h4 className="font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-primary" />
                  Share Article
                </h4>
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleShare('facebook')}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-all shadow-sm group"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                  </button>
                  <button 
                    onClick={() => handleShare('twitter')}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-all shadow-sm group"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  </button>
                  <button 
                    onClick={() => handleShare('linkedin')}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-all shadow-sm group"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </button>
                  <button 
                    onClick={() => handleShare('copy')}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-all shadow-sm group relative"
                  >
                    <span className="sr-only">Copy Link</span>
                    {copied ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Link2 className="w-5 h-5 transition-transform group-hover:scale-110" />
                    )}
                    {copied && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-[10px] rounded whitespace-nowrap">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>

              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <h4 className="font-display font-bold text-gray-900 mb-2">Need a Consultation?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Connect with our certified homeopathic practitioners for personalized care.
                </p>
                <button className="w-full py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-all">
                  Book Appointment
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default PostDetail;
