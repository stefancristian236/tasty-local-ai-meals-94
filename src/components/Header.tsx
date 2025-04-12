
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChefHat, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <ChefHat className="h-6 w-6 text-recipe-primary" />
          <Link to="/" className="text-xl font-display font-semibold">NutriSaver</Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="font-medium transition-colors hover:text-recipe-primary">Home</Link>
          <Link to="/admin" className="font-medium transition-colors hover:text-recipe-primary flex items-center gap-1">
            <Lock className="h-3 w-3" />
            Admin
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="default" className="hidden md:flex">
            <Link to="/">Generate Recipe</Link>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col py-4 gap-2">
            <Link to="/" className="py-2 font-medium transition-colors hover:text-recipe-primary">Home</Link>
            <Link to="/admin" className="py-2 font-medium transition-colors hover:text-recipe-primary flex items-center gap-1">
              <Lock className="h-3 w-3" />
              Admin
            </Link>
            <Button variant="default" className="mt-2">
              <Link to="/">Generate Recipe</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
