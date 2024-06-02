'use client';

import { UsersService } from '@/app/api/userApi';
import BreadCrumb from '@/components/breadcrumb';
import { columns } from '@/components/tables/employee-tables/columns';
import { EmployeeTable } from '@/components/tables/employee-tables/employee-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Employee } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const breadcrumbItems = [{ title: 'Người dùng', link: '/dashboard/employee' }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const [employeeRes, setEmployeeRes] = useState<any>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [totalItem, setTotalItem] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await UsersService.getUsers(page, pageLimit);
      console.log(res);
      setEmployeeRes(res.data.users);
      setTotalItem(res.data.totalItem);
      setPageCount(res.data.totalPage);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Người dùng (${totalItem})`}
            description="Quản lý người dùng hệ thống"
          />

          <Link
            href={'/dashboard/employee/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Thêm mới
          </Link>
        </div>
        <Separator />

        <EmployeeTable
          searchKey="người dùng"
          pageNo={page}
          columns={columns}
          totalUsers={pageCount}
          data={employeeRes}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
