import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

function PieChart() {
  // const [pendingOrder, setPendingOrder] = useState([]);
  // const [approvedOrder, setApprovedOrder] = useState([]);
  // const [completedOrder, setCompletedOrder] = useState([]);

  // useEffect(() => {
  //   const spOrder = [];
  //   const saOrder = [];
  //   const scOrder = [];

  //   const getOrderData = async() =>{
  //     const response = await fetch("http://localhost:3000/api/order");
  //     const data = await response.json();
  //     data.forEach(element => {
  //       if(element.status === "Pending"){
  //         spOrder.push(element);
  //       }
  //       else if(element.status === "Approved"){
  //         saOrder.push(element);
  //       }
  //       else if(element.status === "Completed"){
  //         scOrder.push(element);
  //       }
  //     });
  //     setPendingOrder(spOrder);
  //     setApprovedOrder(saOrder);
  //     setCompletedOrder(scOrder);
  //   }
  //   getOrderData();
  // },[]);

  return (
    <React.Fragment>
      <div className="container-fluid">
        <Chart
        type="pie"
        // height={200}

        series={[1, 7, 3 ,11]}

        

        options={{
          plotOptions: {
            pie: {expandOnClick: true}
          },

          legend:{
            position: "bottom",
            horizontalAlign: "center",
          },

          yaxis:{
            labels: {
              maxWidth: "812",
            },
          },
          // title: {
          //   text: "This is pie chart",
          // },

          noData:{text: "Hello? Data?"},

        labels:['ABCD','BCDE','CDEF','DEFG']
        
        }}
        >

        </Chart>
      </div>
    </React.Fragment>
  )
}

export default PieChart
