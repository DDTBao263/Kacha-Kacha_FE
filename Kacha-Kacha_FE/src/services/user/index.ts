import { axiosClient } from "../../config/axios"

export const userService = {
    async getAllUsers() {
        return axiosClient.get('/users');
    }
}