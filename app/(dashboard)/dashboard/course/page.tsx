'use client';

import { CoursesService } from '@/app/api/courseApi';
import { UsersService } from '@/app/api/userApi';
import BreadCrumb from '@/components/breadcrumb';
import { CourseTable } from '@/components/tables/course-tables/course-tables';
import { columns } from '@/components/tables/course-tables/columns';
import { EmployeeTable } from '@/components/tables/employee-tables/employee-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Employee } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const breadcrumbItems = [{ title: 'Khóa học', link: '/dashboard/course' }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const [course, setCourse] = useState<any>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [totalItem, setTotalItem] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await CoursesService.getCourses(page, pageLimit);
      setCourse(res.data.courses);
      setTotalItem(res.data.totalItem);
      setPageCount(res.data.totalPage);
    };
    fetchData();
  }, [searchParams]);
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Khóa học (${totalItem})`}
            description="Quản lý khóa học"
          />

          <Link
            href={'/dashboard/employee/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Thêm mới
          </Link>
        </div>
        <Separator />

        <CourseTable
          searchKey=""
          pageNo={page}
          columns={columns}
          totalUsers={pageCount}
          data={course}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
