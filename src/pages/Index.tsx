
import Header from '@/components/Header';
import RecipeGenerator from '@/components/RecipeGenerator';
import { ApiKeyProvider } from '@/context/ApiKeyContext';

const Index = () => {
  return (
    <ApiKeyProvider>
      <div className="min-h-screen flex flex-col bg-recipe-background">
        <Header />
        <main className="flex-1">
          <RecipeGenerator />
        </main>
        <footer className="border-t py-6">
          <div className="container text-center text-sm text-muted-foreground">
            <p>© 2025 NutriSaver. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </ApiKeyProvider>
  );
};

export default Index;
