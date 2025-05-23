
import { ApiKeyProvider } from '@/context/ApiKeyContext';
import Header from '@/components/Header';
import ApiKeyConfig from '@/components/ApiKeyConfig';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChefHat, Lock } from 'lucide-react';

const Admin = () => {
  return (
    <ApiKeyProvider>
      <div className="min-h-screen flex flex-col bg-recipe-background">
        <Header />
        <main className="container py-12 max-w-4xl">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="h-6 w-6 text-recipe-primary" />
            <h1 className="text-3xl font-display font-bold">Admin panel</h1>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-recipe-primary" />
                <CardTitle>Configure API Key</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
               Configure the Spoonacular API key here. Once set, all app users will be able to access real 
               recipe data without needing to configure their own API keys. 
              </p>
              
              <ApiKeyConfig adminView={true} />
            </CardContent>
          </Card>
        </main>
        <footer className="border-t py-6 mt-auto">
          <div className="container text-center text-sm text-muted-foreground">
            <p>© 2025 NutriSaver. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </ApiKeyProvider>
  );
};

export default Admin;
