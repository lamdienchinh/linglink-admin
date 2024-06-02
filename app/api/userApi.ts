import { AxiosResponse } from 'axios';
import createAxiosInstance from '@/config/axios';

export class UsersService {
  static async getUsers(
    pageIndex: number,
    pageSize: number
  ): Promise<AxiosResponse<any>> {
    const axiosInstance = createAxiosInstance();
    const response: AxiosResponse<any> = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/admin`,
      {
        params: {
          page: pageIndex,
          limit: pageSize
        }
      }
    );
    return response;
  }
}
