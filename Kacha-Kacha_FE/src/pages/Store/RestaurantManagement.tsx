import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { ChevronRight } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { storeService } from '../../services/store';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';

interface Store {
  id: string;
  name: string;
  location: string;
  phoneNumber: string;
  status: string;
  storeManagerId: string;
}

const RestaurantManagement = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchStores(searchQuery);
  }, [searchQuery]);

  const fetchStores = async (keyword: string) => {
    try {
      const response = await storeService.getStoresBySearch(keyword);

      const content = response.data.content || response.data.data?.content;

      const storesData = content.map((store: any) => ({
        id: store.id,
        name: `Kacha-Kacha ${store.location}`,
        location: store.location,
        phoneNumber: store.phoneNumber,
        status: store.status,
      }));
      setStores(storesData);
    } catch (error) {
      console.error('Failed to fetch stores:', error);
    }
  };

  const handleStoreClick = (store: Store) => {
    // setSelectedStore(store);
    navigate(`/restaurantManager/restaurants/${store.id}/employees`);
  };

  const debouncedSearch = useCallback(
    debounce((keyword) => {
      setSearchQuery(keyword);
    }, 50),
    [],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <>
      <Breadcrumb pageName="Restaurants" />
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-80">
          <input
            type="text"
            placeholder="Search by location, phone number..."
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stores.map((store) => (
          <Card
            key={store.id}
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => handleStoreClick(store)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {store.name}
              </CardTitle>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {store.location}
              </div>
              <div className="text-sm text-muted-foreground">
                {store.phoneNumber}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Badge
                  variant={
                    store.status === 'OPEN'
                      ? 'success'
                      : store.status === 'CLOSED'
                      ? 'destructive'
                      : 'outline'
                  }
                >
                  {store.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default RestaurantManagement;
