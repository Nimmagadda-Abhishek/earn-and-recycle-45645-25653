import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SaveItem } from '@/lib/api';
import { Minus, Plus, CalendarIcon, Star } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ItemSelectionModalProps {
  item: SaveItem | null;
  open: boolean;
  onClose: () => void;
  onPlaceOrder: (orderData: {
    waste_type: string;
    weight: string;
    points: string;
    location: string;
    name: string;
    number: string;
    mail: string;
    pickUpDate: string;
    dropDate: string;
  }) => Promise<void>;
  userAccount: { name: string; email: string; phone: string } | null;
}

export function ItemSelectionModal({ item, open, onClose, onPlaceOrder, userAccount }: ItemSelectionModalProps) {
  const [weight, setWeight] = useState(1);
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pickUpDate, setPickUpDate] = useState<Date>();
  const [dropDate, setDropDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (userAccount) {
      setName(userAccount.name || '');
      setPhone(userAccount.phone || '');
      setEmail(userAccount.email || '');
    }
  }, [userAccount]);

  useEffect(() => {
    if (!open) {
      setWeight(1);
      setLocation('');
      setPickUpDate(undefined);
      setDropDate(undefined);
    }
  }, [open]);

  if (!item) return null;

  const calculatePoints = () => {
    return Math.round(item.price * weight * 10);
  };

  const points = calculatePoints();

  const incrementWeight = () => {
    setWeight(prev => Math.round((prev + 0.5) * 10) / 10);
  };

  const decrementWeight = () => {
    setWeight(prev => Math.max(0.5, Math.round((prev - 0.5) * 10) / 10));
  };

  const isFormValid = () => {
    return location.length >= 10 && 
           name.length >= 2 && 
           phone.length === 10 && 
           email.includes('@') && 
           pickUpDate && 
           dropDate &&
           weight >= 0.5;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;
    
    setIsSubmitting(true);
    try {
      await onPlaceOrder({
        waste_type: item.name,
        weight: weight.toString(),
        points: points.toString(),
        location,
        name,
        number: phone,
        mail: email,
        pickUpDate: format(pickUpDate!, 'yyyy-MM-dd'),
        dropDate: format(dropDate!, 'yyyy-MM-dd'),
      });
      onClose();
    } catch (error) {
      console.error('Failed to place order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Place Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Item Details */}
          <div className="flex gap-4 p-4 bg-muted rounded-lg">
            <img 
              src={item.imageUrl} 
              alt={item.name} 
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">
                  ₹{item.price}/kg
                </span>
              </div>
            </div>
          </div>

          {/* Weight Selector */}
          <div className="bg-accent/10 p-6 rounded-lg space-y-4">
            <Label className="text-base font-semibold">Select Weight</Label>
            <div className="flex items-center justify-center gap-4">
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="h-16 w-16 rounded-full"
                onClick={decrementWeight}
                disabled={weight <= 0.5}
              >
                <Minus className="h-6 w-6" />
              </Button>
              <div className="text-center min-w-[100px]">
                <div className="text-4xl font-bold">{weight}</div>
                <div className="text-sm text-muted-foreground">kg</div>
              </div>
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="h-16 w-16 rounded-full"
                onClick={incrementWeight}
              >
                <Plus className="h-6 w-6" />
              </Button>
            </div>

            {/* Points Calculation */}
            <div className="text-center pt-4 border-t">
              <div className="text-sm text-muted-foreground mb-2">
                ₹{item.price}/kg × {weight} kg × 10
              </div>
              <div className="flex items-center justify-center gap-2">
                <Star className="h-6 w-6 text-accent fill-accent" />
                <span className="text-3xl font-bold text-accent">{points}</span>
                <span className="text-xl text-muted-foreground">points</span>
              </div>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="location">Location/Address *</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter complete address"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="10 digits"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Pick-up Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-1",
                      !pickUpDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {pickUpDate ? format(pickUpDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={pickUpDate}
                    onSelect={setPickUpDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Drop Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-1",
                      !dropDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dropDate ? format(dropDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dropDate}
                    onSelect={setDropDate}
                    disabled={(date) => date < (pickUpDate || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid() || isSubmitting}
            className="w-full h-12 text-base font-semibold"
            size="lg"
          >
            {isSubmitting ? 'Placing Order...' : `Place Order (Earn ${points} Points)`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
