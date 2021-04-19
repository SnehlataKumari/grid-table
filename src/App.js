import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const HeaderComponent = () => <h1>Make ---</h1>;

const App = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000, name: 'Sneh', email: 'snehlata@asdf.com', gender: 'Female' },
    { make: "Ford", model: "Mondeo", price: 32000, name: 'Satish', email: 'satish@asdf.com', gender: 'Male' },
    { make: "Porsche", model: "Boxter", price: 72000, name: 'Nitin', email: 'nitin@asdf.com' , gender: 'Male'}
  ]);

  const onButtonClick = e => {
    const selectedNodes = gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map(node => node.data)
    const selectedDataStringPresentation = selectedData.map(node => `${node.make} ${node.model}`).join(', ')
    alert(`Selected nodes: ${selectedDataStringPresentation}`)
  }


  const [optionalColumns, setOptionsColumns] = useState([
    { key: 'email', field: 'email', headerName: 'Email', filter: false, sortable: true, checkboxSelection: true, rowDrag: false },
    { key: 'name', field: 'name', headerName: 'Name', filter: true, sortable: false },
    { key: 'gender', field: 'gender', headerName: 'Gender', filter: false, sortable: false }
  ]);

  const [visibleColumns, setVisibleColumns] = useState([
    { key: 'make', field: 'make', headerName: 'Make', filter: false, sortable: true, checkboxSelection: true, rowDrag: false },
    { key: 'model', field: 'model', headerName: 'Model', filter: true, sortable: false},
    { key: 'price', field: 'price', headerName: 'Price', filter: false, sortable: false }
  ])

  const defaultColDef = {
    width: 100,
    headerComponentParams: {
      template:
        <div class="ag-cell-label-container" role="presentation">
          <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>
          <div ref="eLabel" class="ag-header-cell-label" role="presentation">
            <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>
            <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>
            <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>
            <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>
            <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>
            <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>
          </div>
        </div>
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <button onClick={onButtonClick}>Get selected rows</button>
      <AgGridReact
        // frameworkComponents={{ agColumnHeader: HeaderComponent }}

        // columnDefs={{
        //   headerComponent: HeaderComponent
        // }}
        rowData={rowData} rowSelection="multiple">

          {
            visibleColumns.map((column) => (
              <AgGridColumn
                {...column}
              />
            ))
          }
        
      </AgGridReact>

      <AgGridReact defaultColDef={defaultColDef}>
        {/* column definitions ... */}
      </AgGridReact>
    </div>
  );
};

export default App;
