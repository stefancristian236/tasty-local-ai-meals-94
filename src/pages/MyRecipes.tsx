
import { useState } from 'react';
import Header from '@/components/Header';
import { ApiKeyProvider } from '@/context/ApiKeyContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { Recipe } from '@/types/recipe';
import RecipeCard from '@/components/RecipeCard';
import RecipeDetail from '@/components/RecipeDetail';

const MyRecipes = () => {
  const { toast } = useToast();
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('savedRecipes');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showRecipeDetail, setShowRecipeDetail] = useState(false);

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipeDetail(true);
  };

  const handleCloseRecipeDetail = () => {
    setShowRecipeDetail(false);
  };

  const handleDeleteRecipe = (id: string) => {
    const updatedRecipes = savedRecipes.filter(recipe => recipe.id !== id);
    setSavedRecipes(updatedRecipes);
    localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
    
    toast({
      title: "Rețetă ștearsă",
      description: "Rețeta a fost ștearsă din colecția ta.",
    });
  };

  return (
    <ApiKeyProvider>
      <div className="min-h-screen flex flex-col bg-recipe-background">
        <Header />
        <main className="flex-1 container py-12 max-w-6xl">
          <div className="flex items-center gap-2 mb-6">
            <Book className="h-6 w-6 text-recipe-primary" />
            <h1 className="text-3xl font-display font-bold">Rețetele mele</h1>
          </div>
          
          {savedRecipes.length > 0 ? (
            <div className="space-y-8">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {savedRecipes.map((recipe) => (
                  <div key={recipe.id} className="relative">
                    <RecipeCard 
                      recipe={recipe} 
                      onClick={handleRecipeClick} 
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRecipe(recipe.id);
                      }}
                    >
                      Șterge
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-recipe-primary" />
                  <CardTitle>Nicio rețetă salvată</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Nu ai nicio rețetă salvată încă. Generează rețete și salvează-le pentru a le vedea aici.
                </p>
                <Button variant="default">
                  <Link to="/">Generează rețete</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </main>
        
        <RecipeDetail 
          recipe={selectedRecipe} 
          isOpen={showRecipeDetail} 
          onClose={handleCloseRecipeDetail} 
        />
        
        <footer className="border-t py-6">
          <div className="container text-center text-sm text-muted-foreground">
            <p>© 2025 NutriSaver. Toate drepturile rezervate.</p>
          </div>
        </footer>
      </div>
    </ApiKeyProvider>
  );
};

export default MyRecipes;
