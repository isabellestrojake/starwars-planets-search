import PropTypes from 'prop-types';
import React, { useEffect, useState, useMemo } from 'react';
import Context from './context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
    sorted: false,
  });
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(
        'https://swapi-trybe.herokuapp.com/api/planets/',
      );
      const responseData = await response.json();
      setData(responseData.results);
    };
    fetchApi();
  }, []);
  const contextValue = useMemo(() => ({
    data,
    filters: {
      nameFilter,
      filterByNumericValues,
    },
    order,
    setNameFilter,
    setFilterByNumericValues,
    setOrder,
  }), [data, nameFilter, order, filterByNumericValues]);
  return <Context.Provider value={ contextValue }>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default Provider;
