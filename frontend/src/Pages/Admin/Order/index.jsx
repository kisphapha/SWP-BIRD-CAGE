import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useState , useEffect} from 'react'
import MenuItem from '@mui/material/MenuItem'
import {    DataGrid} from '@mui/x-data-grid'
import axios from 'axios'
import Popup from 'reactjs-popup'


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
    const [openPopup, setOpenPopup] = useState(false);
    const [cards, setCards] = useState([])
    const [order, setOrder] = useState('')
    const [orderItem, setOrderItem] = useState([])
    const [rows, setRows] = useState([])

    const handleRowClick = async (params) => {
        const order = await getAnOrder(params.row.id)
        const detail = await fetchOrderItems(params.row.id)
        setOrder(order)
        setOrderItem(detail)
        setOpenPopup(true);
    }
    async function getAnOrder(id) {
        const response = await axios.get(`http://localhost:3000/order/${id}`)
        return response.data
    }
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
    }, [cards]);

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
                    onRowClick={handleRowClick }
                />
                <Popup
                    open={openPopup}
                    onClose={() => setOpenPopup(false)}
                    position="right center"
                    closeOnDocumentClick={false}
                    closeOnEscape={false}
                    modal
                >
                    {(close) => (
                        <>
                            {order && (
                                <div>
                                    <div>
                                        <TextField className="w-64" select label="Trạng thái" variant="filled">
                                            <MenuItem value={'Chờ duyệt'}>Chờ Duyệt</MenuItem>
                                            <MenuItem value={'Đang chuẩn bị'}>Đang chuẩn bị</MenuItem>
                                            <MenuItem value={'Đang giao'}>Đang giao</MenuItem>
                                            <MenuItem value={'Đã giao'}>Đã giao</MenuItem>
                                        </TextField>
                                    <div className="flex justify-end">
                                        <Button onClick={close}>
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="px-2">Mã đơn hàng: {order.Id} </div>
                                    <div>|</div>
                                    <div className="px-2">Ngày đặt mua: {(order.CreateAt + '').substr(0, 10)} </div>
                                </div>
                                {orderItem.map((item) => (
                                    <div key={item.Id}>
                                        <div className="flex">
                                            <img className="h-30 w-20 mx-4" src={item.Url} alt={item.Name} />
                                            <div className="">
                                                <div className="font-bold">{item.Name}</div>
                                                <div className="pl-2">Phân loại: {item.Shape}</div>
                                                <div className="pl-2">x{item.Quantity}</div>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="mx-8 text-right text-red-500">
                                                {item.Price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="text-right mx-8 my-4  text-red-500 text-2xl">
                                    {order.TotalAmount.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                </div>
                            </div>
                            )}
                            
                        </>
                    )}
                </Popup>
            </div>
        </div>
    )
}
