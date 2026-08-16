import React, { useState } from 'react';
import { Share2, Check, Link2, MessageCircle, Mail, Twitter, Facebook, Linkedin } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon' | 'compact' | 'floating';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  text,
  url,
  variant = 'outline',
  showLabel = true,
  label = 'Share Article',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareText = text || title;

  const handleShare = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    // Check if Web Share API is supported (mobile apps, modern browsers)
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err: any) {
        // Ignore user cancellation
        if (err?.name === 'AbortError') return;
      }
    }

    // Fallback menu for desktop or unsupported environments
    setShowDropdown((prev) => !prev);
  };

  const copyToClipboard = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setShowDropdown(false);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handlePlatformShare = (platform: 'whatsapp' | 'email' | 'twitter' | 'facebook' | 'linkedin', e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(false);

    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);
    const encodedText = encodeURIComponent(shareText);

    let targetUrl = '';
    switch (platform) {
      case 'whatsapp':
        targetUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
        break;
      case 'email':
        targetUrl = `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`;
        break;
      case 'twitter':
        targetUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'facebook':
        targetUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'linkedin':
        targetUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
    }

    if (platform === 'email') {
      window.location.href = targetUrl;
    } else {
      window.open(targetUrl, '_blank', 'width=600,height=450,noopener,noreferrer');
    }
  };

  // Button styles based on variant
  let btnClasses = '';
  switch (variant) {
    case 'primary':
      btnClasses = 'bg-primary text-white hover:bg-primary-dark shadow-sm active:scale-95';
      break;
    case 'secondary':
      btnClasses = 'bg-bg-secondary text-text-primary hover:bg-primary/10 hover:text-primary border border-border shadow-xs';
      break;
    case 'outline':
      btnClasses = 'bg-white dark:bg-gray-900 border border-border text-text-primary hover:border-primary hover:text-primary shadow-xs';
      break;
    case 'ghost':
      btnClasses = 'bg-transparent text-text-secondary hover:text-primary hover:bg-primary/5';
      break;
    case 'icon':
      btnClasses = 'p-2.5 rounded-xl bg-bg-secondary text-text-secondary hover:text-primary hover:bg-primary/10 border border-border';
      break;
    case 'compact':
      btnClasses = 'px-3 py-1.5 text-xs font-bold rounded-lg bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20';
      break;
    case 'floating':
      btnClasses = 'p-3.5 rounded-full bg-primary text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95';
      break;
  }

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={handleShare}
        className={`inline-flex items-center justify-center gap-2 font-bold transition-all cursor-pointer rounded-xl ${variant !== 'icon' && variant !== 'floating' && variant !== 'compact' ? 'px-4 py-2.5 text-xs' : ''} ${btnClasses} ${className}`}
        title="Share article via mobile apps, email, or social media"
        aria-label="Share article"
      >
        <Share2 className="w-4 h-4 shrink-0" />
        {showLabel && variant !== 'icon' && variant !== 'floating' && <span>{label}</span>}
      </button>

      {/* Copy notification toast/indicator */}
      {copied && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-[11px] font-bold rounded-lg shadow-md whitespace-nowrap flex items-center gap-1.5 z-50 animate-fade-in">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>Link copied to clipboard!</span>
        </div>
      )}

      {/* Dropdown menu fallback when navigator.share is absent or user opens dropdown */}
      {showDropdown && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />
          <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-gray-900 border border-border shadow-xl p-2 z-50 space-y-1 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-2 border-b border-border text-[10px] font-black uppercase tracking-wider text-text-tertiary">
              Share Article
            </div>

            <button
              onClick={copyToClipboard}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-text-primary hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer border-none text-left"
            >
              <Link2 className="w-4 h-4 text-primary" />
              <span>Copy Direct Link</span>
            </button>

            <button
              onClick={(e) => handlePlatformShare('whatsapp', e)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-text-primary hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors cursor-pointer border-none text-left"
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={(e) => handlePlatformShare('email', e)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-text-primary hover:bg-blue-500/10 hover:text-blue-600 transition-colors cursor-pointer border-none text-left"
            >
              <Mail className="w-4 h-4 text-blue-500" />
              <span>Email Link</span>
            </button>

            <button
              onClick={(e) => handlePlatformShare('twitter', e)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-text-primary hover:bg-sky-500/10 hover:text-sky-600 transition-colors cursor-pointer border-none text-left"
            >
              <Twitter className="w-4 h-4 text-sky-500" />
              <span>X (Twitter)</span>
            </button>

            <button
              onClick={(e) => handlePlatformShare('facebook', e)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-text-primary hover:bg-indigo-500/10 hover:text-indigo-600 transition-colors cursor-pointer border-none text-left"
            >
              <Facebook className="w-4 h-4 text-indigo-500" />
              <span>Facebook</span>
            </button>

            <button
              onClick={(e) => handlePlatformShare('linkedin', e)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-text-primary hover:bg-cyan-500/10 hover:text-cyan-600 transition-colors cursor-pointer border-none text-left"
            >
              <Linkedin className="w-4 h-4 text-cyan-600" />
              <span>LinkedIn</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareButton;
