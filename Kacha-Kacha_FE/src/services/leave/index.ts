import { axiosPrivate } from '../../config/axios';

interface LeaveResponse {
  status: number;
  desc: string | null;
  data: {
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
  };
}

export const leaveService = {
  // Lấy danh sách đơn xin nghỉ theo nhà hàng và phân trang
  getLeavesByRestaurant: async (
    page: number,
    size: number,
    restaurantId: number,
    keyword?: string,
    status?: string,
  ) => {
    const jwt_Token = localStorage.getItem('jwtToken');
    let url = `/api/application?page=${page}&size=${size}&restaurantId=${restaurantId}`;
    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    if (status && status !== 'ALL') {
      url += `&status=${status}`;
    }
    return axiosPrivate.get(url, {
      headers: {
        Authorization: `Bearer ${jwt_Token}`,
      },
    });
  },

  //Tạo đơn xin nghỉ manual
  addLeave: async (newLeave: {
    employeeId: number;
    applicationType: string;
    description: string;
    dateFrom: Date;
    dateTo: Date;
  }) => {
    const jwt_Token = localStorage.getItem('jwtToken');
    const { employeeId, ...leaveData } = newLeave;
    return axiosPrivate.post(
      `/api/application/request?employeeId=${employeeId}`,
      leaveData,
      {
        headers: {
          Authorization: `Bearer ${jwt_Token}`,
          'Content-Type': 'application/json',
        },
      },
    );
  },

  //Duyệt đơn xin nghỉ
  approveLeave: async (
    leaveRequestId: number,
  ): Promise<{ data: LeaveResponse }> => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.put(
      `/api/application/${leaveRequestId}/approve?id=${leaveRequestId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${jwt_Token}`,
          'Content-Type': 'application/json',
        },
      },
    );
  },

  //Từ chối đơn xin nghỉ
  rejectLeave: async (
    leaveRequestId: number,
  ): Promise<{ data: LeaveResponse }> => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.put(
      `/api/application/${leaveRequestId}/reject?id=${leaveRequestId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${jwt_Token}`,
          'Content-Type': 'application/json',
        },
      },
    );
  },

  // Lấy thông tin chi tiết nhân viên
  getEmployeeDetail: async (employeeId: number) => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.get(`/api/employees/${employeeId}`, {
      headers: {
        Authorization: `Bearer ${jwt_Token}`,
      },
    });
  },

  // Push To Mobile
  sendNotification: async (data: {
    recipientToken: string;
    title: string;
    body: string;
    image: string;
    data: {
      additionalProp1: string;
      additionalProp2: string;
      additionalProp3: string;
    };
  }) => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.post('/api/notification/send', data, {
      headers: {
        Authorization: `Bearer ${jwt_Token}`,
        'Content-Type': 'application/json',
      },
    });
  },

  getApplicationByEmpId: async (employeeId: number) => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.get(
      `/api/application/employee/{id}?employeeId=${employeeId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt_Token}`,
        },
      },
    );
  },
};
