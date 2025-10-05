import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

export const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/orders', icon: Package, label: 'Orders' },
    { path: '/rewards', icon: Gift, label: 'Rewards' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 shadow-lg">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={cn(
              'flex flex-col items-center justify-center flex-1 h-full transition-all',
              isActive(path) 
                ? 'text-primary scale-105' 
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
