'use client';

import { PostService } from '@/app/api/postApi';
import BreadCrumb from '@/components/breadcrumb';
import { columns } from '@/components/tables/post-tables/columns';
import { PostTable } from '@/components/tables/post-tables/post-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const breadcrumbItems = [{ title: 'Bài viêt', link: '/dashboard/post' }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const [post, setPosts] = useState<any>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [totalItem, setTotalItem] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await PostService.getPosts(page, pageLimit);
      setPosts(res.data.posts);
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
            title={`Bài viết (${totalItem})`}
            description="Quản lý bải viết"
          />

          <Link
            href={'/dashboard/employee/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Thêm mới
          </Link>
        </div>
        <Separator />

        <PostTable
          searchKey=""
          pageNo={page}
          columns={columns}
          totalUsers={pageCount}
          data={post}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
