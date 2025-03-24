import type React from 'react';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { employeeService } from '../../services/employee/index';
import { Store } from '../../types/store';

interface EditAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: {
    employeeId: string;
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    status: string;
    role: string;
    restaurantId: string;
    restaurantLocation: string;
  } | null;
  restaurant: Store[];
}

export function EditEmployeeDiaLog({
  open,
  onOpenChange,
  account,
  restaurant,
}: EditAccountDialogProps) {
  const [firstName, setFirstName] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurantLocation, setRestaurantLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // console.log('account', account);
  // console.log("restaurant", restaurant);

  useEffect(() => {
    if (account) {
      setFirstName(account.firstName || '');
      setName(account.name || '');
      setLastName(account.lastName || '');
      setEmail(account.email || '');
      setPhone(account.phone || '');
      setAddress(account.address || '');
      setStatus(account.status || '');
      setRestaurantId(account.restaurantId || '');
      setRestaurantLocation(account.restaurantLocation || '');
    } else {
      setFirstName('');
      setName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setStatus('');
      setRestaurantId('');
      setRestaurantLocation('');
    }
  }, [account]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account?.employeeId || !firstName || !lastName || !email) {
      setError('Please fill in all fields.');
      return;
    }
    // setLoading(true);
    setError(null);
    const updatedAccount = {
      firstName,
      lastName,
      email,
      phoneNumber: phone,
      address,
      restaurantId: Number(restaurantId),
      status,
    };

    console.log('updatedAccount', updatedAccount);

    try {
      const res = await employeeService.UpdateEmpById(
        updatedAccount,
        Number(account.employeeId),
      );
      // console.log("res", res)
      if(res.status ==200){
        alert("Update SuccessFully")
        setLoading(false);
        onOpenChange(false);
        window.dispatchEvent(new Event('refreshAccounts'));
      }
    } catch (error) {
      console.error('Failed to update account:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogDescription>
            Edit employee information and save changes.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 py-4">
          {/* <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} disabled />
          </div> */}
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="status">Restaurant</Label>
            <select
              id="restaurant"
              value={restaurantLocation}
              onChange={(e) => {
                // console.log("e.target.value", e.target.value);
                
                const restaurantName: Store | undefined = restaurant.find(
                  (r: Store) => r.id == Number(e.target.value)
                );
                // console.log("restaurantName", restaurantName);
                setRestaurantLocation(restaurantName.location)
                setRestaurantId(e.target.value);
              }}
              required
              className="w-full rounded-lg border py-2 px-4"
            >
              <option value={restaurantId}>{restaurantLocation}</option>
              {restaurant &&
                restaurant.map((val: Store) => (
                  <option key={val.id} value={val.id}>
                    {val.location}
                  </option>
                ))}
            </select>
          </div>

          <div className="space-y-2 col-span-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="w-full rounded-lg border py-2 px-4"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="SUSPENDED">SUSPENDED</option>
            </select>
          </div>
          <div className="col-span-2 flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
