import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { authApi } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

const Rewards = () => {
  const { user } = useAuth();
  const [userPoints, setUserPoints] = useState<number>(0);
  const [userMoney, setUserMoney] = useState<number>(0);

  useEffect(() => {
    const fetchUserRewards = async () => {
      if (user?.userId) {
        try {
          const data = await authApi.getUserRewards(user.userId);
          setUserPoints(data.user_points);
          setUserMoney(data.user_money);
        } catch (error) {
          console.error('Failed to fetch user rewards:', error);
        }
      }
    };
    fetchUserRewards();
  }, [user?.userId]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">My Rewards</h1>
          <p className="text-muted-foreground">Check your current money and points balance and redeem exciting rewards</p>
        </div>

        {/* Money and Points Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Your Points Balance
              </CardTitle>
              <CardDescription>Keep recycling to earn more points!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-primary">{userPoints}</span>
                  <Badge variant="secondary">Points</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Your Money Balance
              </CardTitle>
              <CardDescription>Keep recycling to increase your earnings!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-primary">₹{userMoney.toFixed(2)}</span>
                  <Badge variant="secondary">INR</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Rewards;
