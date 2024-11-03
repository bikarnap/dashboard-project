import React, { useState } from 'react';
import './PaginatedTable.css';
import utilities from '../utilities';

function PaginatedTable({ data, rowsPerPage = 10}) {
  // const { data, rowsPerPage } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const pagesCount = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = data.slice(startIndex, endIndex);

  const handlePageClick = (event) => {
    setCurrentPage(event.target.id);
  };

  const renderRows = () => {
    return currentRows.map((row, index) => {
      const clock = parseInt(row.clock)
      return (
        <tr key={index}>
          {/* <td>{utilities.convertTimestampToTimeString(Number(row.clock))}</td> */}
          <td>{utilities.convertTimestampToTimeString(clock, false)}</td>
          <td>{row.hostname}</td>
          <td>{row.ip}</td>
          <td>{row.name}</td>
          <td>{row.opdata}</td>
          <td>{row.severity}</td>
        </tr>
      );
    });
  };

  const renderPaginationItems = () => {
    let items = [];

    for (let i = 1; i <= pagesCount; i++) {
      items.push(
        <li
          key={i}
          id={i}
          className={i === currentPage ? 'active' : ''}
          onClick={handlePageClick}
        >
          {i}
        </li>
      );
    }

    return items;
  };
  if (!data) return <div className="center">Loading</div>
  return (
    <div className="paginated-table">
      <table>
        <thead>
          <tr>
            <th>Datetime</th>
            <th>Host</th>
            <th>IP</th>
            <th>Name</th>
            <th>Data</th>
            <th>Severity</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
      {data.length >= rowsPerPage ? (<ul className="pagination">{renderPaginationItems()}</ul>) : null}
      
    </div>
  );
}

export default PaginatedTable;
