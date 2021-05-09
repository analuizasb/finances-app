import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import dataHelper from '../helpers/dateHelper.js';

export default function PeriodFilter({ onDateChange }) {
  const allFixedPeriods = [];
  const [selectedPeriod, setselectedPeriod] = useState(3);

  dataHelper.YEARS.forEach((year) => {
    dataHelper.MONTHS_NUMERIC.forEach((month) => {
      allFixedPeriods.push(`${year}-${month}`);
    });
  });

  useEffect(() => {
    onDateChange(allFixedPeriods[selectedPeriod]);
  }, [selectedPeriod, allFixedPeriods, onDateChange]);

  const handlePeriodChange = (event) => {
    setselectedPeriod(event.currentTarget.value);
  };

  const handleIncrement = () => {
    setselectedPeriod(selectedPeriod + 1);
  };
  const handleDecrement = () => {
    setselectedPeriod(selectedPeriod - 1);
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <label style={{ fontSize: 30, alignSelf: 'center' }}>
        Selecione o período:
      </label>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button
          onClick={handleDecrement}
          className="material-icons btn waves-effect waves-light col s1"
        >
          <i className="material-icons">keyboard_arrow_left</i>
        </button>
        <select
          className="icons browser-default col s6"
          value={selectedPeriod}
          onChange={handlePeriodChange}
        >
          {allFixedPeriods.map((date, index) => (
            <option value={index} key={index}>
              {date}
            </option>
          ))}
        </select>
        <button
          onClick={handleIncrement}
          className="material-icons btn waves-effect waves-light col s1"
        >
          <i className="material-icons">keyboard_arrow_right</i>
        </button>
      </div>
    </div>
  );
}
