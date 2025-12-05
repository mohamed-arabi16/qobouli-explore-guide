import * as React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface SEODataTableProps {
  caption: string;
  descriptionId: string;
  headers: string[];
  rows: (string | number)[][];
  className?: string;
}

const SEODataTable: React.FC<SEODataTableProps> = ({
  caption,
  descriptionId,
  headers,
  rows,
  className,
}) => {
  return (
    <>
      <p id={descriptionId} className="sr-only">
        {caption}
      </p>
      <div className={cn(
        "my-6 w-full overflow-x-auto rounded-lg",
        "bg-white/5 backdrop-blur-xl border border-white/10",
        "shadow-lg shadow-black/10",
        className
      )}>
        <Table aria-describedby={descriptionId}>
          <TableCaption className="px-4 py-3 text-center text-sm font-bold text-white/90 bg-primary/20 border-t border-white/10">
            {caption}
          </TableCaption>
          <TableHeader>
            <TableRow className="border-b border-white/10 hover:bg-white/5">
              {headers.map((header, index) => (
                <TableHead key={index} className="font-semibold whitespace-nowrap text-white/95 bg-primary/10">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex} className="whitespace-nowrap text-white/90">
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default SEODataTable;
