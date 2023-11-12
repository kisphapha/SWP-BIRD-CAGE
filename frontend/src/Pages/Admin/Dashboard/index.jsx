import React, { useEffect, useState } from 'react'
// import { LineChart } from '@mui/x-charts/LineChart'
// import { PieChart } from '@mui/x-charts/PieChart'
// import Chart from 'react-apexcharts'
import LineChart from '../../../components/features/LineChart/LineChart'
import PieChart from '../../../components/features/PieChart/PieChart'
import './styles.css'
import Axios from 'axios'

function Dashboard() {
    const [bestSellers, setBellSeller] = useState([])

    async function fetchBestSellers() {
        const response = await Axios.get(`http://localhost:3000/admin/getBestSelling`)
        if (response.data) {
            const jsonData = response.data
            const results = []

            for (const sell of jsonData) {
                const productDetail = await fetchProductDetail(sell.Id)
                const result = { ...sell, productDetail }
                results.push(result)
            }
            console.log(results)
            setBellSeller(results)
        }
    }

    const fetchProductDetail = async (id) => {
        const response = await Axios.get('http://localhost:3000/products/'+id)
        if (response.data) {
            return (response.data)
        }
    }



    useEffect(() => {
        fetchBestSellers()
    }, [])

    return (
        <div className="dashboard ">
            Chào mừng {JSON.parse(sessionStorage.loginedUser).Name}
            <div></div>
            <div className="px-4 font-bold">DashBoard</div>
            <div className="dashboard-detail my-8">
                <div className="chart-container">
                    <LineChart />
                </div>
                <div className="chart-container">
                    <PieChart />
                </div>
            </div>
            <div className="ml-80 bg-white w-1/2">
                <div className="flex-col items-center  justify-center    ">
                    <h1 className="pl-8 my-8 ">Best Sellers</h1>
                    <div className="px-64 my-8"></div>
                </div>
                <table className="">
                    <tr>
                    </tr>

                    {bestSellers.map((sell, index) => (
                        index < 5 && (
                        <tr key={sell.id}  className="items-center flex  px-4 ">
                            <td className="mr-4 w-40 ">
                                <img
                                    className="w-20 h-20"
                                    src={sell.productDetail.Url}
                                />
                            </td>
                            <td className="w-4/5 mr-36">{sell.productDetail.Name}</td>
                            <td className="w-2/6 mr-36">{sell.productDetail.Price}</td>
                            <td className="w-1/6 flex gap-3 ">{sell.total_quantity_sold}</td>
                        </tr>
                        )
                       //await 
                    ))}                              
                </table>
            </div>
        </div>
    )
}

export default Dashboard

// const chartOptions = {
//     series: [
//         {
//             name: 'Monthly income',
//             data: [40, 70, 20, 90, 36, 80, 30, 91, 60]
//         } //, {
//         //      name: 'Store Customers',
//         //      data: [40,30,70,80,40,16,40,20,51,10]
//         // }
//     ],
//     option: {
//         color: ['#6ab04c', '#2980b9'],
//         chart: {
//             background: 'transparent'
//         },
//         dataLabels: {
//             enabled: false
//         },
//         stroke: {
//             curve: 'smooth'
//         },
//         xaxis: {
//             categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
//         },
//         legend: {
//             position: 'bottom'
//         },
//         grid: {
//             show: true
//         }
//     }
// }
// export default function Dashboard() {

//     return (
//         <div className="w-full mb-52 pb-96 flex flex-col">
//             <div className="m-12">DashBoard</div>
//             <div className="flex items-center  justify-center  ">
//                 <div className=" bg-slate-200 mx-12 ">
//                     <div className="pl-12 py-4 font-bold">Sale Statistics</div>
//                     <div className="mb-8">
//                         <Chart options={chartOptions.option} series={chartOptions.series} type="line" height={400} width={700} />
//                     </div>
//                     {/* width={600}
//                             height={300} */}
//                 </div>
//                 <div className=" bg-slate-200 ">
//                     <div className="pl-12 py-6 font-bold">Best of Categories Sellers</div>
//                     <div className="mx-12 mb-8">
//                         <PieChart
//                             series={[
//                                 {
//                                     data: [
//                                         { id: 0, value: 10, label: 'LV        ' },
//                                         { id: 1, value: 15, label: 'PK        ' },
//                                         { id: 2, value: 20, label: 'L2T       ' }
//                                     ]
//                                 }
//                             ]}
//                             width={700}
//                             height={400}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
