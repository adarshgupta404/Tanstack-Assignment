import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { Database, Download, FileSpreadsheet, FileText } from "lucide-react";
import * as XLSX from "xlsx";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ExportImport<TData, TValue>({
  columns,
  data = [],
}: DataTableProps<TData, TValue>) {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "export.xlsx");
  };

  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    downloadFile(csv, "export.csv", "text/csv;charset=utf-8;");
  };

  const exportToJSON = () => {
    const json = JSON.stringify(data, null, 2);
    downloadFile(json, "export.json", "application/json");
  };

  const downloadFile = (content: string, fileName: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-0 shadow-sm"
          >
            <Download className="h-4 w-4" />
            Export/Import
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Export Data</DropdownMenuLabel>
          <DropdownMenuItem onClick={exportToExcel}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export to Excel
          </DropdownMenuItem>
          <DropdownMenuItem onClick={exportToCSV}>
            <FileText className="mr-2 h-4 w-4" />
            Export to CSV
          </DropdownMenuItem>
          <DropdownMenuItem onClick={exportToJSON}>
            <Database className="mr-2 h-4 w-4" />
            Export to JSON
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
