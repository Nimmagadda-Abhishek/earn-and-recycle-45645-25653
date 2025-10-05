import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { saveItemsApi, ordersApi, SaveItem } from '@/lib/api';
import { ItemSelectionModal } from '@/components/ItemSelectionModal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Star, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Home() {
  const { user, account } = useAuth();
  const [items, setItems] = useState<SaveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<SaveItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await saveItemsApi.getAll();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
      toast({
        title: 'Error',
        description: 'Failed to load waste items. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (item: SaveItem) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handlePlaceOrder = async (orderData: any) => {
    if (!user?.userId) return;

    try {
      await ordersApi.place({
        userID: user.userId,
        ...orderData,
        status: 'pending',
      });

      toast({
        title: 'Success!',
        description: `Order placed successfully! You'll earn ${orderData.points} points after pickup.`,
      });
    } catch (error) {
      console.error('Failed to place order:', error);
      toast({
        title: 'Error',
        description: 'Failed to place order. Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 rounded-b-3xl shadow-lg mb-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-1">
            Welcome, {user?.firstName}! 👋
          </h1>
          <div className="flex items-center gap-2 mt-3">
            <Star className="h-5 w-5 fill-accent text-accent" />
            <span className="text-xl font-semibold">{account?.user_points || 0}</span>
            <span className="text-sm opacity-90">points available</span>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <h2 className="font-semibold text-accent mb-2 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            How it works
          </h2>
          <ol className="text-sm space-y-1 text-muted-foreground">
            <li>1. Select a waste type below</li>
            <li>2. Choose weight and schedule pickup</li>
            <li>3. Earn points based on waste value</li>
            <li>4. Track your orders</li>
          </ol>
        </div>
      </div>

      {/* Waste Items Catalog */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-bold mb-4">Select Waste Type</h2>
        
        {items.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Trash2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No waste items available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map((item) => (
              <Card 
                key={item.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
                onClick={() => handleItemClick(item)}
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div 
                    className="absolute top-2 right-2 w-6 h-6 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-accent">
                      ₹{item.price}
                    </span>
                    <span className="text-sm text-muted-foreground">/kg</span>
                  </div>
                  <Button 
                    className="w-full mt-3" 
                    variant="default"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleItemClick(item);
                    }}
                  >
                    Select
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Item Selection Modal */}
      <ItemSelectionModal
        item={selectedItem}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedItem(null);
        }}
        onPlaceOrder={handlePlaceOrder}
        userAccount={account ? {
          name: account.name,
          email: account.email,
          phone: account.phone,
        } : null}
      />
    </div>
  );
}
