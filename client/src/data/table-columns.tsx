import dayjs from 'dayjs';

import { ColumnDef } from '@tanstack/react-table';
import { ExchangeRate } from '@/@Types/exchange-rate';

export const columns: ColumnDef<ExchangeRate>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Data e Hora',
    cell: ({ row }) => (
      <div className="capitalize">
        {dayjs(row.getValue('createdAt')).format('DD/MM/YYYY HH:mm')}
      </div>
    ),
  },
  {
    accessorKey: 'ask',
    header: 'Valor de Venda',
    cell: ({ row }) => {
      const value: number = row.getValue('ask');
      const formattedValue = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

      return formattedValue;
    },
  },
  {
    accessorKey: 'bid',
    header: 'Valor de Compra',
    cell: ({ row }) => {
      const value: number = row.getValue('bid');
      const formattedValue = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

      return formattedValue;
    },
  },
];
