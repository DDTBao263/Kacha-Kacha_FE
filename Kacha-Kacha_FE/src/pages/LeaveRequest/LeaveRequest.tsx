import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { debounce } from 'lodash';
import { userService } from '../../services/user';
import { leaveService } from '../../services/leave';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Check, X } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { alert } from '../../utils/Alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui/pagination';

interface LeaveRequest {
  leaveRequestId: number;
  employeeId: number;
  applicationId: number;
  description: string | null;
  leaveType: string;
  startDate: string;
  endDate: string | null;
  time: string | null;
  reason: string | null;
  status: string;
}

const LeaveRequest = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [restaurantId, setRestaurantId] = useState<number | null>(null);

  useEffect(() => {
    const fetchRestaurantId = async () => {
      try {
        if (!user) {
          throw new Error("User is not authenticated");
        }
        const userResponse = await userService.getUserByID(user.id, 'STORE_MANAGER');
        if (!userResponse?.data?.data?.restaurantId) {
          throw new Error("restaurantId is missing");
        }
        setRestaurantId(userResponse.data.data.restaurantId);
      } catch (error) {
        console.error('Failed to fetch restaurant ID:', error);
      }
    };

    fetchRestaurantId();
  }, [user]);

  useEffect(() => {
    if (restaurantId !== null) {
      fetchLeaveRequests(currentPage, 10, searchQuery);
    }
  }, [currentPage, searchQuery, statusFilter, restaurantId]);

  const fetchLeaveRequests = async (page: number, size: number = 10, keyword: string) => {
    try {
      if (restaurantId === null) {
        throw new Error("restaurantId is not set");
      }
      const response = await leaveService.getLeavesByRestaurant(
        page - 1,
        size,
        restaurantId,
        keyword,
        statusFilter
      );
      setLeaveRequests(response.data.data.content || []);
      setTotalPages(response.data.data.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch leave requests:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const debouncedSearch = useCallback(
    debounce((keyword) => {
      setSearchQuery(keyword);
      setCurrentPage(1);
    }, 500),
    [],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleApprove = async (leaveRequestId: number, employeeId: number) => {
    try {
      console.log('Employee ID when approving:', employeeId);
      const response = await leaveService.approveLeave(leaveRequestId);
      if (response.data.status === 0) {
        // Lấy thông tin nhân viên để lấy deviceToken
        const employeeResponse = await leaveService.getEmployeeDetail(employeeId);
        const deviceToken = employeeResponse.data.data.deviceToken;
        console.log('Device Token when approving:', deviceToken);

        if (deviceToken) {
          // Gửi thông báo
          await leaveService.sendNotification({
            recipientToken: deviceToken,
            title: "Leave Request Approved",
            body: "Your leave request has been approved by the manager",
            data: {
              additionalProp1: leaveRequestId.toString(),
              additionalProp2: "APPROVED"
            }
          });
        }

        await alert.success("Leave request has been approved successfully");
        fetchLeaveRequests(currentPage, 10, searchQuery);
      } else {
        await alert.error(response.data.desc || "Error occurred while approving leave request");
      }
    } catch (error) {
      console.error('Error approving leave:', error);
      await alert.error("Error occurred while approving leave request");
    }
  };

  const handleReject = async (leaveRequestId: number, employeeId: number) => {
    try {
      console.log('Employee ID when rejecting:', employeeId);
      const response = await leaveService.rejectLeave(leaveRequestId);
      if (response.data.status === 0) {
        // Lấy thông tin nhân viên để lấy deviceToken
        const employeeResponse = await leaveService.getEmployeeDetail(employeeId);
        const deviceToken = employeeResponse.data.data.deviceToken;
        console.log('Device Token when rejecting:', deviceToken);

        if (deviceToken) {
          // Gửi thông báo
          await leaveService.sendNotification({
            recipientToken: deviceToken,
            title: "Leave Request Rejected",
            body: "Your leave request has been rejected by the manager",
            data: {
              additionalProp1: leaveRequestId.toString(),
              additionalProp2: "REJECTED"
            }
          });
        }

        await alert.success("Leave request has been rejected successfully");
        fetchLeaveRequests(currentPage, 10, searchQuery);
      } else {
        await alert.error(response.data.desc || "Error occurred while rejecting leave request");
      }
    } catch (error) {
      console.error('Error rejecting leave:', error);
      await alert.error("Error occurred while rejecting leave request");
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'success';
      case 'REJECTED':
        return 'destructive';
      case 'PENDING':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <Breadcrumb pageName="Leave Requests" />
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            {/* <input
              type="text"
              placeholder="Search by Employee ID..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              onChange={handleSearchChange}
            /> */}
          </div>
          <div className="ml-auto">
            <Select value={statusFilter} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[180px] py-3">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-2 dark:bg-meta-4">
                <th className="text-left py-4 px-4 font-medium text-slate-600">REQUEST ID</th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">EMPLOYEE ID</th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">LEAVE TYPE</th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">START DATE</th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">END DATE</th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">REASON</th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">STATUS</th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request) => (
                <tr key={request.leaveRequestId} className="border-b hover:bg-slate-50">
                  <td className="py-4 px-4 text-slate-800">{request.leaveRequestId}</td>
                  <td className="py-4 px-4 text-slate-800">{request.employeeId}</td>
                  <td className="py-4 px-4 text-slate-800">{request.leaveType}</td>
                  <td className="py-4 px-4 text-slate-800">{formatDate(request.startDate)}</td>
                  <td className="py-4 px-4 text-slate-800">{formatDate(request.endDate)}</td>
                  <td className="py-4 px-4 text-slate-800">{request.reason || 'N/A'}</td>
                  <td className="py-4 px-4">
                    <Badge variant={getStatusBadgeVariant(request.status)}>{request.status}</Badge>
                  </td>
                  <td className="py-4 px-4">
                    {request.status === 'PENDING' && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleApprove(request.leaveRequestId, request.employeeId)}
                          className="h-8 w-8 text-green-600 hover:text-green-700"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleReject(request.leaveRequestId, request.employeeId)}
                          className="h-8 w-8 text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default LeaveRequest;

