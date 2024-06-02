import { AxiosResponse } from 'axios';
import createAxiosInstance from '@/config/axios';

export class CoursesService {
  static async getCourses(
    pageIndex: number,
    pageSize: number
  ): Promise<AxiosResponse<any>> {
    const axiosInstance = createAxiosInstance();
    const response: AxiosResponse<any> = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/courses/admin`,
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
