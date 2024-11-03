import { useState, useEffect } from "react";

import zabbixService from "../services/legacy/zabbix copy";
import Statistic from "./Statistic";

const StatisticsZabbix = () => {
  const [zabbixVersion, setZabbixVersion] = useState('');
  const [triggersCount, setTriggersCount] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    zabbixService.getApplicationVersion()
      .then(response => {
        setZabbixVersion(response.result)
      })
  }, [])

  useEffect(() => {
    zabbixService.getItemsCount()
      .then(itemsCount => setItemsCount(itemsCount))
  }, []);

  useEffect(() => {
    zabbixService.getTriggersCount()
      .then(triggersCount => setTriggersCount(triggersCount))
  }, []);

  useEffect(() => {
    zabbixService.getUsersCount()
      .then(usersCount => setUsersCount(usersCount))
  }, []);

  return (
    <table>   
      <thead></thead>
      <tbody>
        <Statistic 
          statisticName="Total triggers"
          value={triggersCount}
        />
        <Statistic
          statisticName="Total triggers"
          value={triggersCount}
        />
        <Statistic
          statisticName="Total items"
          value={itemsCount}
        />
        <Statistic
          statisticName="Total users"
          value={usersCount}
        />
        <Statistic
          statisticName="Zabbix version"
          value={zabbixVersion}
        />
      </tbody>   
    </table>
  );
};

export default StatisticsZabbix;