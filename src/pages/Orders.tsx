import { useEffect, useState } from 'react';
import { Package, Calendar, MapPin, Star, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ordersApi, Order } from '@/lib/api';
import { format } from 'date-fns';

export default function Orders() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.userId) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await ordersApi.getUserOrders(user!.userId);
      setOrders(data.sort((a, b) => new Date(b.pickUpDate).getTime() - new Date(a.pickUpDate).getTime()));
    } catch (error) {
      toast({
        title: 'Failed to load orders',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'pending':
        return 'bg-amber-500 text-white';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const renderOrders = (orderList: Order[]) => {
    if (orderList.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No orders found.</p>
        </div>
      );
    }

    return orderList.map((order) => (
      <Card key={order.id} className="overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold">{order.waste_type}</h3>
                <Badge className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="h-4 w-4" />
                <span className="font-semibold">{order.weight} kg</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end mb-1">
                <Star className="h-5 w-5 text-accent fill-accent" />
                <span className="text-2xl font-bold text-accent">{order.points}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {order.status === 'completed' ? 'Earned' : 'Pending'}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{order.location}</span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Pickup: {format(new Date(order.pickUpDate), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Drop: {format(new Date(order.dropDate), 'MMM dd, yyyy')}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-semibold">Contact:</span> {order.name}
              </div>
              <div>
                <span className="font-semibold">Phone:</span> {order.number}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    ));
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
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            Track your waste pickup orders and earned points
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">
              All
              <Badge variant="secondary" className="ml-2">{orders.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {renderOrders(orders)}
          </TabsContent>
          <TabsContent value="pending" className="space-y-4">
            {renderOrders(orders.filter((o) => o.status.toLowerCase() === 'pending'))}
          </TabsContent>
          <TabsContent value="completed" className="space-y-4">
            {renderOrders(orders.filter((o) => o.status.toLowerCase() === 'completed'))}
          </TabsContent>
          <TabsContent value="cancelled" className="space-y-4">
            {renderOrders(orders.filter((o) => o.status.toLowerCase() === 'cancelled'))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
