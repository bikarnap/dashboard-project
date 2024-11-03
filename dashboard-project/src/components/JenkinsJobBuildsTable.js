import React, { useEffect, useState, useCallback, useMemo } from 'react';
import jenkinsService from '../services/jenkins';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Ensure correct path
import { debounce } from 'lodash';
import SkeletonJenkinsJobBuildsTable from './SkeletonJenkinsJobBuildsTable';

const ITEMS_PER_PAGE = 20; // Number of items per page
const MAX_STORAGE_SIZE = 5000000; // Example limit: 5MB

const JenkinsJobBuildsTable = () => {
  const [jobs, setJobs] = useState([]); // Array to hold job options for dropdown
  const [selectedJob, setSelectedJob] = useState(null); // Selected job object
  const [allBuilds, setAllBuilds] = useState(() => {
    const storedBuilds = localStorage.getItem('buildRecords');
    return storedBuilds ? JSON.parse(storedBuilds) : [];
  }); // Array to hold all builds
  const [displayBuilds, setDisplayBuilds] = useState([]); // Builds to display based on pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [statusFilter, setStatusFilter] = useState(null); // Selected build status filter
  const [startDate, setStartDate] = useState(null); // Start date for filtering
  const [endDate, setEndDate] = useState(null); // End date for filtering
  const [filtersVisible, setFiltersVisible] = useState(false); // Filter visibility state
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' }); // Sorting config

  const loadBuilds = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const builds = selectedJob
        ? await jenkinsService.getBuilds(selectedJob.value)
        : await jenkinsService.fetchAllBuilds();

      let filteredBuilds = builds;

      // Filter by status
      if (statusFilter) {
        filteredBuilds = filteredBuilds.filter(build => build.result === statusFilter);
      }

      // Filter by date range
      if (startDate || endDate) {
        filteredBuilds = filteredBuilds.filter(build => {
          const buildDate = new Date(build.timestamp);
          return (!startDate || buildDate >= new Date(startDate)) && (!endDate || buildDate <= new Date(endDate));
        });
      }

      // Sort builds
      filteredBuilds.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });

      // Handle large data sizes
      if (JSON.stringify(filteredBuilds).length < MAX_STORAGE_SIZE) {
        localStorage.setItem('buildRecords', JSON.stringify(filteredBuilds));
      }
      setAllBuilds(filteredBuilds);

    } catch (err) {
      setError('Failed to load builds');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedJob, statusFilter, startDate, endDate, sortConfig]);

  // Debounce the loadBuilds function to prevent frequent calls
  const debouncedLoadBuilds = useCallback(debounce(loadBuilds, 300), [loadBuilds]);

  useEffect(() => {
    debouncedLoadBuilds();
  }, [debouncedLoadBuilds]);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const allJobs = await jenkinsService.getJobs();
        const jobOptions = allJobs.map((job) => ({ label: job.name, value: job.name }));
        setJobs(jobOptions);
      } catch (err) {
        setError('Failed to load jobs');
        console.error(err);
      }
    };

    loadJobs();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedBuilds = allBuilds.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    setDisplayBuilds(paginatedBuilds);
    setTotalPages(Math.ceil(allBuilds.length / ITEMS_PER_PAGE));
  }, [allBuilds, currentPage]);

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === 'next' && currentPage < totalPages) {
        return prevPage + 1;
      }
      if (direction === 'prev' && currentPage > 1) {
        return prevPage - 1;
      }
      return prevPage;
    });
  };

  const handleJobChange = async (selectedOption) => {
    setSelectedJob(selectedOption);
    setCurrentPage(1); // Reset to page 1 when changing job
  };

  const handleSort = (key) => {
    const direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const toggleFilters = () => {
    setFiltersVisible(prev => !prev);
  };

  const renderPagination = useMemo(() => {
    const totalPages = Math.ceil(allBuilds.length / ITEMS_PER_PAGE);
    const visiblePageCount = 5; // Number of page buttons to display
    const pageNumbers = [];
    let startPage, endPage;

    if (totalPages <= visiblePageCount) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= Math.ceil(visiblePageCount / 2)) {
        startPage = 1;
        endPage = visiblePageCount;
      } else if (currentPage + Math.floor(visiblePageCount / 2) >= totalPages) {
        startPage = totalPages - visiblePageCount + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(visiblePageCount / 2);
        endPage = currentPage + Math.floor(visiblePageCount / 2);
      }

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) pageNumbers.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    return (
      <div className="pagination">
        {pageNumbers.map((page, index) =>
          page === '...' ? (
            <span key={index} className="ellipsis">...</span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </button>
          )
        )}
      </div>
    );
  }, [allBuilds.length, currentPage, ITEMS_PER_PAGE]);

  return (
    <div>
      <h3>Jenkins Build Details</h3>
      <button onClick={toggleFilters}>
        {filtersVisible ? 'Hide Filters' : 'Show Filters'}
      </button>
      {filtersVisible && (
        <>
          <Select
            options={jobs}
            onChange={handleJobChange}
            value={selectedJob}
            placeholder="Select a job to filter..."
            isSearchable
            isClearable
          />
          <div>
            <label>Build Status: </label>
            <Select
              options={[
                { label: 'Success', value: 'SUCCESS' },
                { label: 'Failure', value: 'FAILURE' },
                { label: 'Aborted', value: 'ABORTED' },
                { label: 'All', value: null },
              ]}
              onChange={(option) => setStatusFilter(option ? option.value : null)}
              value={statusFilter ? { label: statusFilter, value: statusFilter } : null}
              placeholder="Select build status..."
              isSearchable
              isClearable
            />
          </div>
          <div>
            <label>Start Date: </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy/MM/dd"
              placeholderText="Select start date"
            />
          </div>
          <div>
            <label>End Date: </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy/MM/dd"
              placeholderText="Select end date"
            />
          </div>
        </>
      )}
      {loading && <SkeletonJenkinsJobBuildsTable />}
      {error && <div>{error}</div>}
      {!loading && !error && displayBuilds && displayBuilds.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('jobName')}>
                  Job Name
                  {sortConfig.key === 'jobName' && (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                </th>
                <th onClick={() => handleSort('number')}>
                  Build Number
                  {sortConfig.key === 'number' && (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                </th>
                {/* <th onClick={() => handleSort('status')}>
                  Status
                  {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                </th> */}
                <th onClick={() => handleSort('result')}>
                  Result
                  {sortConfig.key === 'result' && (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                </th>
                {/* <th onClick={() => handleSort('duration')}>
                  Duration (ms)
                  {sortConfig.key === 'duration' && (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                </th> */}
                <th onClick={() => handleSort('timestamp')}>
                  Timestamp
                  {sortConfig.key === 'timestamp' && (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                </th>
                <th onClick={() => handleSort('url')}>
                  Build URL
                  {sortConfig.key === 'url' && (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                </th>
              </tr>
            </thead>
            <tbody>
              {displayBuilds.map((build, index) => (
                <tr key={index}>
                  <td>{build.jobName}</td>
                  <td>{build.number}</td>
                  {/* <td>{build.status}</td> */}
                  <td>{build.result}</td>
                  {/* <td>{build.duration}</td> */}
                  <td>{new Date(build.timestamp).toLocaleString()}</td>
                  <td><a href={build.url} target="_blank" rel="noopener noreferrer">View build</a></td>
                </tr>
              ))}
            </tbody>
          </table>
          {renderPagination}
        </>
      )}
    </div>
  );
};

export default JenkinsJobBuildsTable;
