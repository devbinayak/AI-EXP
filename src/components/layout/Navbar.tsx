
import Link from 'next/link';
import { Heart } from 'lucide-react';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-background text-foreground shadow-md w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-start">
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
        {/* Additional nav items can be added here later */}
      </div>
    </nav>
  );
};

export default Navbar;
