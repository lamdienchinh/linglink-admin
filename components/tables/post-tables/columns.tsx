'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export type Post = {
  id: number;
  content: string;
  topic: any;
  author: any;
};

export const columns: ColumnDef<Post>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'topic.topicName',
    header: 'Chủ đề'
  },
  {
    accessorKey: 'author',
    header: 'Tác giả',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={row.original.author.avatar} alt="hình avatar" />
            <AvatarFallback>{row.original.author.name}</AvatarFallback>
          </Avatar>
          {row.original.author.name}
        </div>
      );
    }
  },
  {
    accessorKey: 'content',
    header: 'Nội dung',
    cell: ({ row }) => {
      return <div>{row.original.content}</div>;
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Ngày tạo'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
