
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

const ApiKeyConfig = () => {
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
      <Alert className="bg-amber-50 border-amber-200">
        <Info className="h-4 w-4 text-amber-500" />
        <AlertTitle className="text-amber-700">API Key Required</AlertTitle>
        <AlertDescription className="text-amber-600">
          This app uses the Spoonacular API to provide real recipe data. You'll need to 
          {isKeySet ? " update your" : " set up an"} API key to use the full functionality.
        </AlertDescription>
      </Alert>
      
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
      
      {isKeySet && (
        <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span>API key is configured</span>
        </div>
      )}
    </div>
  );
};

export default ApiKeyConfig;
