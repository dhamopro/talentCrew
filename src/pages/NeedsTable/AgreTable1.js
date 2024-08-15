import React, { useEffect, useRef, useState,forwardRef, useMemo } from 'react';
import PopupExample from './PopUpExample';
import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy } from 'react-table';
import SearchIcon from '@mui/icons-material/Search';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { FaSort } from "react-icons/fa"
import PocketBase from 'pocketbase';
import Avatar from '@mui/material/Avatar';

const CandidateTable1 = ({ handleSelectedCand, handlePopupValue},popUpRef) => {
  const handleEditorCreate = (editorData) => {
    console.log('Editor Data in CandidateTable:', editorData);
  };



  // Define a method to pass handlePopupValue to PopupExample
  const handlePopupCallback = (value) => {
    handlePopupValue(value);

  };

  const [needList, setNeedList] = []//useSelector((state) => state.need.data);

  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    const fetchRecords = async () => {
      const pb = new PocketBase('https://pb.talentcrew.tekishub.com');
      
      try {
        const resultList = await pb.collection('Candidate').getList(1, 50, {
          sort: '-created',
        });
        setFilteredData(resultList.items);
        //setLoading(false);
      } catch (err) {
        //setError(err.message);
        //setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const data =useMemo(() => filteredData,[filteredData, needList])





  const COLUMNS = [
    { Header: 'First Name', accessor: 'first_name', width: 250 },
    { Header: 'Last Name', accessor: 'last_name'  },
    { Header: 'Phone', accessor: 'phone'},
    { Header: 'Email', accessor: 'email' }, 
    { Header: 'Curr.CTC', accessor: 'current_ctc' }, 
    { Header: 'Exp.CTC', accessor: 'expected_ctc' }, 
    { Header: 'NoticePeriod', accessor: 'notice_period' },
    { Header: 'Rel.Exp', accessor: 'rel_exp' }, 
    { Header: 'Preferred Job', accessor: 'preffered_job' },
    
    { Header: 'Created', accessor: 'created'}

  ]
  const columns = useMemo(() => COLUMNS, []);



  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    setFilter,
    } = useTable ({
    columns,
    data
    },
  useFilters, useGlobalFilter, useSortBy, usePagination)

  const [rowData, setRowData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const { globalFilter, pageIndex, pageSize } = state;  

  const handleRowClick = (rowData) => {
    setRowData(rowData);
    setShowPopup(!showPopup);
  };

  return (
    <div>
      
      {/* Other candidate table code */}

      <div className="wrapTable">
      
      {/*<div className="needBar">
        {/* Tabs 
        <div className="needMenu">
          <div className={`tabNeed ${activeTab === 'all' ? 'activeNTab' : ''}`} onClick={() => handleTabClick('all')}>All</div>
          <div className={`tabNeed ${activeTab === 'approved' ? 'activeNTab' : ''}`} onClick={() => handleTabClick('approved')}>Approved</div>
          <div className={`tabNeed ${activeTab === 'requested' ? 'activeNTab' : ''}`} onClick={() => handleTabClick('requested')}>Requested</div>
        </div>
        {/* Raise Need Button 
        <button onClick={gotoRaiseNeed}>Raise Need</button>
       
      </div>*/}
      

      {/* Header on top of table: stats and filters */}
      <div className="topBarNeedTable">
        {/*Counts*/}
        <div className="leftTopBarNeedTable">
          <div className="needCount">
            <i><PeopleAltIcon /></i>
            <span>{filteredData.length}</span>
            <label>Candidates</label>
          </div>
          <div className="volunteerCount">
            <i><StickyNote2Icon /></i>
            <span> </span>
            <label>Requirement</label>
          </div>
          <PopupExample handlePopupCallback={handlePopupCallback} ref={popUpRef}/>

          {/*<PopupExample handlePopupCallback={handlePopupCallback} />*/}
          {/*<AggregateComp1 handleMode={handleMode} />*/}
          
        </div>
        {/*Filters*/}
        <div className="rightTopBarNeedTable">
          {/* Following are filters on need table */}
          <div className="boxSearchNeeds">
            <i><SearchIcon style={{height:'18px',width:'18px'}}/></i>
            <input type="search" name="globalfilter" placeholder="Search" value={globalFilter || ''} onChange={(e) => setGlobalFilter(e.target.value)}></input>
          </div>
          {/*
          <div className="selectNeedDate">
            <input type="date" name="selectedDate" value={selectedDate} onChange={handleDateChange} />
          </div>
          */}
  
        </div>
      </div>

      {/* Following is TABLE that loads list of needs and its details */}
      <table className="tableNeedList">
        <thead>
            {headerGroups.map((headerGroup)=>(
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column)=>(
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                            <span>
                              <FaSort />
                            </span>
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {page.map((row) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()} onClick={() => handleRowClick(row.original)} >
                        {row.cells.map((cell)=>{
                            return <td {...cell.getCellProps()} style={{ width: cell.column.width }}> {cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
        </tbody>
      </table>
      <div className="pageNav">
        <div className="needsPerPage">
          <span>Rows per page:</span>
          <select value={pageSize} onChange={(e)=>setPageSize(Number(e.target.value))}>
            {[10, 15, 25].map((pageSize) => (
              <option key={pageSize} value={pageSize}>{pageSize}</option>
            ))}
          </select>
        </div>
        <span>
          Go to
            <input type="number" defaultValue={pageIndex+1}
            onChange={e => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
            style={{width:'50px'}}
            />
          page
        </span>

        <div className="pageNumber">
        <button onClick={()=>previousPage()} disabled={!canPreviousPage}> <ArrowBackIosIcon style={{height:"18px"}}/></button>
        <span> Page
          <strong>
              {pageIndex + 1} 
          </strong>
          of {pageOptions.length}
        </span>
        <button onClick={()=>nextPage()} disabled={!canNextPage}><ArrowForwardIosIcon style={{height:"18px"}}/></button>
        </div>
      </div>

      {/* Open nominations and need info page as popup */}
    </div>

    </div>
  );
};

export default CandidateTable1;
