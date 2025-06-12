
import Link from 'next/link';
import { Heart, Twitter, Instagram, Facebook, LayoutGrid, Info } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="bg-background text-foreground shadow-md w-full sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-80">
          <Heart
            className="h-8 w-8 text-primary transition-colors"
            fill="currentColor"
            strokeWidth={1.5}
          />
          <span className="text-2xl font-semibold text-foreground transition-colors">
            Teenger
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/#features" className="text-sm font-medium hover:text-primary transition-colors">
              <LayoutGrid className="mr-2 h-4 w-4" /> Features
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/#about" className="text-sm font-medium hover:text-primary transition-colors">
              <Info className="mr-2 h-4 w-4" /> About Us
            </Link>
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
            <Instagram className="h-5 w-5" />
          </Link>
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
            <Facebook className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
