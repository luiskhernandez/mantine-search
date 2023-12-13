// @ts-nocheck
import { DataTable } from 'mantine-datatable';
import { Checkbox, Container, Flex, Input, Select } from '@mantine/core';
import { useState } from 'react';

const PAGE_SIZE = 5;

export default function ResultTable({
  fetching = false,
  results,
  page,
  setPage,
  totalRecords,
  selectedRecords,
  setSelectedRecords,
}) {
  return (
    <DataTable
      style={{ width: '100%' }}
      withTableBorder
      records={results}
      minHeight={180}
      columns={[
        { accessor: 'teamId', width: '100%' },
        { accessor: 'abbreviation', width: 100 },
        { accessor: 'simpleName', width: '100%' },
        { accessor: 'duplicated', width: '100%' },
        {
          accessor: 'location',
          render: ({ location }) => location,
        },
        {
          accessor: 'frequency',
          render: (row) => (<Select
            style={{ flex: '1 1 0%;' }}
            label="Option"
            value={row.frequency}
            data={['A', 'B', 'C', 'D', 'E']}
            placeholder="Select"
            onChange={(value) => {
               console.log('cambiar a ', value, row);
              }}
          />),
        },
        {
          accessor: 'add to iv?',
          render: (row) => {
            const [state, setState] = useState(false);
            return (
            <Container w={300}>
              <Flex gap={8} align="center">
                <Checkbox value={state} onChange={() => { setState(!state); }} />
                {state && <Input onChange={(value) => {
               console.log('cambiar a ', value, row);
              }}
                />}
              </Flex>
            </Container>
          );
          },
        },
      ]}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
      totalRecords={totalRecords}
      recordsPerPage={PAGE_SIZE}
      page={page}
      fetching={fetching}
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
