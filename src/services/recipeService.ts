
import { Recipe, UserPreferences, Ingredient, NutritionInfo } from "@/types/recipe";
import { usdToRon } from "@/utils/currencyUtils";

/**
 * Fetches recipes based on user preferences from Spoonacular API
 */
export const fetchRecipes = async (preferences: UserPreferences, apiKey: string): Promise<Recipe[]> => {
  if (!apiKey) {
    throw new Error("API key is required");
  }
  
  try {
    // Build query parameters based on user preferences
    const queryParams = new URLSearchParams();
    queryParams.append("apiKey", apiKey);
    queryParams.append("number", "12"); // Number of results
    
    // Add dietary restrictions
    if (preferences.dietaryRestrictions.length > 0) {
      queryParams.append("diet", preferences.dietaryRestrictions.join(","));
    }
    
    // Add excluded ingredients
    if (preferences.excludedIngredients.length > 0) {
      queryParams.append("excludeIngredients", preferences.excludedIngredients.join(","));
    }
    
    // Add max calories if specified
    if (preferences.calorieTarget) {
      queryParams.append("maxCalories", preferences.calorieTarget.toString());
    }
    
    // Add budget consideration - convert to price per day
    const maxPrice = preferences.budget * 3; // Assuming 3 meals per day
    queryParams.append("maxPrice", maxPrice.toString());
    
    // Add other potential parameters
    queryParams.append("addRecipeInformation", "true"); // Includes detailed info about recipes
    queryParams.append("fillIngredients", "true"); // Includes ingredient info
    queryParams.append("addRecipeNutrition", "true"); // Includes nutrition info

    console.log("Fetching recipes with params:", queryParams.toString());
    
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?${queryParams.toString()}`,
      { method: "GET" }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error response:", errorText);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("API response:", data);
    
    if (!data.results || data.results.length === 0) {
      console.log("No recipes found in API response");
      return [];
    }
    
    // Transform the API response to match our Recipe type
    return transformApiResponseToRecipes(data.results, preferences.location);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

/**
 * Transform Spoonacular API response to our Recipe format
 */
const transformApiResponseToRecipes = (
  apiResults: any[],
  location: string
): Recipe[] => {
  return apiResults.map((result) => {
    // Extract ingredient information with safety checks
    const ingredients: Ingredient[] = result.extendedIngredients?.map(
      (ingredient: any) => ({
        name: ingredient.name || "Unknown ingredient",
        amount: ingredient.amount?.toString() || "0",
        price: ingredient.estimatedCost?.value / 100 || 0.99, // Convert cents to dollars or use placeholder
        unit: ingredient.unit || "",
      })
    ) || [];

    // Calculate total price
    const totalPrice = ingredients.reduce(
      (sum: number, ingredient: Ingredient) => sum + ingredient.price,
      0
    );

    // Extract nutrition information safely
    const nutrition = result.nutrition?.nutrients || [];
    const nutritionInfo: NutritionInfo = {
      calories: findNutrient(nutrition, "Calories") || 0,
      protein: findNutrient(nutrition, "Protein") || 0,
      carbs: findNutrient(nutrition, "Carbohydrates") || 0,
      fat: findNutrient(nutrition, "Fat") || 0,
      fiber: findNutrient(nutrition, "Fiber") || 0,
      sugar: findNutrient(nutrition, "Sugar") || 0,
    };

    // Extract dietary tags safely
    const tags = [
      ...(result.vegetarian ? ["vegetarian"] : []),
      ...(result.vegan ? ["vegan"] : []),
      ...(result.glutenFree ? ["gluten-free"] : []),
      ...(result.dairyFree ? ["dairy-free"] : []),
      ...(result.veryHealthy ? ["healthy"] : []),
      ...(result.cheap ? ["budget-friendly"] : []),
    ];

    // Handle potentially missing instructions safely
    const instructionsSteps = result.analyzedInstructions?.[0]?.steps || [];
    const instructions = instructionsSteps.length > 0
      ? instructionsSteps.map((step: any) => step.step || "")
      : ["No instructions available."];

    return {
      id: result.id?.toString() || `temp-${Math.random().toString(36).substr(2, 9)}`,
      title: result.title || "Unnamed Recipe",
      description: (result.summary?.split(".")?.[0] + ".") || "No description available.",
      imageUrl: result.image || "placeholder.svg",
      ingredients,
      instructions,
      prepTime: result.preparationMinutes > 0 ? result.preparationMinutes : 15,
      cookTime: result.cookingMinutes > 0 ? result.cookingMinutes : 25,
      servings: result.servings || 4,
      nutritionInfo,
      totalPrice,
      pricePerServing: result.servings > 0 ? totalPrice / result.servings : totalPrice / 4,
      tags,
    };
  });
};

/**
 * Helper function to find a specific nutrient value from nutrition data
 */
const findNutrient = (nutrients: any[], name: string): number => {
  const nutrient = nutrients?.find((n: any) => n.name === name);
  return nutrient ? nutrient.amount : 0;
};

/**
 * Mock function to get pricing based on location
 * In a real app, this would connect to a grocery store API based on location
 */
export const adjustPricesByLocation = (
  recipe: Recipe,
  location: string
): Recipe => {
  // This is a placeholder for location-based price adjustment
  // In a real app, you would call a grocery store API to get local prices
  
  const locationFactors: {[key: string]: number} = {
    "New York": 1.2,
    "San Francisco": 1.3,
    "Chicago": 1.1,
    "Austin": 0.9,
    "Default": 1.0
  };

  const factor = locationFactors[location] || locationFactors.Default;
  
  const adjustedIngredients = recipe.ingredients.map((ingredient) => ({
    ...ingredient,
    price: ingredient.price * factor,
  }));
  
  const adjustedTotalPrice = adjustedIngredients.reduce(
    (sum, ingredient) => sum + ingredient.price,
    0
  );

  return {
    ...recipe,
    ingredients: adjustedIngredients,
    totalPrice: adjustedTotalPrice,
    pricePerServing: adjustedTotalPrice / recipe.servings,
  };
};
