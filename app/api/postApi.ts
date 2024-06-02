import { AxiosResponse } from 'axios';
import createAxiosInstance from '@/config/axios';

export class PostService {
  static async getPosts(
    pageIndex: number,
    pageSize: number
  ): Promise<AxiosResponse<any>> {
    const axiosInstance = createAxiosInstance();
    const response: AxiosResponse<any> = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/posts/admin`,
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
