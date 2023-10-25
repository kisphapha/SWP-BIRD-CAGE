import React, { useState, useEffect } from 'react'
import './styles.css'
import Card from '../Card'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const OrderList = ( props) => {
    const [cards, setCards] = useState([])
    const navigate = useNavigate()


    const handleRebuy = (productId) => {
        navigate('/products/'+productId)
    }
    async function fetchOrderItems() {
        const response = await axios.get(`http://localhost:3000/order/list/${props.user.Id}`)
        setCards(response.data)
    }
    async function fetchOrder() {
        const response = await axios.get(`http://localhost:3000/order/list/${props.user.Id}`)
        setCards(response.data)
    }

    useEffect(() => {      
        fetchOrderItems()
    })
    return (
        <>
            <div className="form-header">
                <h1>Đơn Hàng Của Tôi</h1>
                <p>Những mặt hàng bạn đã mua</p>
            </div>
            <hr />
            {/*Loop*/}
            {cards.map((card) => (
                <div className="order-card" key={card.Name }>
                    <img src={card.Url}></img>
                    <div className="order-infor">
                        <div className="order-title">{card.Name}</div>
                        <div className="order-date">{(card.CreatedAt + "").substr(0,10)}</div>
                    </div>
                    <div className="order-infor-2">
                        <div className="order-price">{parseInt(card.Price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                        <div className="order-button">
                            <button className="btn-rebuy" onClick={() => handleRebuy(card.Id)}>Mua lại</button>
                            <button className="btn-rating">Đánh giá</button>
                        </div>
                    </div>
                </div>
            )) }
            
            {/*Loop*/}

         </>
    )
}

export default OrderList;
