import { useState, useEffect } from 'react';
import { Loader2, Utensils, AlertCircle, BookmarkPlus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import UserPreferencesForm from './UserPreferencesForm';
import RecipeCard from './RecipeCard';
import RecipeDetail from './RecipeDetail';
import ApiKeyConfig from './ApiKeyConfig';
import { Recipe, UserPreferences } from '@/types/recipe';
import { fetchRecipes } from '@/services/recipeService';
import { useApiKey } from '@/context/ApiKeyContext';
import { sampleRecipes } from '@/data/sampleRecipes';
import { usdToRon, formatRon } from '@/utils/currencyUtils';

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
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('savedRecipes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  const handleSubmitPreferences = async (formData: UserPreferences) => {
    setPreferences(formData);
    setIsGenerating(true);
    setShowForm(false);
    setError(null);

    try {
      let fetchedRecipes: Recipe[];
      
      if (isKeySet) {
        fetchedRecipes = await fetchRecipes(formData, apiKey);
        setRecipes(fetchedRecipes);
        
        toast({
          title: "Rețete generate!",
          description: `S-au găsit ${fetchedRecipes.length} rețete care se potrivesc preferințelor tale.`,
        });
      } else {
        console.log("No API key set, using sample data");
        setError("Nicio cheie API configurată. Se folosesc date exemplu în loc.");
        setRecipes(sampleRecipes);
        
        toast({
          variant: "default",
          title: "Se folosesc rețete exemplu",
          description: "Nicio cheie API nu a fost configurată de admin. Se folosesc date exemplu în loc.",
        });
      }
    } catch (err) {
      console.error("Failed to fetch recipes:", err);
      setError("Nu s-au putut prelua rețetele. Se folosesc date exemplu în loc.");
      
      setRecipes(sampleRecipes);
      
      toast({
        variant: "destructive",
        title: "Eroare API",
        description: "Nu s-au putut prelua rețetele. Se folosesc date exemplu în loc.",
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

  const isRecipeSaved = (recipe: Recipe) => {
    return savedRecipes.some(saved => saved.id === recipe.id);
  };

  const handleSaveRecipe = (recipe: Recipe) => {
    if (isRecipeSaved(recipe)) {
      setSavedRecipes(savedRecipes.filter(saved => saved.id !== recipe.id));
      toast({
        title: "Rețetă eliminată",
        description: "Rețeta a fost eliminată din colecția ta."
      });
    } else {
      setSavedRecipes([...savedRecipes, recipe]);
      toast({
        title: "Rețetă salvată",
        description: "Rețeta a fost adăugată în colecția ta."
      });
    }
  };

  return (
    <div className="container py-6 max-w-6xl">
      {showForm ? (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
              Smart recipe generator
            </h1>
            <p className="text-muted-foreground text-lg">
              Get personalized recipes, at an affordable price, based on your location, nutritional needs, and local prices.
            </p>
          </div>
          
          <ApiKeyConfig />
          
          <UserPreferencesForm onSubmit={handleSubmitPreferences} />
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl font-display font-semibold">Personalised recipies</h2>
              {preferences && (
                <p className="text-muted-foreground">
                  {preferences.location && `Pentru ${preferences.location} • `}
                  {preferences.calorieTarget} kcal • {formatRon(preferences.budget)} budget
                </p>
              )}
              {error && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {error}
                </p>
              )}
            </div>
            <Button variant="outline" onClick={handleReset}>Change preferences</Button>
          </div>

          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-recipe-primary mb-4" />
              <h3 className="text-xl font-medium">Cooking...</h3>
              <p className="text-muted-foreground mt-2">
                Searching for recipes that match preferences and local prices.
              </p>
            </div>
          ) : recipes.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => (
                <div key={recipe.id} className="relative">
                  <RecipeCard 
                    recipe={recipe} 
                    onClick={handleRecipeClick} 
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveRecipe(recipe);
                    }}
                  >
                    {isRecipeSaved(recipe) ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <BookmarkPlus className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <Utensils className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium">No recipies found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your preferences to find more recipes.
              </p>
              <Button variant="default" className="mt-4" onClick={handleReset}>
                Try again
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
