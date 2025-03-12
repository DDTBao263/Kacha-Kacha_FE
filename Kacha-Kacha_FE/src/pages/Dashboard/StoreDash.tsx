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

type CoverageData = {
  date: string;
  totalEmployeeOfRestaurant: number;
  numberOfEmployeeOnShift: number;
  percent: number;
}[];

const StoreDash = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [cardData, setCardData] = useState<DashboardData | null>(null);
  const [coverageData, setCoverageData] = useState<CoverageData>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) {
        return;
      }
  
      try {
        const userResponse = await userService.getUserByID(user.id, 'STORE_MANAGER');
  
        if (!userResponse?.data?.data?.restaurantId) {
          throw new Error("restaurantId is missing");
        }
  
        const restaurantId = userResponse.data.data.restaurantId;
        const dashResponse = await dashboardService.getSMDash(restaurantId);
        const coverageResponse = await dashboardService.getCoverage(restaurantId);
        

        setCardData(dashResponse.data.data);
        setCoverageData(coverageResponse.data.data);
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
          <StaffCoverage data={coverageData} />

          {/* Navigate */}
          <QuickAction />
        </div>
      </div>
    </>
  );
};

export default StoreDash;
