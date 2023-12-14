import React, { useState } from 'react';
import SearchForm from 'components/SearchForm/searchForm';
import DataTable from 'components/DataTable/dataTable';
import SelectedRows from 'components/SelectedRows/selectedRows';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import { fakeAjaxRequest } from 'helpers/utils';
import { useQuery } from '@tanstack/react-query';

const initialValues = {
  option: null,
  abbreviation: null,
  duplicated: null,
  simpleName: '',
  location: '',
};

function MyPage() {
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const dynamicForm = useForm();

  const form = useForm({
    initialValues,
  });

  const [debouncedValues] = useDebouncedValue(form.values, 500);

  const { isPending, isError, error, data } = useQuery({
    queryKey: ['items', page, pageSize, { ...debouncedValues }],
    queryFn: () => fakeAjaxRequest('/fake-url', page, pageSize, form.values),
  });

  const resetRow = (id) => {
    dynamicForm.setFieldValue(`adv-${id}`, false);
    dynamicForm.setFieldValue(`for-${id}`, 0);
    dynamicForm.setFieldValue(`frequency-${id}`, null);
  }
  const removeSelection = (id) => {
    resetRow(id)
    setSelectedRecords((prev) => {
      return prev.filter((item) => item.teamId !== id);
    });
  };

  const completeSelectedRecords = selectedRecords.map((item) => {
    return {
      ...item,
      adv: dynamicForm.values[`adv-${item.teamId}`],
      frequency: dynamicForm.values[`frequency-${item.teamId}`],
      for: dynamicForm.values[`for-${item.teamId}`],
    };
  });

  const handleReset = () => {
    form.reset();
    setPage(1);
  };

  return (
    <div className="datatable">
      <SearchForm form={form} onReset={handleReset} />
      {isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <DataTable
          form={dynamicForm}
          fetching={isPending}
          results={data && data.results}
          totalRecords={data && data.totalRecords}

          setSelectedRecords={setSelectedRecords}
          selectedRecords={selectedRecords}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      )}

      <SelectedRows
        data={completeSelectedRecords}
        removeSelection={removeSelection}
      />
    </div>
  );
}

export default MyPage;
