
export interface Ingredient {
  name: string;
  amount: string;
  price: number;
  unit: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  nutritionInfo: NutritionInfo;
  totalPrice: number;
  pricePerServing: number;
  tags: string[];
}

export interface UserPreferences {
  location: string;
  dietaryRestrictions: string[];
  calorieTarget: number;
  budget: number;
  excludedIngredients: string[];
}
