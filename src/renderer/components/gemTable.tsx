import React from 'react';
import { useSortBy, useTable } from 'react-table';

interface Props {
    columns: any;
    data: object[];
}

export const GemTable: React.FC<Props> = ({ columns, data }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy);

    return (
        <div className="gem-table">
            <table {...getTableProps()} className="gem-resizable-table">
                <thead>
                    {headerGroups.map((headerGroup, i) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                            {headerGroup.headers.map((column, index) => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    key={index}
                                    className={column.isSorted ? (column.isSortedDesc ? 'sort-desc' : 'sort-asc') : ''}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={i}>
                                {row.cells.map((cell, index) => {
                                    return (
                                        <td {...cell.getCellProps()} key={index}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
