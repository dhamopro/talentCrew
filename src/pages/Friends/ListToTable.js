import React from 'react';

const ListToTable = ({ data, numColumns }) => {
  const numRows = Math.ceil(data.length / numColumns); // Calculate number of rows based on number of columns

  // Divide the data into arrays for each column
  const columnsData = Array.from({ length: numColumns }, (_, columnIndex) =>
    data.slice(columnIndex * numRows, (columnIndex + 1) * numRows)
  );

  return (
    <table>
      <tbody>
        {Array.from({ length: numRows }, (_, rowIndex) => (
          <tr key={rowIndex}>
            {columnsData.map((column, columnIndex) => (
              <td key={columnIndex}>{renderColumn(column[rowIndex])}</td>  
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};



const renderColumn = (column) => {
    if(column!== undefined && column!== 'undefined'){
    switch (column.iFeildDataType) {
      case 1:
        return ( <div><label htmlFor={column.sFeildName}>{column.sFeildDisplayName}</label>
                  <input type="text" /></div>);
      case 5:
        return (
          <div><label htmlFor={column.sFeildName}>{column.sFeildDisplayName}</label>
          <select>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          </div>
        );
      case 31:
        return <textarea />;
      case 51:
        return (
          <div>
            <label htmlFor={column.sFeildName}>{column.sFeildDisplayName}</label>  
            <input type="radio" name="radioGroup" value="option1" /> Option 1
            <input type="radio" name="radioGroup" value="option2" /> Option 2
          </div>
        );
      default:
        return ( <div><label htmlFor={column.sFeildName}>{column.sFeildDisplayName}</label>
        <input type="text" /></div>);
    }}
  };

export default ListToTable;
