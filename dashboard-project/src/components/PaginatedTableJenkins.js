import React, { useState } from 'react';
import './PaginatedTable.css';
import utilities from '../utilities';

// import buildLastSuccess from '../resources/images/jenkins/build_success_last.png'
// import buildLastFail from '../resources/images/jenkins/build_fail_last.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';

function PaginatedTableJenkins({ data, rowsPerPage = 10}) {
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
      return (
        <tr key={index}>
          <td>{utilities.convertTimestampToTimeString(Number(row.timestamp), true)}</td>
          {/* <td>{row.duration >= 1000 ? `${(row.duration / 1000).toFixed(2)} s` : `${row.duration} ms`}</td> */}
          <td>{utilities.parseTime(row.duration)}</td>
          <td>{utilities.getJobNameFromBuildUrl(row.url)}</td>
          {/* <td className={row.result === 'SUCCESS' ? 'buildSuccess' : 'buildFail'}>{row.result}</td> */}
          {/* <td><img className="jenkins-build-result-image" src={row.result === 'SUCCESS' ? buildLastSuccess : buildLastFail} alt="build result" /></td> */}
          <td>{row.result === 'SUCCESS' 
            ? <FontAwesomeIcon icon={faCircleCheck} style={{color: "#1dd359",}} />
            : <FontAwesomeIcon icon={faCircleXmark} style={{color: "#bd0909",}} />}</td>
          <td>{row.builtOn ? row.builtOn : 'Built-In Node'}</td>
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

  return (
    <div className="paginated-table">
      <table>
        <thead>
          <tr>
            <th>Datetime</th>
            <th>Duration</th>
            <th>Job name</th>
            <th>Result</th>
            <th>Built on</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
      {data.length >= rowsPerPage ? (<ul className="pagination">{renderPaginationItems()}</ul>) : null}
    </div>
  );
}

export default PaginatedTableJenkins;
