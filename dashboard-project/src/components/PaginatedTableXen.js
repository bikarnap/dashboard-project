import React, { useState } from 'react';
import './PaginatedTable.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindows } from '@fortawesome/free-brands-svg-icons';

import OsLogo from './OsLogo';


function PaginatedTableXen({ data, rowsPerPage = 10}) {
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
      let ip_addresses = []
      if (row.ip_addresses) {
        ip_addresses = Object.values(row.ip_addresses)
       
      }
      return (
        <tr key={index}>
          <td><OsLogo vm={row} /> {row.name_label}</td>
          {/* <td> <ul>{ip_addresses ? ip_addresses.map((ip, index) => <li key={index}>{ip}</li>) : null}</ul></td> */}
          <td>{row.power_state}</td>
          <td>{row.uuid}</td>
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
            <th>Name</th>
            {/* <th>IP</th> */}
            <th>Power state</th>
            <th>UUID</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
      {data.length >= rowsPerPage ? (<ul className="pagination">{renderPaginationItems()}</ul>) : null}
      
    </div>
  );
}

export default PaginatedTableXen;
