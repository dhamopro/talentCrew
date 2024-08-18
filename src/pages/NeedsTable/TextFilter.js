import React from 'react';


const TextColumnFilter = ({ column: { filterValue, setFilter, preFilteredRows, id } }) => {
    const count = preFilteredRows.length;

    return (
        <input
            value={filterValue || ''} // Controlled input with current filter value
            onChange={e => {
                setFilter(e.target.value || undefined); // Set undefined to remove the filter
            }}
            placeholder={`Search ${count} records...`} // Placeholder text
            style={{ width: '100%' }} // Make it full-width to fit the column
        />
    );
};

export default TextColumnFilter;
