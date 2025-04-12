
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { X, MapPin, Flame, DollarSign, CheckCircle } from 'lucide-react';
import { UserPreferences } from '@/types/recipe';

interface UserPreferencesFormProps {
  onSubmit: (preferences: UserPreferences) => void;
}

const dietaryRestrictionOptions = [
  "Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", 
  "Keto", "Low-Carb", "Pescatarian", "Paleo"
];

const UserPreferencesForm = ({ onSubmit }: UserPreferencesFormProps) => {
  const [location, setLocation] = useState('');
  const [calorieTarget, setCalorieTarget] = useState(2000);
  const [budget, setBudget] = useState(10);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [excludedIngredient, setExcludedIngredient] = useState('');
  const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);

  const handleDietaryToggle = (value: string) => {
    setDietaryRestrictions(current => 
      current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value]
    );
  };

  const addExcludedIngredient = () => {
    if (excludedIngredient.trim() !== '' && !excludedIngredients.includes(excludedIngredient.trim())) {
      setExcludedIngredients([...excludedIngredients, excludedIngredient.trim()]);
      setExcludedIngredient('');
    }
  };

  const removeExcludedIngredient = (ingredient: string) => {
    setExcludedIngredients(excludedIngredients.filter(item => item !== ingredient));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      location,
      dietaryRestrictions,
      calorieTarget,
      budget,
      excludedIngredients
    });
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, we'd convert coordinates to location name via geocoding API
          setLocation("Current Location");
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recipe Preferences</CardTitle>
        <CardDescription>
          Customize your recipe recommendations based on your needs and local prices.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="location">Your Location</Label>
            <div className="flex gap-2">
              <Input
                id="location"
                placeholder="Enter your city or zip code"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleGetLocation}
                className="flex gap-1 items-center"
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:block">Use Current</span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="calorie-target">Calorie Target</Label>
              <span className="text-sm text-muted-foreground">{calorieTarget} kcal</span>
            </div>
            <div className="flex items-center gap-4">
              <Flame className="h-5 w-5 text-recipe-calories" />
              <Slider
                id="calorie-target"
                min={1200}
                max={3000}
                step={50}
                value={[calorieTarget]}
                onValueChange={(values) => setCalorieTarget(values[0])}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="budget">Budget per Meal</Label>
              <span className="text-sm text-muted-foreground">${budget.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-4">
              <DollarSign className="h-5 w-5 text-recipe-price" />
              <Slider
                id="budget"
                min={5}
                max={25}
                step={1}
                value={[budget]}
                onValueChange={(values) => setBudget(values[0])}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Dietary Restrictions</Label>
            <div className="flex flex-wrap gap-2">
              {dietaryRestrictionOptions.map((diet) => (
                <Badge 
                  key={diet} 
                  variant={dietaryRestrictions.includes(diet) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleDietaryToggle(diet)}
                >
                  {dietaryRestrictions.includes(diet) && (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  )}
                  {diet}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Excluded Ingredients</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter ingredient to exclude"
                value={excludedIngredient}
                onChange={(e) => setExcludedIngredient(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addExcludedIngredient();
                  }
                }}
              />
              <Button type="button" onClick={addExcludedIngredient}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {excludedIngredients.map((ingredient) => (
                <Badge key={ingredient} variant="secondary" className="flex items-center gap-1">
                  {ingredient}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeExcludedIngredient(ingredient)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">Generate Recipes</Button>
      </CardFooter>
    </Card>
  );
};

export default UserPreferencesForm;
