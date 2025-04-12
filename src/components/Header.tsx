
import { useState } from 'react';
import { Menu, X, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <ChefHat className="h-6 w-6 text-recipe-primary" />
          <span className="text-xl font-display font-semibold">NutriSaver</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#" className="font-medium transition-colors hover:text-recipe-primary">Home</a>
          <a href="#" className="font-medium transition-colors hover:text-recipe-primary">My Recipes</a>
          <a href="#" className="font-medium transition-colors hover:text-recipe-primary">Shopping List</a>
          <a href="#" className="font-medium transition-colors hover:text-recipe-primary">About</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="default" className="hidden md:flex">Generate Recipe</Button>
          
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
            <a href="#" className="py-2 font-medium transition-colors hover:text-recipe-primary">Home</a>
            <a href="#" className="py-2 font-medium transition-colors hover:text-recipe-primary">My Recipes</a>
            <a href="#" className="py-2 font-medium transition-colors hover:text-recipe-primary">Shopping List</a>
            <a href="#" className="py-2 font-medium transition-colors hover:text-recipe-primary">About</a>
            <Button variant="default" className="mt-2">Generate Recipe</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
