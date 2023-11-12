import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function LineChart() {

  const [data, setData] = useState([]);

  function getIncome(){
    const income = []
    data.map((element) => {
      income.push(element.TotalAmount)  
    })
    console.log(income)
    return income;
  }
  function getDate(){
    const date = []
    data.map(element => {
      date.push(element.MonthDay)  
    })
    return date;
  }

  useEffect(() => {
      async function fetchData(){
        const res = await axios.post('http://localhost:3000/admin/statistic',{
          month:11,
          year:2023
        })
        if (res) {
          setData(res.data);
        }
      }

      fetchData();
  },[])

  return (
    <React.Fragment>
      {data && (
      <div className="container-fluid">
        <Chart
          type ="line"
          height={400}
          
          series={[
            {
              name: "Series 1",
              data: getIncome()
            }
          ]}

          options={{
            // title: {text: ""},
            
            // responsive: true,

            stroke:{
                curve: "smooth"
            },

            chart:{
                toolbar: {
                    show: true,
                },
            },
            xaxis: {
            title: { text: "Thu nhập hàng tháng" },
              categories: getDate()
            },
          }}
          
        // {/* <Chart
        // type="line"
        // width={500}
        // height={550}

        // series={
        //     {
        //         name: "oders",
        //         data: [31, 40, 28, 51, 42, 109, 100, 102, 103, 104, 105, 106]
        //     }
        // }
 
        // options={{
        //   title: { text: "Oders received in 2023" },
        //   xaxis: {
        //     title: { text: "Oders received in Month" },
        //     categories: [
        //         "January",
        //         "February",
        //         "March",
        //         "April",
        //         "May",
        //         "June",
        //         "July",
        //         "August",
        //         "September",
        //         "October",
        //         "November",
        //         "December",
        //     ]
        //   }

        // }}*/}
        >

        </Chart> 
      </div>
      )}
    </React.Fragment>
  )
}

export default LineChart