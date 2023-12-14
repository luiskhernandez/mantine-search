// @ts-nocheck
import { DataTable } from 'mantine-datatable';
import { Checkbox, Container, Flex, Select, NumberInput } from '@mantine/core';

const PAGE_SIZES = [5, 10, 15, 20];

export default function ResultTable({
  fetching = false,
  results,
  page,
  setPage,
  totalRecords,
  selectedRecords,
  setSelectedRecords,
  pageSize = 5,
  setPageSize,
  form,
}) {
  return (
    <DataTable
      style={{ width: '100%' }}
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
          render: (row) => (
            <Select
              label="Option"
              data={['A', 'B', 'C', 'D', 'E']}
              placeholder="Select"
              className="js-add-to-iv"
              {...form.getInputProps(`frequency-${row.teamId}`)}
            />
          ),
        },
        {
          accessor: 'add to iv?',
          render: (row) => {
            const checked = form.values[`adv-${row.teamId}`];
            return (
              <Container w={200} className="js-add-to-iv">
                <Flex gap={8} align="center">
                  <Checkbox
                    {...form.getInputProps(`adv-${row.teamId}`)}
                  />
                  {checked && (
                    <NumberInput
                      width={30}
                      variant="filled"
                      {...form.getInputProps(`for-${row.teamId}`)}
                    />
                  )}
                </Flex>
              </Container>
            );
          },
        },
      ]}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
      totalRecords={totalRecords}
      recordsPerPage={pageSize}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
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
