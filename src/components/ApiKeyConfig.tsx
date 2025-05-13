
import { useState } from 'react';
import { useApiKey } from '@/context/ApiKeyContext';
import { Key, CheckCircle, Info, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ApiKeyConfigProps {
  adminView?: boolean;
}

const ApiKeyConfig = ({ adminView = false }: ApiKeyConfigProps) => {
  const { apiKey, setApiKey, isKeySet } = useApiKey();
  const [inputKey, setInputKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSaveKey = () => {
    if (inputKey.trim()) {
      setApiKey(inputKey.trim());
      setDialogOpen(false);
    }
  };

  const toggleKeyVisibility = () => {
    setShowKey(!showKey);
  };

  return (
    <div className="mb-6">
     
      
      {adminView && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-3 flex gap-2">
              <Key className="h-4 w-4" />
              {isKeySet ? "Update API Key" : "Configure API Key"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Spoonacular API Key</DialogTitle>
              <DialogDescription>
                Enter your Spoonacular API key below. You can get one by signing up at{" "}
                <a 
                  href="https://spoonacular.com/food-api" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-recipe-primary underline"
                >
                  spoonacular.com/food-api
                </a>
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Your API Key</p>
                <div className="relative">
                  <Input 
                    type={showKey ? "text" : "password"} 
                    value={inputKey} 
                    onChange={(e) => setInputKey(e.target.value)}
                    placeholder="Enter your Spoonacular API key"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-0 top-0 h-full" 
                    onClick={toggleKeyVisibility}
                  >
                    {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground">
                Your API key is stored locally in your browser and is never sent to our servers.
              </p>
            </div>
            
            <DialogFooter>
              <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveKey} disabled={!inputKey.trim()}>
                Save Key
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {isKeySet && !adminView 
      
      }
    </div>
  );
};

export default ApiKeyConfig;
