import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Logo from '../../assets/images/logo/logo.svg';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

type UserType = 'ADMIN' | 'RESTAURANT_MANAGER' | 'STORE_MANAGER';

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const userType = useSelector(
    (state: RootState) => state.auth.user?.userType as UserType,
  );
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  const menuItems = {
    ADMIN: [
      { name: 'Dashboard', path: '/admin/admindash' },
      { name: 'Store', path: '/admin/store' },
      { name: 'Account', path: '/admin/account' },
      { name: 'Employee', path: '/admin/employee' },
    ],
    RESTAURANT_MANAGER: [
      { name: 'Dashboard', path: '/restaurantManager/resdash' },
      { name: 'Restaurant Management', path: '/restaurantManager/restaurants' },
      { name: 'Reports', path: '/restaurantManager/reports' },
      { name: 'Employee', path: '/restaurantManager/employee'}
    ],
    STORE_MANAGER: [
      { name: 'Dashboard', path: '/storeManager/storedash' },
      { name: 'Attendance', path: 'storeManager/attendance' },
      { name: 'Leave Request', path: '/storeManager/leaverequest' },
      { name: 'Schedule', path: '/storeManager/schedule' },
    ],
  };

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50 flex h-screen w-72 flex-col bg-gradient-to-b from-gray-900 to-black shadow-xl transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:static lg:translate-x-0`}
    >
      <div className="flex items-center justify-between px-6 py-5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" className="h-10 w-auto" />
        </NavLink>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white lg:hidden"
        >
          &#9776;
        </button>
      </div>

      <nav className="mt-6 px-4">
        {userType && menuItems[userType] ? (
          <ul className="space-y-2">
            {menuItems[userType].map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-2 text-white transition-all duration-200 ease-in-out hover:bg-gray-600 ${
                      isActive ? 'bg-gray-700' : ''
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 px-4">No access</p>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
