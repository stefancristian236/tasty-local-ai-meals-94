import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { ApiKeyProvider } from '@/context/ApiKeyContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Info, Trash2, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { RonIcon } from '@/utils/currencyUtils';

interface ShoppingItem {
  id: string;
  name: string;
  checked: boolean;
  quantity: string;
}

const ShoppingList = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<ShoppingItem[]>(() => {
    const saved = localStorage.getItem('shoppingList');
    return saved ? JSON.parse(saved) : [];
  });
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (newItemName.trim() === '') return;

    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: newItemName,
      quantity: newItemQuantity,
      checked: false
    };

    setItems([...items, newItem]);
    setNewItemName('');
    setNewItemQuantity('');

    toast({
      title: "Item added",
      description: `${newItemName} has been added to the shopping list.`,
    });
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));

    toast({
      title: "Item deleted",
      description: "The item has been removed from the shopping list.",
    });
  };

  const clearCheckedItems = () => {
    setItems(items.filter(item => !item.checked));

    toast({
      title: "List cleared",
      description: "Checked items have been removed.",
    });
  };

  return (
    <ApiKeyProvider>
      <div className="min-h-screen flex flex-col bg-recipe-background">
        <Header />
        <main className="flex-1 container py-12 max-w-4xl">
          <div className="flex items-center gap-2 mb-6">
            <ShoppingCart className="h-6 w-6 text-recipe-primary" />
            <h1 className="text-3xl font-display font-bold">Shooping cart</h1>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Item name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/4">
                  <Input
                    placeholder="Quantity"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(e.target.value)}
                  />
                </div>
                <Button onClick={addItem}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {items.length > 0 ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Items ({items.length})</CardTitle>
                {items.some(item => item.checked) && (
                  <Button variant="outline" size="sm" onClick={clearCheckedItems}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item.id}>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-3">
                          <Checkbox 
                            id={`item-${item.id}`}
                            checked={item.checked}
                            onCheckedChange={() => toggleItem(item.id)}
                          />
                          <label 
                            htmlFor={`item-${item.id}`} 
                            className={`text-lg ${item.checked ? 'line-through text-muted-foreground' : ''}`}
                          >
                            {item.name}
                            {item.quantity && <span className="ml-2 text-muted-foreground text-sm">({item.quantity})</span>}
                          </label>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => deleteItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <Separator />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-recipe-primary" />
                  <CardTitle>Empty list</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Empty.
                </p>
                <Button variant="default">
                  <Link to="/">Generate recipes</Link>
                </Button>
              </CardContent>
            </Card>
          )}
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

export default ShoppingList;
