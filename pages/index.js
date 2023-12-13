import React, { useState }  from 'react';
import SearchForm from 'components/SearchForm/searchForm';
import DataTable from 'components/DataTable/dataTable';
import SelectedRows from 'components/SelectedRows/selectedRows';

function MyPage() {
  const [selectedRecords, setSelectedRecords] = useState([])

  const updateFrequency = (id, value) => {
    setSelectedRecords((prev) => {
      return prev.map((item) => item.teamId === id ? ({...item, frequency: value}) : item)
    })
  }
  const removeSelection = (id) => {

    setSelectedRecords((prev) => {
       return prev.filter((item) => item.teamId !== id)
    })
  }

  return (
    <div className="datatable">
      <SearchForm>
        <DataTable setSelectedRecords={setSelectedRecords} selectedRecords={selectedRecords} updateFrequency={updateFrequency} />
      </SearchForm>
      
      <SelectedRows data={selectedRecords} removeSelection={removeSelection} />
    </div>
  );
}

export default MyPage;
