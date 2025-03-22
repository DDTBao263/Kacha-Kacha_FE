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
    restaurantId: number;

  } | null;
  // onSave: (updatedAccount: {
  //   id: string;
  //   firstName: string;
  //   lastName: string;
  //   name: string;
  //   email: string;
  //   role: string;
  //   status: string;
  // }) => void;
}

export function EditEmployeeDiaLog({
  open,
  onOpenChange,
  account, // onSave,
}: EditAccountDialogProps) {
  const [firstName, setFirstName] = useState('Fake firstName');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('Fake lastName');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [restaurantId, setRestaurantId] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Account data:', account);
    if (account) {
      setFirstName(account.firstName || '');
      setName(account.name || '');
      setLastName(account.lastName || '');
      setEmail(account.email || '');
      setPhone(account.phone || '');
      setAddress(account.address || '');
      setStatus(account.status || '');
      setRestaurantId(account.restaurantId || 0);  
    } else {
      setFirstName('');
      setName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setStatus('');
      setRestaurantId(0);
    }
  }, [account]);
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('account', account);

    e.preventDefault();
    if (!account?.employeeId || !firstName || !lastName || !email) {
      console.log(123);
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError(null);

    const updatedAccount = {
      id: account.employeeId,
      firstName,
      lastName,
      name,
      email,
      phoneNumber: phone,
      address,
      status,
      restaurantId
    };
    console.log('Updated account employee:', updatedAccount);

    try {
      await employeeService.UpdateEmpById(updatedAccount);
      onOpenChange(false);
      window.dispatchEvent(new Event('refreshAccounts'));
    } catch (error) {
      console.error('Failed to update account:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[500px] overflow-y-auto py-2">
        <DialogHeader>
          <DialogTitle>Edit Account</DialogTitle>
          <DialogDescription>
            Modify account details and save changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-2 py-2">
          {/* <div className="space-y-2">
            <Label htmlFor="firstName">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="SUSPENDED">SUSPENDED</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="restaurantId">Restaurant</Label>
            <Input
              id="restaurantId"
              type="number"
              value={restaurantId}
              onChange={(e) => setRestaurantId(Number(e.target.value))}
            />
          </div>

          <DialogFooter className="pt-4">
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
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
