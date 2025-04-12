
import { Clock, DollarSign, Flame, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Recipe } from '@/types/recipe';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
  const { title, description, imageUrl, prepTime, cookTime, nutritionInfo, pricePerServing, servings, tags } = recipe;
  
  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-md cursor-pointer" 
      onClick={() => onClick(recipe)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-xl line-clamp-2">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{prepTime + cookTime} mins</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Serves {servings}</span>
          </div>
          <div className="flex items-center gap-1 text-recipe-calories">
            <Flame className="h-4 w-4" />
            <span>{nutritionInfo.calories} kcal</span>
          </div>
          <div className="flex items-center gap-1 text-recipe-price">
            <DollarSign className="h-4 w-4" />
            <span>${pricePerServing.toFixed(2)}/serving</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          Click to view full recipe
        </div>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
