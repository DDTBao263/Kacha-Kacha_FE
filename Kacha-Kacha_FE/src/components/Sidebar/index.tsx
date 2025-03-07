import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../assets/images/logo/logo.svg';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Admin Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              ADMINISTRATOR
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/admindash"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('admindash') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/store"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('store') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  Store
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/account"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('account') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  Account
                </NavLink>
              </li>
            </ul>
          </div>
          {/* <!-- Admin Group --> */}

          {/* <!-- Restaurant Manager Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              RESTAURANT MANAGER
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/restaurantdash"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('restaurantdash') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/employee"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('employee') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  Employee
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/leavetype"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('leavetype') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  Leave Type
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/workshift"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('workshift') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  Workshift
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reports"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('reports') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  Reports
                </NavLink>
              </li>
            </ul>
          </div>
          {/* <!-- Restaurant Manager Group --> */}

          {/* <!-- Store Manager Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              STORE MANAGER
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/storedash"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('storedash') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/attendance"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('attendance') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  Attendance
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/leaverequest"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('leaverequest') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  Leave Request
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/schedule"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('schedule') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  Schedule
                </NavLink>
              </li>
            </ul>
          </div>
          {/* <!-- Store Manager Group --> */}

          {/* <!-- Template Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              TEMPLATE
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/profile"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/auth/signin"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('signin') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  Sign in
                </NavLink>
              </li>
            </ul>
          </div>
          {/* <!-- Template Group --> */}
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;