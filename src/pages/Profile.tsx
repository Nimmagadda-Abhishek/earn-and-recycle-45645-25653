import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut, User, Mail, Phone, Star, DollarSign, Package, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ordersApi, Order } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function Profile() {
  const { user, account, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({ totalOrders: 0, totalWeight: 0, totalPoints: 0 });

  useEffect(() => {
    if (user?.userId) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    if (!user?.userId) return;
    try {
      const data = await ordersApi.getUserOrders(user.userId);
      setOrders(data);
      
      const totalWeight = data.reduce((sum, order) => sum + Number(order.weight), 0);
      const totalPoints = data.reduce((sum, order) => sum + Number(order.points), 0);
      
      setStats({
        totalOrders: data.length,
        totalWeight: Math.round(totalWeight * 10) / 10,
        totalPoints,
      });
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user || !account) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <div className="space-y-6">
          {/* User Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="text-lg font-semibold">{account.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-lg font-semibold">{account.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-lg font-semibold">{account.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Points & Earnings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Points & Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-6 bg-primary/10 rounded-xl">
                  <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground mb-1">Current Points</p>
                  <p className="text-4xl font-bold text-primary">{account.user_points}</p>
                </div>
                <div className="text-center p-6 bg-accent/10 rounded-xl">
                  <DollarSign className="h-8 w-8 mx-auto mb-2 text-accent" />
                  <p className="text-sm text-muted-foreground mb-1">Money Earned</p>
                  <p className="text-4xl font-bold text-accent">₹{account.user_money}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Your Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">{stats.totalOrders}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Orders</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">{stats.totalWeight}</p>
                  <p className="text-xs text-muted-foreground mt-1">kg Disposed</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">{stats.totalPoints}</p>
                  <p className="text-xs text-muted-foreground mt-1">Points Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
            size="lg"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
