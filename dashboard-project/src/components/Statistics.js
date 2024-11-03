import Statistic from "./Statistic";

const Statistics = ({ statistics }) => {
  return (
    <table>
      <thead></thead>
      <tbody>
        {statistics.map(statistic => 
          <Statistic
            key={statistic.statName}
            statisticName={statistic.statName}
            value={statistic.value}
          />
          )
        }
      </tbody>
    </table>
  );
};

export default Statistics;