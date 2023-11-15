import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { Button } from '@mui/material'
import './LineChart.css';
function LineChart() {

  const [data, setData] = useState([]);
    const [isMonthly, setIsMonthly] = useState(true);
    const [income, setIncome] = useState([])
  const [timeline, setTimeline] = useState([])

  const fetchData = async (month, year) => {
    var res = null
    if (isMonthly) {
      res = await axios.post('http://localhost:3000/admin/statistic', {
        month,
        year
      });
    }else{
        res = await axios.get('http://localhost:3000/admin/getMonthLyIncome')
    }
    if (res.data) {
        setData(res.data);
        if (isMonthly) {
            setTimeline(res.data.map((element) => element.MonthDay));
        } else {
            setTimeline(res.data.map((element) => element.Month));
        }
        setIncome(res.data.map((element) => element.TotalAmount));
      }

  };

  useEffect(() => {
    fetchData(10, 2023);
  }, [isMonthly]); // Fetch data whenever isMonthly changes

  if (data.length === 0) {
    return <div>Loading...</div>;
  }
 

  return (
    <div className="container-fluid">
      <div>
        <Button variant="outlined" onClick={() => {setIsMonthly(!isMonthly); fetchData(10,2023)}}>
                  {isMonthly ? "Thống kê theo năm" : "Thống kê theo ngày"}
        </Button>
        <label class="switch">
          <input type="checkbox"/>
            <span class="slider">
              <div class="period">Day</div>
            <div class="period">Month</div>
            </span>
        </label>
      </div>
      <Chart
        type="line"
        height={400}
        series={[
          {
            name: "Series 1",
            data: income,
          },
        ]}
        options={{
          stroke: {
            curve: "smooth",
          },
          chart: {
            toolbar: {
              show: true,
            },
          },
          xaxis: {
            title: { text: isMonthly ? "Thu nhập tháng" : "Thu nhập năm" },
            categories: timeline,
          },
        }}
      />
    </div>
  );
}

export default LineChart