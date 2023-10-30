import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useState , useEffect} from 'react'
import MenuItem from '@mui/material/MenuItem'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'



const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'user', headerName: 'Người mua', width: 130 },
    { field: 'orderDate', headerName: 'Ngày đặt hàng', width: 130 },
    { field: 'status', headerName: 'Thanh toán', width: 130 },
    { field: 'shipping', headerName: 'Trạng thái', width: 130 },

    {
        field: 'address',
        headerName: 'Địa chỉ',
        width: 150
    },
    {
        field: 'phone',
        headerName: 'Số điện thoại',
        // description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 130
        // valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`
    },
    { field: 'total', headerName: 'Tổng tiền', width: 130 },
    { field: 'note', headerName: 'Ghi chú', width: 130 },
    { field: 'updateAt', headerName: 'Ngày chỉnh sửa', width: 130 }
]

export default function Order() {
    const [cards, setCards] = useState([])
    const [rows, setRows] = useState([])
    async function fetchOrderItems(id) {
        const response = await axios.get(`http://localhost:3000/order/list/${id}`)
        return response.data
    }
    async function fetchOrder() {
        const response = await axios.get(`http://localhost:3000/order`);
        if (response.data) {
            const jsonData = response.data;
            const ordersWithItems = [];

            for (const order of jsonData) {
                const items = await fetchOrderItems(order.Id);
                const orderWithItems = { ...order, items };
                ordersWithItems.push(orderWithItems);
            }
            setCards(ordersWithItems);
        }
    }
    useEffect(() => {
        fetchOrder()
    },[])

    useEffect(() => {
        const data = []
        cards.map((card) => {
            data.push({
                id: card.Id,
                user: card.UserID,
                orderDate: card.OrderDate ? card.OrderDate.substr(0,10) : '',
                status: card.Status_Paid,
                shipping: card.Status_Shipping,
                address: card.AddressID,
                phone: card.PhoneNumber,
                total: card.TotalAmount,
                note: card.Note,
                updateAt: card.UpdateAt ? card.UpdateAt.substr(0, 10) : ''
            });
        });
        setRows(data)
    }, [cards,rows]);

    return (
        <div className=" w-full flex flex-col">
            <div className="m-10 font-bold pl-10">Users </div>
            <div className="mx-10     pb-10 h-screen">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 20 }
                        }
                    }}
                    pageSizeOptions={[10]}
                />
            </div>
        </div>
    )
}
