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
import TextColumnFilter from './TextFilter'; // Import the TextColumnFilter

import Avatar from '@mui/material/Avatar';

const CandidateTable1 = ({ handleSelectedCand, handlePopupValue}) => {
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


    const fetchAllCandidatesAndSkills = async () => {
      try {
        const pb = new PocketBase('https://pb.talentcrew.tekishub.com');
        
        // Fetch all candidates
        const candidatesResult = await pb.collection('Candidate').getList(1, 50, {
          sort: '-created',
        });

        // Fetch skills for all candidates
        const candidatesWithSkills = await Promise.all(
          candidatesResult.items.map(async (candidate) => {
            const skillsResult = await pb.collection('CandidateSkilsets').getList(1,50,{
              //filter: `candidate="${candidate.id}"`,
              filter: `candidate="ozsb7i4egwe45nq"`,
              
             // expand: 'skill_details' // Assuming there's a relation to a skill details collection
            });
            return { ...candidate, skills: skillsResult.items };
            console.log(candidate);
          })
        );

        //setCandidates(candidatesWithSkills);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    //fetchAllCandidatesAndSkills();


  }, []);


  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
  }, []);

  const data =useMemo(() => filteredData,[filteredData, needList])





  const COLUMNS = [
    {  id: 'first_name', Header: 'First Name', accessor: 'first_name', width: 250 ,canFilter: true, Filter: TextColumnFilter },
    {  id: 'last_name', Header: 'Last Name', accessor: 'last_name' ,canFilter: true,  Filter: TextColumnFilter },
    {  id: 'phone', Header: 'Phone', accessor: 'phone',canFilter: false, Filter: TextColumnFilter },
    {  id: 'email', Header: 'Email', accessor: 'email',canFilter: true, Filter: TextColumnFilter  }, 
    {  id: 'current_ctc', Header: 'Curr.CTC', accessor: 'current_ctc',canFilter: false,  Filter: TextColumnFilter  }, 
    {  id: 'expected_ctc', Header: 'Exp.CTC', accessor: 'expected_ctc',canFilter: false, Filter: TextColumnFilter  }, 
    {  id: 'notice_period', Header: 'NoticePeriod', accessor: 'notice_period',canFilter: false, Filter: TextColumnFilter  },
    {  id: 'rel_exp', Header: 'Rel.Exp', accessor: 'rel_exp',canFilter: false, Filter: TextColumnFilter }, 
    {  id: 'preffered_job', Header: 'Preferred Job', accessor: 'preffered_job',canFilter: false, Filter: TextColumnFilter  },
    
    { id: 'date', Header: 'Created', accessor: 'created',canFilter: false, Filter: TextColumnFilter }

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
    setAllFilters,
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

  const clearAllFilters = () => {
    setAllFilters([]);  // Clears all filters by setting an empty array
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
          <PopupExample handlePopupCallback={handlePopupCallback}/>

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
          <button onClick={clearAllFilters}>Clear All Filters</button>
        </div>
      </div>

      {/* Following is TABLE that loads list of needs and its details */}
      <table className="tableNeedList">
        <thead>
            {headerGroups.map((headerGroup)=>(
              <React.Fragment key={headerGroup.id}>
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
                <tr>
                {headerGroup.headers.map((column) => (
                    <th key={`${column.id}-filter`}>
                        {column.canFilter ? column.render('Filter') : null}
                    </th>
                ))}
            </tr>
            </React.Fragment>
                
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
