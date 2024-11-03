const Statistic = ({ statisticName, value  }) => { 
  return (
    <tr>
      <td>{ statisticName }</td>
      <td>{ value }</td>
    </tr>
  )
};

export default Statistic;
