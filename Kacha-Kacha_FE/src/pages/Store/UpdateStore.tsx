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
import { storeService } from '../../services/store';
import { userService } from '../../services/user';

interface UpdateStoreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  store: {
    storeId: string;
    location: string;
    phoneNumber: string;
    status: string;
    storeManagerId: string;
  } | null;
}

export function UpdateStoreDialog({
  open,
  onOpenChange,
  store,
}: UpdateStoreDialogProps) {
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('');
  const [storeManager, setStoreManager] = useState('');
  const [storeManagers, setStoreManagers] = useState<
    { userId: string; userName: string; email: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStoreManagers = async () => {
      //   try {
      //     const response = await userService.getUsersByRole('DRAFT');
      //     setStoreManagers(response.data);
      //   } catch (error) {
      //     console.error('Failed to fetch store managers:', error);
      //   }
    };
    fetchStoreManagers();
  }, []);

  useEffect(() => {
    if (store) {
      setLocation(store.location || '');
      setPhoneNumber(store.phoneNumber || '');
      setStatus(store.status || '');
      setStoreManager(store.storeManagerId || '');
    } else {
      setLocation('');
      setPhoneNumber('');
      setStatus('');
      setStoreManager('');
    }
  }, [store]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !store?.storeId ||
      !location ||
      !phoneNumber ||
      !status ||
      !storeManager
    ) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError(null);

    const updatedStore = {
      storeId: store.storeId,
      location,
      phoneNumber,
      status,
      storeManagerId: storeManager,
    };
    console.log('Updated store:', updatedStore);

    // try {
    //   await storeService.updateStore(updatedStore);
    //   onOpenChange(false);
    //   window.dispatchEvent(new Event('refreshStores'));
    // } catch (error) {
    //   console.error('Failed to update store:', error);
    // }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Store</DialogTitle>
          <DialogDescription>
            Modify store details and save changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
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
              <option value="CLOSED">CLOSED</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="storeManager">Store Manager</Label>
            <select
              id="storeManager"
              value={storeManager}
              onChange={(e) => setStoreManager(e.target.value)}
              required
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              <option value="" disabled>
                Select a store manager
              </option>
              {storeManagers.map((manager) => (
                <option key={manager.userId} value={manager.userId}>
                  {manager.userName} ({manager.email})
                </option>
              ))}
            </select>
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
