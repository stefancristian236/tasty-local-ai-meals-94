import { useState } from 'react';
import { Loader2, Utensils, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import UserPreferencesForm from './UserPreferencesForm';
import RecipeCard from './RecipeCard';
import RecipeDetail from './RecipeDetail';
import ApiKeyConfig from './ApiKeyConfig';
import { Recipe, UserPreferences } from '@/types/recipe';
import { fetchRecipes } from '@/services/recipeService';
import { useApiKey } from '@/context/ApiKeyContext';
import { sampleRecipes } from '@/data/sampleRecipes'; // Keeping as fallback

const RecipeGenerator = () => {
  const { toast } = useToast();
  const { apiKey, isKeySet } = useApiKey();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showRecipeDetail, setShowRecipeDetail] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitPreferences = async (formData: UserPreferences) => {
    setPreferences(formData);
    setIsGenerating(true);
    setShowForm(false);
    setError(null);

    try {
      let fetchedRecipes: Recipe[];
      
      if (isKeySet) {
        // Try to fetch recipes from API if key is set
        fetchedRecipes = await fetchRecipes(formData, apiKey);
        setRecipes(fetchedRecipes);
        
        toast({
          title: "Recipes generated!",
          description: `Found ${fetchedRecipes.length} recipes that match your preferences.`,
        });
      } else {
        // Use sample data if no API key
        console.log("No API key set, using sample data");
        setError("No API key configured. Using sample data instead.");
        setRecipes(sampleRecipes);
        
        toast({
          variant: "default",
          title: "Using sample recipes",
          description: "No API key has been configured by admin. Using sample data instead.",
        });
      }
    } catch (err) {
      console.error("Failed to fetch recipes:", err);
      setError("Failed to fetch recipes. Using sample data instead.");
      
      // Fallback to sample recipes if API fails
      setRecipes(sampleRecipes);
      
      toast({
        variant: "destructive",
        title: "API Error",
        description: "Could not fetch recipes. Using sample data instead.",
      });
    } finally {
      setIsGenerating(false);
    }
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
    setError(null);
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
          
          <ApiKeyConfig />
          
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
              {error && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {error}
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
