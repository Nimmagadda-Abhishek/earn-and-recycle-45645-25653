import { Gift, Trophy, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Rewards = () => {
  const userPoints = 450;
  const pointsToNextReward = 550;
  const progress = (userPoints / pointsToNextReward) * 100;

  const availableRewards = [
    {
      id: 1,
      title: "₹100 Shopping Voucher",
      points: 500,
      description: "Redeemable at partner stores",
      icon: Gift,
    },
    {
      id: 2,
      title: "Premium Pickup Service",
      points: 300,
      description: "Priority pickup for your next order",
      icon: TrendingUp,
    },
    {
      id: 3,
      title: "Eco Warrior Badge",
      points: 1000,
      description: "Exclusive digital badge for your profile",
      icon: Trophy,
    },
  ];

  const recentActivity = [
    { action: "Plastic recycled", points: 50, date: "2 days ago" },
    { action: "E-waste collected", points: 100, date: "1 week ago" },
    { action: "Paper recycled", points: 30, date: "2 weeks ago" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">My Rewards</h1>
          <p className="text-muted-foreground">Earn points and redeem exciting rewards</p>
        </div>

        {/* Points Overview */}
        <Card className="mb-8">
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
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress to next reward</span>
                  <span className="font-medium">{pointsToNextReward} points</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Rewards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Available Rewards</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableRewards.map((reward) => {
              const Icon = reward.icon;
              const canRedeem = userPoints >= reward.points;
              
              return (
                <Card key={reward.id} className={!canRedeem ? 'opacity-60' : ''}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Icon className="w-8 h-8 text-primary" />
                      <Badge variant={canRedeem ? "default" : "secondary"}>
                        {reward.points} pts
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{reward.title}</CardTitle>
                    <CardDescription>{reward.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <button
                      disabled={!canRedeem}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        canRedeem
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : 'bg-muted text-muted-foreground cursor-not-allowed'
                      }`}
                    >
                      {canRedeem ? 'Redeem' : 'Not enough points'}
                    </button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b last:border-0"
                  >
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                    <Badge variant="outline" className="text-primary">
                      +{activity.points} pts
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
