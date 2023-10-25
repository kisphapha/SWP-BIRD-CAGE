import React, { useState, useEffect } from 'react'
import './styles.css'
import Card from '../Card'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

const steps = ['Chờ duyệt', 'Đang chuẩn bị', 'Đang giao', 'Đã Giao']
const OrderList = (props) => {
    const [cards, setCards] = useState([])
    const navigate = useNavigate()

    const handleRebuy = (productId) => {
        navigate('/products/' + productId)
    }

    useEffect(() => {
        async function fetchOrder() {
            const response = await axios.get(`http://localhost:3000/order/list/${props.user.Id}`)
            setCards(response.data)
        }
        fetchOrder()
    })
    const [activeStep, setActiveStep] = React.useState(1)
    return (
        <>
            <div className="form-header">
                <h1>Đơn Hàng Của Tôi</h1>
                <p>Những mặt hàng bạn đã mua</p>
            </div>
            <hr />
            {/*Loop*/}
            {cards.map((card) => (
                <div className=" flex-col bg-slate-50 m-2 p-2" key={card.Id}>
                    <div className=" flex place-content-between px-4 my-4">
                        <div className="flex">
                            <div className="px-2">Mã đơn hàng: {card.Id} </div>
                            <div>|</div>
                            <div className="px-2">Ngày đặt mua: {(card.CreatedAt + '').substr(0, 10)} </div>
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
                            <img className="h-30 w-20 mx-4  " src={card.Url}></img>
                            <div className="">
                                <div className="font-bold">{card.Name}</div>
                                <div className="pl-2">Phân loại: {card.Category}</div>
                                <div className="pl-2">x{card.Quantity}</div>
                            </div>
                        </div>
                        <div className="">
                            <div className="mx-8 my-4 text-right line-through text-gray-400 ">
                                {card.Price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                            </div>
                            <div className="mx-8 text-right  text-red-500 ">
                                {' '}
                                {parseInt(card.Price * 0.9).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                            </div>
                        </div>
                    </div>
                    <div className="flex-col ">
                        <div className="text-right mx-8 my-4  text-red-500 text-2xl">
                            {parseInt(card.Price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                        </div>
                        <div className="flex  justify-end gap-4">
                            <Button className="" variant="contained" onClick={() => handleRebuy(card.Id)}>
                                Mua lại
                            </Button>

                            <Button className="" variant="contained" onClick={() => handleRebuy(card.Id)}>
                                Đánh giá
                            </Button>
                        </div>
                    </div>
                </div>
            ))}

            {/*Loop*/}
        </>
    )
}

export default OrderList
