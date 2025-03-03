'use client';

import type React from 'react';

import { useState } from 'react';
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
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '../../components/ui/select';

interface AddAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddAccount: (account: {
    name: string;
    email: string;
    role: string;
    restaurantName: string;
    status: string;
    joinDate: string;
  }) => void;
}

export function AddAccountDialog({
  open,
  onOpenChange,
  onAddAccount,
}: AddAccountDialogProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [restaurantName, setRestaurantName] = useState('-');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !role) {
      return;
    }

    onAddAccount({
      name,
      email,
      role,
      restaurantName,
      status: 'Active', // New accounts are active by default
      joinDate: new Date().toISOString(),
    });

    // Reset form
    setName('');
    setEmail('');
    setRole('');
    setRestaurantName('-');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Account</DialogTitle>
          <DialogDescription>
            Create a new user account. An invitation email will be sent to the
            provided email address.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Select value={role} onValueChange={setRole} required>
              <SelectTrigger id="position">
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Restaurant Manager">
                  Restaurant Manager
                </SelectItem>
                <SelectItem value="Store Manager">Store Manager</SelectItem>
                <SelectItem value="Employee">Employee</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          {/* <div className="space-y-2">
            <Label htmlFor="restaurant">Restaurant (Optional)</Label>
            <Select value={restaurantName} onValueChange={setRestaurantName}>
              <SelectTrigger id="restaurant">
                <SelectValue placeholder="Select restaurant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-">None</SelectItem>
                <SelectItem value="CN1">CN1</SelectItem>
                <SelectItem value="CN2">CN2</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Account</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
