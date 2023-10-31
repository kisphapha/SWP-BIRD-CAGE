import React from 'react'
// import { LineChart } from '@mui/x-charts/LineChart'
// import { PieChart } from '@mui/x-charts/PieChart'
// import Chart from 'react-apexcharts'
import LineChart from '../../../components/features/LineChart/LineChart'
import PieChart from '../../../components/features/PieChart/PieChart'
import './styles.css'

function Dashboard() {
    return (
        <div className="dashboard ">
            <div className="px-4">DashBoard</div>
            <div className="dashboard-detail my-8">
                <div className="chart-container">
                    <LineChart />
                </div>
                <div className="chart-container">
                    <PieChart />
                </div>
            </div>
            <div className="px-72">
                <div className="flex-col items-center  justify-center    ">
                    <h1 className="pl-8 my-8 ">Best Sellers</h1>
                    <div className="px-64 my-8"></div>
                </div>
                <table className="">
                    <tr className="items-center flex  px-4 ">
                        <th className="mr-4 w-40 ">
                            <img
                                className="w-20 h-20"
                                src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80"
                            />
                        </th>
                        <th className="w-4/5 mr-36">Lồng Chim Chào Mào Đáy Tròn Cầu Rễ</th>
                        <th className="w-2/6 mr-36">2.700.000 ₫</th>
                        <th className="w-1/6 flex gap-3 ">45 sold</th>
                    </tr>
                    <hr className=" my-2" />
                    <tr className="items-center flex  px-4 ">
                        <th className="mr-4 w-40 ">
                            <img
                                className="w-20 h-20"
                                src="https://longchim.vn/wp-content/uploads/2023/05/long-chao-mao-go-mun-soc-chan-cham-1.jpg    "
                            />
                        </th>
                        <th className="w-4/5 mr-36">Lồng Chim Chào Mào Cáp Quang Khung Gỗ</th>
                        <th className="w-2/6 mr-36">2.700.000 ₫</th>
                        <th className="w-1/6 flex gap-3 ">34 sold</th>
                    </tr>
                    <hr className=" my-2" />
                    <tr className="items-center flex  px-4 ">
                        <th className="mr-4 w-40 ">
                            <img
                                className="w-20 h-20"
                                src="https://longchim.vn/wp-content/uploads/2023/05/long-khuyen-tre-gia-cham-tung-nai-thung-1.jpg"
                            />
                        </th>
                        <th className="w-4/5 mr-36">Lồng Chào Mào Gỗ Mun Sọc Chân Chạm</th>
                        <th className="w-2/6 mr-36">2.700.000 ₫</th>
                        <th className="w-1/6 flex gap-3 ">31 sold</th>
                    </tr>
                    <hr className=" my-2" />
                    <tr className="items-center flex  px-4 ">
                        <th className="mr-4 w-40 ">
                            <img
                                className="w-20 h-20"
                                src="https://longchim.vn/wp-content/uploads/2023/05/long-qua-dao-cua-rong-de-go-cam-lai-1.jpg"
                            />
                        </th>
                        <th className="w-4/5 mr-36">Lồng Cu Gáy Quả Đào 02 Đặc Biệt</th>
                        <th className="w-2/6 mr-36">2.700.000 ₫</th>
                        <th className="w-1/6 flex gap-3 ">20 sold</th>
                    </tr>
                    <hr className=" my-2" />
                    <tr className="items-center flex  px-4 ">
                        <th className="mr-4 w-40 ">
                            <img className="w-20 h-20" src="https://longchim.vn/wp-content/uploads/2023/05/long-mun-cham-hoa-mai-1.jpg" />
                        </th>
                        <th className="w-4/5 mr-36">Lồng Quả Đào Cửa Rồng Đế Gỗ Cẩm Lai</th>
                        <th className="w-2/6 mr-36">2.700.000 ₫</th>
                        <th className="w-1/6 flex gap-3 ">10 sold</th>
                    </tr>
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
