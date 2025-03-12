import { axiosPrivate } from '../../config/axios';

export const leaveService = {
    // Lấy đơn xin nghỉ theo tháng
    // getLeaveByMonth: async (page: number, size: number) => {
    //     const jwt_Token = localStorage.getItem('jwtToken');
    //     return axiosPrivate.get(`/api/restaurants?page=${page}&size=${size}`, {
    //       headers: {
    //         Authorization: `Bearer ${jwt_Token}`,
    //       },
    //     });
    // },

    //lấy đơn xin nghỉ theo restaurant


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
        return axiosPrivate.post(`/api/application/request?employeeId=${employeeId}`, leaveData, { 
            headers: {
                Authorization: `Bearer ${jwt_Token}`,
                'Content-Type': 'application/json',
            },
        });
    },


    //Duyệt đơn xin nghỉ 
    ApproveLeave: async (updatedLeave: {
        applicationId: string;
      }) => {
        const jwt_Token = localStorage.getItem('jwtToken');
        return axiosPrivate.put(`/api/application/{id}/approve?id=${updatedLeave.applicationId}`,updatedLeave, {
          headers: {
            Authorization: `Bearer ${jwt_Token}`,
            'Content-Type': 'application/json',
          },
        });
      },


    //Từ chối đơn xin nghỉ 
    RejectLeave: async (updatedLeave: {
        applicationId: string;
      }) => {
        const jwt_Token = localStorage.getItem('jwtToken');
        return axiosPrivate.put(`/api/application/{id}/reject?id=${updatedLeave.applicationId}`,updatedLeave, {
          headers: {
            Authorization: `Bearer ${jwt_Token}`,
            'Content-Type': 'application/json',
          },
        });
      },

    // Push To Mobile
    
}