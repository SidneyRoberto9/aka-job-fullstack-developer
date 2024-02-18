'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { DateRange } from 'react-day-picker';
import { useState, useEffect } from 'react';
import { Search, ListRestart, Calendar as CalendarIcon } from 'lucide-react';
import dayjs from 'dayjs';
import { format, addDays } from 'date-fns';

import {
  useReactTable,
  getPaginationRowModel,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { api } from '@/lib/axios';
import { columns } from '@/data/table-columns';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { FormField } from '@/components/FormField';
import {
  TableRow,
  TableHeader,
  TableHead,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table';
import { PopoverTrigger, PopoverContent, Popover } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { ExchangeRateList } from '@/@Types/exchange-rate';

interface DataTableProps {
  token: string;
}

interface filterDate {
  from: Date;
  to: Date;
  hour: number;
  minute: number;
}

const filterSchema = z.object({
  from: z.date(),
  to: z.date(),
  hour: z
    .string()
    .transform(Number)
    .refine((n) => n >= 0 && n <= 23, {
      message: 'Hour must be between 0 and 23',
    }),
  minute: z
    .string()
    .transform(Number)
    .refine((n) => n >= 0 && n <= 59, {
      message: 'Hour must be between 0 and 59',
    }),
});

async function getData(pageIndex: number, token: string, filterDate: DateRange) {
  const { data } = await api.post(
    '/exchange-rate',
    {
      page: pageIndex,
      from: filterDate.from,
      to: filterDate.to,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data as ExchangeRateList;
}

export function DataTable({ token }: DataTableProps) {
  const [pageIndex, setPageIndex] = useState(1);
  const [filterDate, setFilterDate] = useState<DateRange>({} as DateRange);
  const [date, setDate] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [content, setContent] = useState<ExchangeRateList>({
    total: 0,
    hasNext: false,
    data: [],
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      from: date.from!,
      to: date.to!,
      hour: 1,
      minute: 1,
    },
  });

  const { data, isLoading } = useQuery<ExchangeRateList>({
    queryKey: ['exchange-list', pageIndex, filterDate.from, filterDate.to],
    queryFn: () => getData(pageIndex, token, filterDate),
    gcTime: 1000 * 60 * 1,
    initialData: {} as ExchangeRateList,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const table = useReactTable({
    data: content.data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const onSubmit = (data: filterDate) => {
    setFilterDate({
      from: dayjs(data.from)
        .set('hour', data.hour - 1)
        .set('minute', data.minute - 1)
        .toDate(),
      to: dayjs(data.to)
        .set('hour', data.hour - 1)
        .set('minute', data.minute - 1)
        .toDate(),
    });
    setPageIndex(1);
    table.resetPageIndex();
  };

  const handleClearFilter = () => {
    setValue('from', new Date());
    setValue('to', new Date());
    setValue('hour', 1);
    setValue('minute', 1);
    setDate({ from: new Date(), to: new Date() });
    setFilterDate({} as DateRange);
    setPageIndex(1);
    table.resetPageIndex();
  };

  const handleNextPage = () => {
    setPageIndex((prev) => prev + 1);
    table.nextPage();
  };

  const handlePreviousPage = () => {
    setPageIndex((prev) => prev - 1);
    table.previousPage();
  };

  useEffect(() => setContent(data), [data]);

  return (
    <div className="w-full px-4 bg-white/30 rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 py-4 ">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              size="lg"
              variant={'outline'}
              className={cn(
                'w-[300px] justify-start text-left font-normal mb-6',
                !date && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(e) => {
                const { from, to } = e as DateRange;
                setValue('from', from!);
                setValue('to', to!);
                setDate(e as DateRange);
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <div className="flex items-center gap-2 w-[450px]">
          <FormField errorName={errors.hour} errorMessage={errors.hour?.message}>
            <Input type="number" defaultValue={1} placeholder="Hour" {...register('hour')} />
          </FormField>
          <span className="mb-6">:</span>
          <FormField errorName={errors.minute} errorMessage={errors.minute?.message}>
            <Input type="number" defaultValue={1} placeholder="Minutes" {...register('minute')} />
          </FormField>
        </div>
        <Button
          type="button"
          variant={'outline'}
          onClick={handleClearFilter}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <ListRestart size={16} />
          Reset
        </Button>
        <Button type="submit" className="flex items-center justify-center gap-2 mb-6">
          <Search size={16} />
          Search
        </Button>
      </form>
      <div className="rounded-md border h-[575px]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {pageIndex} of {Math.ceil(content.total / 10)} row(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="select-none"
            onClick={() => handlePreviousPage()}
            disabled={pageIndex == 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="select-none"
            onClick={() => handleNextPage()}
            disabled={data.hasNext == false}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
