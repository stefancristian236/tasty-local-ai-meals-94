
import { Recipe } from '@/types/recipe';

export const sampleRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Mediterranean Chickpea Bowl',
    description: 'A protein-packed bowl with chickpeas, fresh vegetables, and a tangy lemon dressing.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ingredients: [
      { name: 'Chickpeas', amount: '1', price: 0.89, unit: 'can' },
      { name: 'Cucumber', amount: '1', price: 0.79, unit: 'medium' },
      { name: 'Cherry Tomatoes', amount: '1', price: 1.99, unit: 'cup' },
      { name: 'Red Onion', amount: '1/4', price: 0.30, unit: '' },
      { name: 'Feta Cheese', amount: '1/4', price: 1.25, unit: 'cup' },
      { name: 'Olive Oil', amount: '2', price: 0.40, unit: 'tbsp' },
      { name: 'Lemon', amount: '1/2', price: 0.50, unit: '' },
      { name: 'Salt and Pepper', amount: '', price: 0.05, unit: 'to taste' },
    ],
    instructions: [
      'Drain and rinse the chickpeas.',
      'Chop the cucumber, tomatoes, and red onion.',
      'Mix all vegetables with chickpeas in a bowl.',
      'Crumble feta cheese over the top.',
      'Whisk together olive oil, lemon juice, salt, and pepper.',
      'Drizzle the dressing over the bowl and toss to combine.',
      'Serve immediately or refrigerate for up to 24 hours.'
    ],
    prepTime: 15,
    cookTime: 0,
    servings: 2,
    nutritionInfo: {
      calories: 380,
      protein: 15,
      carbs: 42,
      fat: 18,
      fiber: 12,
      sugar: 8
    },
    totalPrice: 6.17,
    pricePerServing: 3.09,
    tags: ['vegetarian', 'high-protein', 'no-cook', 'mediterranean']
  },
  {
    id: '2',
    title: 'Budget-Friendly Lentil Soup',
    description: 'A hearty and nutritious soup that costs less than $1.50 per serving.',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ingredients: [
      { name: 'Dried Lentils', amount: '1', price: 1.29, unit: 'cup' },
      { name: 'Onion', amount: '1', price: 0.50, unit: 'medium' },
      { name: 'Carrots', amount: '2', price: 0.40, unit: 'medium' },
      { name: 'Celery', amount: '2', price: 0.30, unit: 'stalks' },
      { name: 'Garlic', amount: '2', price: 0.20, unit: 'cloves' },
      { name: 'Vegetable Broth', amount: '4', price: 1.99, unit: 'cups' },
      { name: 'Diced Tomatoes', amount: '1', price: 0.99, unit: 'can' },
      { name: 'Bay Leaf', amount: '1', price: 0.05, unit: '' },
      { name: 'Olive Oil', amount: '1', price: 0.20, unit: 'tbsp' },
      { name: 'Salt and Pepper', amount: '', price: 0.05, unit: 'to taste' },
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat.',
      'Add chopped onion, carrots, and celery. Cook until softened, about 5 minutes.',
      'Add minced garlic and cook for 30 seconds until fragrant.',
      'Add lentils, diced tomatoes, vegetable broth, and bay leaf.',
      'Bring to a boil, then reduce heat and simmer for 25-30 minutes until lentils are tender.',
      'Season with salt and pepper to taste.',
      'Remove bay leaf before serving.'
    ],
    prepTime: 10,
    cookTime: 35,
    servings: 4,
    nutritionInfo: {
      calories: 250,
      protein: 12,
      carbs: 40,
      fat: 4,
      fiber: 15,
      sugar: 6
    },
    totalPrice: 5.97,
    pricePerServing: 1.49,
    tags: ['vegan', 'budget-friendly', 'high-fiber', 'one-pot']
  },
  {
    id: '3',
    title: 'Sheet Pan Chicken and Veggies',
    description: 'An easy weeknight dinner with lean protein and seasonal vegetables.',
    imageUrl: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ingredients: [
      { name: 'Chicken Breast', amount: '1', price: 3.99, unit: 'lb' },
      { name: 'Bell Peppers', amount: '2', price: 1.98, unit: 'medium' },
      { name: 'Broccoli', amount: '1', price: 1.50, unit: 'head' },
      { name: 'Red Onion', amount: '1', price: 0.79, unit: 'medium' },
      { name: 'Olive Oil', amount: '2', price: 0.40, unit: 'tbsp' },
      { name: 'Italian Seasoning', amount: '1', price: 0.15, unit: 'tsp' },
      { name: 'Garlic Powder', amount: '1/2', price: 0.10, unit: 'tsp' },
      { name: 'Salt and Pepper', amount: '', price: 0.05, unit: 'to taste' },
    ],
    instructions: [
      'Preheat oven to 425°F (220°C).',
      'Cut chicken into 1-inch pieces. Chop all vegetables into similar size pieces.',
      'In a large bowl, combine olive oil, Italian seasoning, garlic powder, salt, and pepper.',
      'Add chicken and vegetables to the bowl and toss until evenly coated.',
      'Spread everything in a single layer on a large baking sheet.',
      'Bake for 20-25 minutes, stirring halfway through, until chicken is cooked and vegetables are tender.',
      'Serve hot.'
    ],
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    nutritionInfo: {
      calories: 320,
      protein: 35,
      carbs: 15,
      fat: 14,
      fiber: 4,
      sugar: 5
    },
    totalPrice: 8.96,
    pricePerServing: 2.24,
    tags: ['high-protein', 'gluten-free', 'one-pan', 'meal-prep-friendly']
  }
];
