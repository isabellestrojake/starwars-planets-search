import React from 'react';
import './App.css';
import Table from './components/Table';
import NameFilter from './components/NameFilter';
import NumberFilter from './components/NumberFilter';
import FiltersRender from './components/FiltersRender';
import DataSort from './components/DataSort';
import Provider from './context/provider';

function App() {
  return (
    <Provider>
      <NameFilter />
      <NumberFilter />
      <FiltersRender />
      <DataSort />
      <Table />
    </Provider>
  );
}
export default App;
