import React, { useState, useEffect, useMemo, useCallback } from 'react';
import xenService from '../../services/xen';
import SkeletonVmTable from './SkeletonVmTable';
import './VmTable.css';

const VmTable = () => {
  const [vms, setVms] = useState(() => {
    const records = sessionStorage.getItem('vmRecords');
    return records !== null ? JSON.parse(records) : [];
  });
  const [loading, setLoading] = useState(vms.length === 0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  function generateUUID() {
    // Generates a UUID resembling those used by Xen VMs (UUID format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
    return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, function () {
      const r = (Math.random() * 16) | 0; // Random number from 0 to 15
      return r.toString(16); // Convert to hexadecimal
    });
  }
  
  function generateVMObjects(count) {
    const vmObjects = [];
    const descriptors = ['WebServer', 'Database', 'Cache', 'AppServer', 'WorkerNode'];
    const environments = ['Prod', 'Dev', 'Test'];
  
    for (let i = 0; i < count; i++) {
      const name_label = `${descriptors[i % descriptors.length]}-${environments[i % environments.length]}-${i + 1}`;
      const power_state = Math.random() > 0.5 ? 'Running' : 'Halted'; // Randomly choose between 'running' and 'halted'
      const uuid = generateUUID();
  
      vmObjects.push({ name_label, power_state, uuid });
    }
  
    return vmObjects;
  }

  const fetchVms = useCallback(async () => {
    try {
      setLoading(true);
      const vmObjectsArray = generateVMObjects(100);

      setVms(vmObjectsArray);
    } catch (error) {
      console.error('Error fetching VMs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  console.log(vms)

  useEffect(() => {
    if (vms.length === 0) {
      fetchVms(); // No cached data, fetch immediately
    } else {
      setLoading(false); // Cached data available, set loading to false
      fetchVms(); // Fetch in the background
    }
  }, [fetchVms, vms.length]);

  const sortByKey = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedVms = [...vms].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setVms(sortedVms);
  };

  const currentVms = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return vms.slice(indexOfFirstItem, indexOfLastItem);
  }, [vms, currentPage, itemsPerPage]);

  const handlePaginationClick = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = useMemo(() => {
    const totalPages = Math.ceil(vms.length / itemsPerPage);
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
              onClick={() => handlePaginationClick(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </button>
          )
        )}
      </div>
    );
  }, [vms.length, currentPage, itemsPerPage]);

  if (loading) {
    return <SkeletonVmTable />;
  }

  return (
    <>
      <table className="vm-table">
        <thead>
          <tr>
            <th onClick={() => sortByKey('name')}>
              VM Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => sortByKey('power_state')}>
              Power State {sortConfig.key === 'power_state' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => sortByKey('uuid')}>
              UUID {sortConfig.key === 'uuid' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentVms.map((vm, index) => (
            <tr key={index}>
              <td>{vm.name_label}</td>
              <td>{vm.power_state}</td>
              <td>{vm.uuid}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderPagination}
    </>
  );
};

export default VmTable;
