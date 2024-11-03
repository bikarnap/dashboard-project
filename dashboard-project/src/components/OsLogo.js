import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindows, faUbuntu } from '@fortawesome/free-brands-svg-icons';

const OsLogo = ({ vm }) => {
  if (vm.os.distro.toLowerCase().includes('win'))
    return <FontAwesomeIcon icon={faWindows} />
  else if (vm.os.distro.toLowerCase().includes('ubuntu'))
    return <FontAwesomeIcon icon={faUbuntu} style={{color: "#8e250b",}} />
  return null
};

export default OsLogo;