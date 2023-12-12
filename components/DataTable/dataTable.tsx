import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';

const PAGE_SIZE = 5;

export default function ResultTable({ searchParams, results, page, setPage }) {

  const [records, setRecords] = useState(results.slice(0, PAGE_SIZE));

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(results.slice(from, to));
  }, [page]);

  return (
    <DataTable
      width={100}
      withTableBorder
      records={records}
      columns={[
        { accessor: 'abbreviation', width: 100 },
        { accessor: 'teamName', width: 100 },
        { accessor: 'simpleName', width: '100%' },
        {
          accessor: 'location',
          textAlign: 'right',
          width: 120,
          render: ({ location }) => location,
        },
      ]}
      totalRecords={results.length}
      recordsPerPage={PAGE_SIZE}
      page={page}
      onPageChange={(p) => setPage(p)}
      // 👇 uncomment the next line to use a custom pagination size
      // paginationSize="md"
      // 👇 uncomment the next line to use a custom loading text
      // loadingText="Loading..."
      // 👇 uncomment the next line to display a custom text when no records were found
      // noRecordsText="No records found"
      // 👇 uncomment the next line to use a custom pagination text
      // paginationText={({ from, to, totalRecords }) => `Records ${from} - ${to} of ${totalRecords}`}
      // 👇 uncomment the next lines to use custom pagination colors
      // paginationActiveBackgroundColor="green"
      // paginationActiveTextColor="#e6e348"
    />
  );
}
