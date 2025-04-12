
import { useState } from 'react';
import { Loader2, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import UserPreferencesForm from './UserPreferencesForm';
import RecipeCard from './RecipeCard';
import RecipeDetail from './RecipeDetail';
import { Recipe, UserPreferences } from '@/types/recipe';
import { sampleRecipes } from '@/data/sampleRecipes';

const RecipeGenerator = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showRecipeDetail, setShowRecipeDetail] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);

  const handleSubmitPreferences = (formData: UserPreferences) => {
    setPreferences(formData);
    setIsGenerating(true);
    setShowForm(false);

    // In a real app, this would make an API call to generate recipes
    // For now, we'll simulate an API call with a timeout
    setTimeout(() => {
      setRecipes(sampleRecipes);
      setIsGenerating(false);
      
      toast({
        title: "Recipes generated!",
        description: `Found ${sampleRecipes.length} recipes that match your preferences.`,
      });
    }, 2000);
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipeDetail(true);
  };

  const handleCloseRecipeDetail = () => {
    setShowRecipeDetail(false);
  };

  const handleReset = () => {
    setShowForm(true);
    setRecipes([]);
    setPreferences(null);
  };

  return (
    <div className="container py-6 max-w-6xl">
      {showForm ? (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
              Smart Recipe Generator
            </h1>
            <p className="text-muted-foreground text-lg">
              Get personalized, budget-friendly recipes based on your location, nutritional needs, and local prices.
            </p>
          </div>
          <UserPreferencesForm onSubmit={handleSubmitPreferences} />
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl font-display font-semibold">Your Custom Recipes</h2>
              {preferences && (
                <p className="text-muted-foreground">
                  {preferences.location && `For ${preferences.location} • `}
                  {preferences.calorieTarget} kcal • ${preferences.budget.toFixed(2)} budget
                </p>
              )}
            </div>
            <Button variant="outline" onClick={handleReset}>Change Preferences</Button>
          </div>

          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-recipe-primary mb-4" />
              <h3 className="text-xl font-medium">Generating your recipes...</h3>
              <p className="text-muted-foreground mt-2">
                Finding recipes that match your preferences and local prices
              </p>
            </div>
          ) : recipes.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onClick={handleRecipeClick} 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <Utensils className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium">No recipes found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your preferences to find more recipes
              </p>
              <Button variant="default" className="mt-4" onClick={handleReset}>
                Start Over
              </Button>
            </div>
          )}
        </div>
      )}

      <RecipeDetail 
        recipe={selectedRecipe} 
        isOpen={showRecipeDetail} 
        onClose={handleCloseRecipeDetail} 
      />
    </div>
  );
};

export default RecipeGenerator;
