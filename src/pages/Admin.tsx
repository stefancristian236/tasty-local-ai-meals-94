
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
            <h1 className="text-3xl font-display font-bold">Panou de administrare</h1>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-recipe-primary" />
                <CardTitle>Configurare API Cookalorie</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Configurează cheia API Spoonacular aici. Odată setată, toți utilizatorii aplicației vor putea obține
                date reale despre rețete fără a fi nevoie să își configureze propriile chei API.
              </p>
              
              <ApiKeyConfig adminView={true} />
            </CardContent>
          </Card>
        </main>
        <footer className="border-t py-6 mt-auto">
          <div className="container text-center text-sm text-muted-foreground">
            <p>© 2025 NutriSaver. Toate drepturile rezervate.</p>
          </div>
        </footer>
      </div>
    </ApiKeyProvider>
  );
};

export default Admin;
