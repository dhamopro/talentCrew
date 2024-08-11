// TableComponent.js
import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { fetchData } from '../../services/pocketbaseService';
import PocketBase from 'pocketbase';
import NeedsTable from './NeedsTable';


const TableComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result);
    };

    getData();
  }, []);

  useEffect(() => {
    const fetchRecords = async () => {
      const pb = new PocketBase('https://pb.talentcrew.tekishub.com');
      
      try {
        const resultList = await pb.collection('Requirements').getList(1, 50, {
          sort: '-created',
        });
        setData(resultList.items);
        console.info(data);
        //setLoading(false);
      } catch (err) {
        //setError(err.message);
        //setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'Name',
      },
      {
        Header: 'Type',
        accessor: 'Type',
      },
      {
        Header: 'Count',
        accessor: 'Count',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} style={{ border: '1px solid black', padding: '8px' }}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} style={{ border: '1px solid black', padding: '8px' }}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  <NeedsTable/>
};

export default TableComponent;
