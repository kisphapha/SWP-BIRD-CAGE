import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function LineChart() {

  const [data, setData] = useState([]);
  const [isMonthly, setIsMonthly] = useState(true);

  const fetchData = async (month, year) => {
    var res = null
    if (isMonthly) {
      res = await axios.post('http://localhost:3000/admin/statistic', {
        month,
        year
      });
    }else{
      res = await axios.post('http://localhost:3000/admin/getMonthLyIncome')
    }
    if (res.data) {
      setData(res.data);
    }
  };

  useEffect(() => {
    fetchData(10, 2023);
  }, [isMonthly]); // Fetch data whenever isMonthly changes

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  var getIncome = data.map((element) => element.TotalAmount);
  var getDate = null;
  if(isMonthly){
    getDate = data.map((element) => element.MonthDay);
  }else{
    getDate = data.map((element) => element.Month);
  }

  return (
    <div className="container-fluid">
      <div>
        <button onClick={() => {setIsMonthly(!isMonthly); fetchData(10,2023)}}>
          {isMonthly ? "Switch to Daily" : "Switch to Monthly"}
        </button>
      </div>
      <Chart
        type="line"
        height={400}
        series={[
          {
            name: "Series 1",
            data: getIncome,
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
            title: { text: isMonthly ? "Monthly Income" : "Daily Income" },
            categories: getDate,
          },
        }}
      />
    </div>
  );
}

export default LineChart