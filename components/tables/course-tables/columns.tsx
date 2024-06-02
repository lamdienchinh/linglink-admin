'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type Course = {
  id: number;
  name: string;
  student: number;
  teacher: string;
  startTime: string;
  endTime: string;
  price: number;
};

export const columns: ColumnDef<Course>[] = [
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
    header: 'Tên khóa học'
  },
  {
    accessorKey: 'teacher',
    header: 'Tên giáo viên'
  },
  {
    accessorKey: 'price',
    header: 'Giá khóa học'
  },
  {
    accessorKey: 'student',
    header: 'Số học viên'
  },
  {
    accessorKey: 'startTime',
    header: 'Ngày học'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
