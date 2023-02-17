import { InputHTMLAttributes, useEffect, useState } from "react";
import {
    CFormSelect,
    CPagination,
    CPaginationItem,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    useReactTable,
    ColumnFiltersState,
} from "@tanstack/react-table";
import React from "react";
import { fuzzyFilter } from "../utils/tableUtil";

// A debounced input react component
function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <input
            {...props}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}

export function DataTable({ data, columns, pageName, showSearch }: any) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            columnFilters,
            globalFilter,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,

        // Pipeline
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="p-2">
            {showSearch === "true" && (
                <DebouncedInput
                    value={globalFilter ?? ""}
                    onChange={(value) => setGlobalFilter(String(value))}
                    className="form-control mb-3 p-2 font-lg rounded-0 border border-block"
                    placeholder="Search all fields..."
                />
            )}
            <CTable
                small
                responsive
                hover
                bordered
                className="text-center caption-top"
            >
                <caption className="whitespace">{pageName}</caption>
                <CTableHead color="light">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <CTableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <CTableHeaderCell key={header.id}>
                                    <>
                                        {header.isPlaceholder ? null : (
                                            <>
                                                <div
                                                    {...{
                                                        className: header.column.getCanSort()
                                                            ? "cursor-pointer select-none"
                                                            : "",
                                                        onClick: header.column.getToggleSortingHandler(),
                                                    }}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        asc: " 🔼",
                                                        desc: " 🔽",
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                            </>
                                        )}
                                    </>
                                </CTableHeaderCell>
                            ))}
                        </CTableRow>
                    ))}
                </CTableHead>
                <CTableBody>
                    {table.getRowModel().rows.map((row) => (
                        <CTableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <CTableDataCell key={cell.id} className={cell.id.split("_")[1]}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </CTableDataCell>
                            ))}
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
            {table.getPageCount() > 1 && (
                <div className="w-100 d-flex justify-content-between gap-2">
                    <CPagination role={"button"}>
                        <CPaginationItem
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {"<<"}
                        </CPaginationItem>
                        <CPaginationItem
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {"<"}
                        </CPaginationItem>
                        <CPaginationItem
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            {/* &rsaquo; */}
                            {">"}
                        </CPaginationItem>
                        <CPaginationItem
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            {">>"}
                        </CPaginationItem>
                    </CPagination>
                    <div>
                        Page
                        <strong>
                            {" "}
                            {table.getState().pagination.pageIndex + 1} of{" "}
                            {table.getPageCount()}{" "}
                        </strong>
                        <span className="flex items-center gap-1">
                            | Go to page:
                            <input
                                type="number"
                                defaultValue={
                                    table.getState().pagination.pageIndex + 1
                                }
                                value={table.getState().pagination.pageIndex + 1}
                                onChange={(e) => {
                                    let page = e.target.value ? Number(e.target.value) - 1 : 0;
                                    if (Number(e.target.value) <= 0) {
                                        table.setPageIndex(0);
                                        console.log(e.target.value);
                                    }
                                    else if (Number(e.target.value) > table.getPageCount()) {
                                        table.setPageIndex(table.getPageCount() - 1);
                                    }
                                    else {
                                        table.setPageIndex(page);
                                    }
                                }}
                                className="border p-1 rounded w-16"
                            />
                        </span>
                    </div>
                    <CFormSelect
                        style={{ width: "unset" }}
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </CFormSelect>
                </div>
            )}
        </div>
    );
}
