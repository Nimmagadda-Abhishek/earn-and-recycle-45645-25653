import { Link } from 'react-router-dom';
import { Leaf, Award, MapPin, Sparkles, ArrowRight, Recycle, TrendingUp, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Sustainable Waste Management</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Turn Your Waste Into
              <span className="text-gradient block mt-2">Rewards & Impact</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Schedule convenient pickups, earn points for recycling, and redeem exciting rewards while making a positive impact on the environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="text-lg px-8 shadow-lg hover:shadow-xl transition-all">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Simple steps to start earning rewards</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="relative overflow-hidden group hover:shadow-lg transition-all animate-fade-in">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full" />
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-eco rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">1. Schedule Pickup</h3>
                <p className="text-muted-foreground">
                  Choose a convenient time and location for waste collection. Select your waste type and weight.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-bl-full" />
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-eco rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">2. Earn Points</h3>
                <p className="text-muted-foreground">
                  Get 10 points per kg of waste recycled. Track your environmental impact in real-time.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-bl-full" />
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-eco rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">3. Redeem Rewards</h3>
                <p className="text-muted-foreground">
                  Use your points to unlock exclusive rewards and benefits from our partner network.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose EcoCollect?</h2>
            <p className="text-xl text-muted-foreground">Making recycling rewarding and convenient</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center p-6 rounded-xl hover:bg-muted/50 transition-all animate-fade-in">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Eco-Friendly</h3>
              <p className="text-sm text-muted-foreground">Reduce environmental impact with proper waste management</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:bg-muted/50 transition-all animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-bold mb-2">Convenient</h3>
              <p className="text-sm text-muted-foreground">Schedule pickups at your preferred time and location</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:bg-muted/50 transition-all animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-bold mb-2">Earn Rewards</h3>
              <p className="text-sm text-muted-foreground">Get points for every kilogram you recycle</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:bg-muted/50 transition-all animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-bold mb-2">Community</h3>
              <p className="text-sm text-muted-foreground">Join thousands making a difference together</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-eco text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community of eco-conscious individuals today
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8 shadow-lg hover:shadow-xl transition-all">
              Start Earning Rewards <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-primary" />
              <span className="font-bold text-xl text-gradient">EcoCollect</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2025 EcoCollect. Making the world greener, one pickup at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
