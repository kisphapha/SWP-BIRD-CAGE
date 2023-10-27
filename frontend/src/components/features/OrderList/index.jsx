import React, { useState, useEffect } from 'react'
import './styles.css'
import Card from '../Card'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Popup from 'reactjs-popup'

const steps = ['Chờ duyệt', 'Đang chuẩn bị', 'Đang giao', 'Đã Giao']
const OrderList = (props) => {
    const [cards, setCards] = useState([])
    const [orders, setOrders] = useState([]);
    const [rating, setRating] = useState(0);
    const [feedbackContent, setFeedbackContent] = useState('');
    const navigate = useNavigate()

    const handleRebuy = (productId) => {
        navigate('/products/' + productId)
    }

    async function fetchOrder() {
        const response = await axios.get(`http://localhost:3000/order/user/${JSON.parse(sessionStorage.loginedUser).Id}`)
        setOrders(response.data)
    }
    async function fetchOrderItems() {
        const response = await axios.get(`http://localhost:3000/order/list/${JSON.parse(sessionStorage.loginedUser).Id}`)
        setCards(response.data)
    }


    const submitFeedback = () => {
        console.log('Rating submitted:', rating);
        console.log('Feedback content:', feedbackContent);

        closePopup();
    };


    useEffect(() => {
        fetchOrder();
        fetchOrderItems()
    }, [])
    const [activeStep, setActiveStep] = React.useState(1)
    return (
        <>
            <div className="form-header">
                <h1>Đơn Hàng Của Tôi</h1>
                <p>Những mặt hàng bạn đã mua</p>
            </div>
            <hr />
            {orders.map((order) => (
                <div className="flex-col bg-slate-50 m-2 p-2" key={order.Id}>
                    {console.log(order)}
                    <div className="flex place-content-between px-4 my-4">
                        <div className="flex">
                            <div className="px-2">Mã đơn hàng: {order.Id} </div>
                            <div>|</div>
                            <div className="px-2">Ngày đặt mua: {(order.CreateAt + '').slice(0, 10)} </div>
                        </div>
                        <div className="flex">
                            <Stepper activeStep={activeStep}>
                                {steps.map((label, index) => {
                                    const stepProps = {}
                                    const labelProps = {}

                                    return (
                                        <Step key={label} {...stepProps}>
                                            <StepLabel {...labelProps}>{label}</StepLabel>
                                        </Step>
                                    )
                                })}
                            </Stepper>
                            {/* <div>|</div> */}
                            {/* <div className="px-2"> Trạng thái đơn hàng: {card.Status} </div> */}
                        </div>
                    </div>
                    <div className="flex py-2 place-content-between">
                        <div className="flex">
                            <ul>
                                {cards.map((card) => (
                                    <li className="font-bold">{card.Quantity} x {card.Name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="">
                            <div className="mx-8 my-4 text-right line-through text-gray-400 ">
                                {order.TotalAmount.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                            </div>
                            <div className="mx-8 text-right  text-red-500 ">
                                {' '}
                                {parseInt(order.TotalAmount * 0.9).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                            </div>
                        </div>
                    </div>
                    <div className="flex-col">
                        <div className="text-right mx-8 my-4  text-red-500 text-2xl">
                            {parseInt(order.TotalAmount).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                        </div>
                        <div className="flex justify-end gap-4">
                            <Button className="" variant="contained" onClick={() => handleRebuy(order.Id)}>
                                Mua lại
                            </Button>

                            <Popup
                                trigger={<Button className="" variant="contained">Đánh giá</Button>}
                                position="right center"
                                modal
                            >
                                <div className="popup-content">
                                    <Typography component="legend">Đánh giá sản phẩm</Typography>
                                    <Rating value={rating} onChange={(event, newValue) => setRating(newValue)} />
                                    <TextField
                                        label="Nội dung đánh giá"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={feedbackContent}
                                        onChange={(event) => setFeedbackContent(event.target.value)}
                                    />
                                    <Button variant="contained" color="primary" onClick={submitFeedback}>
                                        Submit
                                    </Button>
                                </div>
                            </Popup>
                        </div>
                    </div>
                </div>
            ))}

        </>
    )
}

export default OrderList
