import { useEffect, useState } from 'react';
import { 
  BrowserRouter as Router
  , Routes
  , Route } from 'react-router-dom';

// Components
import Clock from './components/Clock';
import Dashboard from './components/Dashboard';
import JenkinsDashboard from './components/JenkinsDashboard';
import NavItem from './components/NavItem';
import XenDashboard from './components/XenDashboard';
import ZabbixDashboard from './components/ZabbixDashboard';

// Services
import jenkinsService from './services/jenkins';
import problemsService from './services/problems';

function App() {
  const [currentNavItem, setCurrentNavItem] = useState(() => {
    const navItem = window.sessionStorage.getItem('currentNavItem');
    return navItem !== null ? JSON.parse(navItem) : null;
  });
  const [jobs, setJobs] = useState([]);
  const [problems, setProlems] = useState([]);

  useEffect(() => {
    window.sessionStorage.setItem('currentNavItem', JSON.stringify(currentNavItem));
  }, [currentNavItem])

  useEffect(() => {
    jenkinsService.getJobs()
      .then(jobs => {
        setJobs(jobs);
      })
  }, []);

  useEffect(() => {
    problemsService.getProblemDetails()
      .then(problems => setProlems(problems))
  }, [])

  console.log(problems)

  const handleNavItemClick = (item) => {
    setCurrentNavItem(item);
  }

  return (
    <div>
      <div className="header">
        <h1>
          DevOps Dashboard 
          <span className="dashboard-for">
            {currentNavItem && currentNavItem !== 'Home' ? `- ${currentNavItem}` : null}
          </span>
        </h1>
        <Clock />
      </div>
    <Router>
      <div className="layout">
        <div className="column column-left">
        <nav>
          <ul style={{ listStyleType: 'none', marginLeft: 0, padding: 0 }}>
            <NavItem to="/" item="Home" onClickEnabled={true} onClick={handleNavItemClick}/>
            <NavItem to="/jenkins" item="Jenkins" onClickEnabled={true} onClick={handleNavItemClick} />
            <NavItem to="/zabbix" item="Zabbix" onClickEnabled={true} onClick={handleNavItemClick} />
            <NavItem to="/xenserver" item="Xenserver" onClickEnabled={true} onClick={handleNavItemClick} /> 
          </ul>
        </nav>
        </div>
        <div className="column column-right">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jenkins" element={<JenkinsDashboard jobs={jobs[1]}/>} />
          <Route path="/zabbix" element={<ZabbixDashboard problems={problems}/>} />
          <Route path="/xenserver" element={<XenDashboard />} />
        </Routes>
        </div>
      </div>
    </Router>
    </div>
  );
}

export default App;
