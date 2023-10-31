import React, { useState, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'
import { UserProvider } from '../../UserContext'
import Header from '../../components/common/Header'
import Navbar from '../../components/common/Navbar'
import CategoryNav from '../../components/features/CategoryNav'
import { useNavigate } from 'react-router-dom'
import Popup from 'reactjs-popup'
import axios from 'axios'
import './style.css'

export default function Cart() {
    const [cartData, setCartData] = useState({ products: [] })
    const [point, setPoint] = useState(0)
    const [loading, setLoading] = useState(true)
    const [paymentMethod, setPaymentMethod] = useState('COD') // Default to 'onDelivery'
    const navigate = useNavigate()
    const loadCartData = async () => {
        const cartDataFromSession = sessionStorage.getItem('cart')
        if (cartDataFromSession) {
            setCartData(JSON.parse(cartDataFromSession))
        }
        setLoading(false)
    }


    useEffect(() => {
        loadCartData()
    }, [])


    const handleDecrement = (productId) => {
        const updatedCart = { ...cartData }
        const productIndex = updatedCart.products.findIndex((product) => product.id === productId)

        if (updatedCart.products[productIndex].quantity > 1) {
            updatedCart.products[productIndex].quantity -= 1
            sessionStorage.setItem('cart', JSON.stringify(updatedCart))
            setCartData(updatedCart)
        }
    }

    const handleIncrement = (productId) => {
        const updatedCart = { ...cartData }
        const productIndex = updatedCart.products.findIndex((product) => product.id === productId)

        if (updatedCart.products[productIndex].quantity < 10) {
            updatedCart.products[productIndex].quantity = parseInt(updatedCart.products[productIndex].quantity) + 1
            sessionStorage.setItem('cart', JSON.stringify(updatedCart))
            setCartData(updatedCart)
        }
    }

    const handlePayment = async () => {
        try {
            if (sessionStorage.loginedUser != null) {
                const res = await axios.post('http://localhost:3000/order/addordertodb', {
                    UserID: JSON.parse(sessionStorage.loginedUser).Id,
                    OrderDate: new Date().toISOString().slice(0, 10),
                    PaymentDate: null,
                    ShippingAddress: null,
                    PhoneNumber: JSON.parse(sessionStorage.loginedUser).PhoneNumber,
                    Note: 'abcxyz',
                    TotalAmount: calculateTotalPrice(),
                    PaymentMethod: paymentMethod,
                    Status: 'UNPAID',
                    Items: JSON.parse(sessionStorage.cart).products,
                })
                await axios.post('http://localhost:3000/users/updatePoint', {
                    id: 17,
                    point: 1000
                })
                console.log(res.data.orderid)
                if (paymentMethod == 'vnpay') {
                    const response = await axios.post('http://localhost:3000/payment/create_payment_url', {
                        amount: calculateTotalPrice(),
                        bankCode: '',
                        language: 'vn',
                        email: JSON.parse(sessionStorage.loginedUser).Email,
                        phoneNumber: JSON.parse(sessionStorage.loginedUser).PhoneNumber,
                        orderid: res.data.orderid
                    })
                    setTimeout(() => {
                        alert('Đang chuyển tiếp đến VNPay')
                    }, 2000)
                    window.location.href = response.data.url
                } else {
                    alert('Đặt hàng thành công')
                }
                sessionStorage.setItem('cart', '{"products":[]}')
                window.location.reload(false)
            } else {
                alert('Đăng nhập để tiến hành thanh toán')
            }
        } catch (error) {
            console.error('Lỗi thanh toán:', error)
        }
    }

    const calculateTotalPrice = () => {
        let total = 0

        cartData.products.forEach((product) => {
            if (product != null) {
                total += product.price * product.quantity
            }
        })
        return total
    }
    const calculateBonus = () => {
        let bonus = 0

        cartData.products.forEach((product) => {
            if (product != null) {
                bonus += (product.price * product.quantity) / 1000
            }
        })
        return bonus
    }

    useEffect(() => {
        setPoint(calculateBonus())
    }, [calculateBonus])

    const removeProductFromCart = (productId) => {
        const updatedCart = { ...cartData }

        const productIndex = updatedCart.products.findIndex((product) => product.id === productId)
        if (productIndex != -1) {
            updatedCart.products.splice(productIndex, 1)
            sessionStorage.setItem('cart', JSON.stringify(updatedCart))
            console.log(sessionStorage.getItem('cart'))
            setCartData(updatedCart)
        }
    }

    return (
        <div className="relative">
            <style></style>
            <UserProvider>
                <Header />
                <Navbar />
            </UserProvider>
            <CategoryNav parents={[{ name: 'Trang chủ', link: '/' }]} current="Giỏ hàng"></CategoryNav>
            {loading ? (
                <p>Đang tải...</p>
            ) : (
                <div className="mt-5 px-40 py-5  bg-white" style={{ minHeight: '71vh' }}>
                    <h2 className="block text-center py-5">
                        <span className="text-4xl border-b-2 border-yellow-300">Giỏ hàng</span>
                    </h2>

                    <table className="w-full border-2 border-slate-200">
                        <tr className=" bg-slate-300">
                            <th className="py-3 px-3 text-left">Ảnh </th>
                            <th className="py-3 text-left">Tên sản phẩm </th>
                            <th className="py-3 ">Giá / sản phẩm </th>
                            <th className="py-3 ">Số lượng </th>
                            <th className="py-3 w-40 ">Tổng cộng </th>
                            <th className="py-3 pr-3 ">Xóa</th>
                        </tr>

                        {cartData.products.map((product) =>
                            product != null ? (
                                <tr key={product.Id} className="">
                                    <td>
                                        <img className="h-full w-32 rounded-md" src={product.url} alt={product.name} />
                                    </td>
                                    <td>
                                        <div>{product.name}</div>
                                    </td>
                                    <td>
                                        <div className="text-center">
                                            {product.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex justify-center">
                                            <button type="button" onClick={() => handleDecrement(product.id)} className="quantity-button">
                                                -
                                            </button>
                                            <div className="quantity-show ">{product.quantity}</div>
                                            <button type="button" onClick={() => handleIncrement(product.id)} className="quantity-button">
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        {(product.price * product.quantity).toLocaleString('vi', {
                                            style: 'currency',
                                            currency: 'VND'
                                        })}
                                    </td>
                                    <td className="text-center">
                                        <Button onClick={() => removeProductFromCart(product.id)}>
                                            <DeleteIcon />
                                        </Button>
                                    </td>
                                </tr>
                            ) : (
                                <></>
                            )
                        )}
                    </table>
                    <div className="text-right justify-end place-content-end ">
                        <div className="font-bold ">
                            Tổng cộng: {calculateTotalPrice().toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                        </div>

                        <div className="font-bold ">Số điểm bonus sẽ tích được: {calculateBonus()}</div>

                        <div className="text-right font-bold ">
                            <Popup trigger={<Button variant="contained">Thanh toán</Button>} position="right center" modal>
                                {(close) => (
                                    <div>
                                        <h2>Chi tiết thanh toán</h2>
                                        <p>Tổng cộng: {calculateTotalPrice().toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>

                                        <div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="COD"
                                                    checked={paymentMethod === 'COD'}
                                                    onChange={() => setPaymentMethod('COD')}
                                                />
                                                Thanh toán khi nhận hàng
                                            </label>
                                        </div>

                                        <div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="vnpay"
                                                    checked={paymentMethod === 'vnpay'}
                                                    onChange={() => setPaymentMethod('vnpay')}
                                                />
                                                Thanh toán nhanh cùng VNPay
                                            </label>
                                        </div>

                                        <Button onClick={handlePayment} variant="outlined">
                                            Đặt hàng
                                        </Button>
                                    </div>
                                )}
                            </Popup>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 mx-4 my-2 ">
                        <Button variant="contained">Tiếp tục mua hàng</Button>
                        <Button variant="contained">Xóa tất cả</Button>
                    </div>
                </div>
            )}
        </div>
    )
}