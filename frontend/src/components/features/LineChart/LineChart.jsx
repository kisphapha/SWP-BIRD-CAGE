import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

function LineChart() {

  return (
    <React.Fragment>
      <div className="container-fluid">
        <Chart
          type ="line"
          height={400}
          
          series={[
            {
              name: "Series 1",
              data: [31, 40, 28, 51, 42, 109]
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
            title: { text: "Monthly Income" },
              categories: [
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October"
                    ]
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
    </React.Fragment>
  )
}

export default LineChart