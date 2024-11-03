import './Card.css';
import SkeletonCard from './SkeletonCard';

const Card = ({ label, sublabel, className, loading=false }) => {
  return (
    <div className={`card ${className}`}>
      <div className="card-label">{label}</div>
      {loading ? (
          <SkeletonCard />
        ) : (
          <p className="numeric-value">{sublabel}</p>
        )}
    </div>
  );
};

export default Card;

