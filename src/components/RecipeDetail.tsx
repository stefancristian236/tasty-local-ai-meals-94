
import { Clock, DollarSign, ChefHat, Flame, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Recipe } from '@/types/recipe';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface RecipeDetailProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}

const RecipeDetail = ({ recipe, isOpen, onClose }: RecipeDetailProps) => {
  if (!recipe) return null;

  const { 
    title, 
    description, 
    imageUrl, 
    ingredients, 
    instructions, 
    prepTime, 
    cookTime, 
    nutritionInfo, 
    totalPrice, 
    pricePerServing, 
    servings, 
    tags 
  } = recipe;

  const totalTime = prepTime + cookTime;

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-0" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex flex-wrap gap-1 mb-2">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <DialogTitle className="text-2xl sm:text-3xl">{title}</DialogTitle>
          <DialogDescription className="text-base">{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="aspect-video w-full overflow-hidden rounded-md">
            <img 
              src={imageUrl} 
              alt={title} 
              className="object-cover w-full h-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="flex flex-col items-center p-3 bg-muted rounded-md">
              <Clock className="h-5 w-5 mb-1" />
              <span className="text-sm font-medium">{totalTime} mins</span>
              <span className="text-xs text-muted-foreground">Total Time</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-muted rounded-md">
              <Users className="h-5 w-5 mb-1" />
              <span className="text-sm font-medium">{servings}</span>
              <span className="text-xs text-muted-foreground">Servings</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-muted rounded-md">
              <Flame className="h-5 w-5 mb-1 text-recipe-calories" />
              <span className="text-sm font-medium">{nutritionInfo.calories}</span>
              <span className="text-xs text-muted-foreground">Calories/Serving</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-muted rounded-md">
              <DollarSign className="h-5 w-5 mb-1 text-recipe-price" />
              <span className="text-sm font-medium">${pricePerServing.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground">Cost/Serving</span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <ChefHat className="h-5 w-5" /> Ingredients
              </h3>
              <ul className="ingredients-list space-y-1">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="flex justify-between">
                    <span>
                      {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </span>
                    <span className="text-recipe-price">${ingredient.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-t flex justify-between font-medium">
                <span>Total Cost:</span>
                <span className="text-recipe-price">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold mb-3">Instructions</h3>
                <ol className="space-y-3">
                  {instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-muted text-xs">
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Nutrition Information</h3>
                <div className="nutrition-label">
                  <div className="nutrition-row font-medium">
                    <span>Nutrition Facts (per serving)</span>
                  </div>
                  <div className="nutrition-row">
                    <span>Calories</span>
                    <span>{nutritionInfo.calories}</span>
                  </div>
                  <div className="nutrition-row">
                    <span>Protein</span>
                    <span>{nutritionInfo.protein}g</span>
                  </div>
                  <div className="nutrition-row">
                    <span>Carbs</span>
                    <span>{nutritionInfo.carbs}g</span>
                  </div>
                  <div className="nutrition-row">
                    <span>Fat</span>
                    <span>{nutritionInfo.fat}g</span>
                  </div>
                  <div className="nutrition-row">
                    <span>Fiber</span>
                    <span>{nutritionInfo.fiber}g</span>
                  </div>
                  <div className="nutrition-row">
                    <span>Sugar</span>
                    <span>{nutritionInfo.sugar}g</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetail;
