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
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        const cartDataFromSession = sessionStorage.getItem('cart')
        if (cartDataFromSession) {
            setCartData(JSON.parse(cartDataFromSession))
        }
        setLoading(false)
    }, [cartData])

    const handleDecrement = (productId) => {
        const updatedCart = { ...cartData }
        const productIndex = updatedCart.products.findIndex((product) => product.id === productId)

        if (updatedCart.products[productIndex].quantity >= 1) {
            updatedCart.products[productIndex].quantity -= 1
            sessionStorage.setItem('cart', JSON.stringify(updatedCart))
            setCartData(updatedCart)
        }
        if (updatedCart.products[productIndex].quantity == 0){
            removeProductFromCart(productId)
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
            axios.post('http://localhost:3000/order/addordertodb', {})
            const response = await axios.post('http://localhost:3000/payment/create_payment_url', {
                amount: calculateTotalPrice(),
                bankCode: '',
                language: 'vn',
                email: 'customer@example.com',
                phoneNumber: '1234567890'
            })
            // console.log(response)
            window.location.href = response.data.url
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
                        <tr>
                            <td colSpan="4" className="text-right font-bold">
                                Tổng cộng
                            </td>
                            <td className="w-1"></td>
                            <td className="font-bold"> {calculateTotalPrice().toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td colSpan="4" className="text-right font-bold py-8 pr-10">
                                <Popup trigger={<Button variant="contained">Thanh toán</Button>} position="right center" modal>
                                    {(close) => (
                                        <div>
                                            <h2>Chi tiết thanh toán</h2>
                                            <p>Tổng cộng: {calculateTotalPrice().toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                            <Button onClick={handlePayment} variant="outlined">
                                                Tiến hành thanh toán
                                            </Button>
                                        </div>
                                    )}
                                </Popup>
                            </td>
                        </tr>
                    </table>
                </div>
            )}
        </div>
    )
}
