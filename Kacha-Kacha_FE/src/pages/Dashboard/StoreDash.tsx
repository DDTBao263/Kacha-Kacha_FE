import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { StaffCoverage } from "../../components/PageUI/SMDash/StaffCoverage";
import { QuickAction } from "../../components/PageUI/SMDash/QuickAction";
import { PresentCard } from "../../components/PageUI/SMDash/PresentCard";
import { AbsentCard } from "../../components/PageUI/SMDash/AbsentCard";
import { LateCard } from "../../components/PageUI/SMDash/LateCard";
import React, { useEffect, useState } from 'react';
import { dashboardService } from "../../services/dashboard/index";
import { userService } from "../../services/user/index";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


type DashboardData = {
  date: string;
  day: string;
  numberOfAbsent: number;
  numberOfEmployees: number;
  numberOfEmployeesOnShift: number;
  numberOfLateAttendances: number;
  numberOfOnTime: number;
};


const StoreDash = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [cardData, setCardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) {
        // console.error("User ID is missing");
        return;
      }
  
      try {
        const userResponse = await userService.getUserByID(user.id, 'STORE_MANAGER');
        // console.log("User response:", userResponse);
  
        if (!userResponse?.data?.data?.restaurantId) {
          throw new Error("restaurantId is missing");
        }
  
        const restaurantId = userResponse.data.data.restaurantId;
        // console.log("Fetching dashboard data for restaurant:", restaurantId);
        const dashResponse = await dashboardService.getSMDash(restaurantId);
        // console.log("Dashboard response:", dashResponse);
  
        setCardData(dashResponse.data);
        // console.log(dashResponse.data)
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [user]);

  return (
    <>
      <Breadcrumb pageName="Dashboard" />
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {/* Overview */}
          {cardData && (
            <>
              <PresentCard presentCount={cardData?.numberOfOnTime ?? 0} totalEmployees={cardData?.numberOfEmployees ?? 0} />
              <AbsentCard absentCount={cardData?.numberOfAbsent ?? 0} totalEmployees={cardData?.numberOfEmployees ?? 0} />
              <LateCard lateCount={cardData?.numberOfLateAttendances ?? 0} />
            </>
          )}

          {/* Chart */}
          <StaffCoverage />

          {/* Navigate */}
          <QuickAction />
        </div>
      </div>
    </>
  );
};

export default StoreDash;