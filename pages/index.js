import React, { useState }  from 'react';
import SearchForm from 'components/SearchForm/searchForm';
import DataTable from 'components/DataTable/dataTable';
import SelectedRows from 'components/SelectedRows/selectedRows';

function MyPage() {
  const [selectedRecords, setSelectedRecords] = useState([])
  const removeSelection = (id) => {

    setSelectedRecords((prev) => {
       return prev.filter((item) => item.teamId !== id)
    })
  }

  return (
    <div>
      <SearchForm>
        <DataTable setSelectedRecords={setSelectedRecords} selectedRecords={selectedRecords} />
      </SearchForm>
      
      <SelectedRows data={selectedRecords} removeSelection={removeSelection} />
    </div>
  );
}

export default MyPage;
