import { DataTable } from 'mantine-datatable';

const PAGE_SIZE = 5;

// @ts-ignore
export default function ResultTable({ results, page, setPage, totalRecords, selectedRecords, setSelectedRecords }) {
  return (
    <DataTable
      style={{ width: '100%' }}
      withTableBorder
      records={results}
      columns={[
        { accessor: 'teamId', width: '100%' },
        { accessor: 'abbreviation', width: 100 },
        { accessor: 'simpleName', width: '100%' },
        { accessor: 'duplicated', width: '100%' },
        {
          accessor: 'location',
          render: ({ location }) => location,
        },
      ]}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
      totalRecords={totalRecords}
      recordsPerPage={PAGE_SIZE}
      page={page}
      idAccessor="teamId"
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
