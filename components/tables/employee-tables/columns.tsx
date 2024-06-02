'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export type User = {
  id: number;
  avatar: string;
  name: string;
};

export const columns: ColumnDef<User>[] = [
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
    accessorKey: 'name',
    header: 'Tên người dùng'
  },
  {
    accessorKey: 'avatar',
    header: 'Ảnh đại diện',
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage src={row.original.avatar} alt="hình avatar" />
          <AvatarFallback>{row.original.name}</AvatarFallback>
        </Avatar>
      );
    }
  },
  {
    accessorKey: 'email',
    header: 'Địa chỉ email'
  },
  {
    accessorKey: 'createdAt',
    header: 'Ngày tham gia'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
