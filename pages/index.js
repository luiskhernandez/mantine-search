import React  from 'react';
import SearchForm from 'components/SearchForm/searchForm';
import DataTable from 'components/DataTable/dataTable';



function MyPage() {
  return (
    <div>
      <SearchForm>
        <DataTable />
      </SearchForm>

    </div>
  );
}

export default MyPage;
