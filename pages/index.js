import React, { useState } from 'react';
import SearchForm from 'components/SearchForm/searchForm';
import DataTable from 'components/DataTable/dataTable';
import SelectedRows from 'components/SelectedRows/selectedRows';
import { useForm } from '@mantine/form';

function MyPage() {
  const [selectedRecords, setSelectedRecords] = useState([]);

  const form = useForm();
  const updateFrequency = (id, value) => {
    setSelectedRecords((prev) => {
      return prev.map((item) => (item.teamId === id ? { ...item, frequency: value } : item));
    });
  };
  const removeSelection = (id) => {
    setSelectedRecords((prev) => {
      return prev.filter((item) => item.teamId !== id);
    });
  };

  const completeSelectedRecords = selectedRecords.map((item) => {
    return {
      ...item,
      adv: form.values[`adv-${item.teamId}`],
      frequency: form.values[`frequency-${item.teamId}`],
      for: form.values[`for-${item.teamId}`],
    };
  });

  return (
    <div className="datatable">
      <SearchForm>
        <DataTable
          setSelectedRecords={setSelectedRecords}
          selectedRecords={selectedRecords}
          updateFrequency={updateFrequency}
          form={form}
        />
      </SearchForm>

      <SelectedRows data={completeSelectedRecords} removeSelection={removeSelection} />
    </div>
  );
}

export default MyPage;
