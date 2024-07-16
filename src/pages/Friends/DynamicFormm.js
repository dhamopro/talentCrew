import React from 'react';

const DynamicFormm = ({ data, numColumns }) => {
    console.log(data);
    console.log(numColumns);
  return (
    <div>
      <form>
        <table>
          <tbody>
            <tr>
              {data.map((column, index) => (
                
                <React.Fragment key={index}>
                  {(index % 2 === 0) && <p>KK</p>}
                  <td>{renderColumn(column)}</td>
                 
                </React.Fragment>
              ))}
              {/* Adding empty columns if necessary */}
             {/*} {Array(numColumns - data.length).fill(null).map((_, index) => (
                <td key={data.length + index}>&nbsp;</td>
              ))} */}
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

const renderColumn = (column) => {
  switch (column.iFeildDataType) {
    case 1:
      return ( <div><label htmlFor={column.sFeildName}>{column.sFeildDisplayName}</label>
                <input type="text" /></div>);
    case 2:
      return (
        <div><label htmlFor={column.sFeildName}>{column.sFeildDisplayName}</label>
        <select>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        </div>
      );
    case 3:
      return <textarea />;
    case 5:
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
  }
};

export default DynamicFormm
