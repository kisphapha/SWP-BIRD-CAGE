import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './styles.css'
import { UserProvider } from '../../UserContext'
import Header from '../../components/common/Header'
import Navbar from '../../components/common/Navbar'
import CategoryNav from '../../components/features/CategoryNav'
import { Button, TextField, Rating, Avatar } from '@mui/material'

export default function ProductDetails() {
    const { productId } = useParams()
    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState([])
    const [ratingsData, setRatingsData] = useState([])
    const getFeedback = () => {
        if (sessionStorage.loginedUser != null) {
            const user = JSON.parse(sessionStorage.loginedUser)
            if (user.Role === 'Admin' || user.Role === 'Staff') {
                return (
                    <div>
                        <TextField label="Trả lời bình luận" />
                        <Button>Lưu</Button>
                    </div>
                )
            }
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchProduct = async () => {
            const response = await axios.get(`http://localhost:3000/products/${productId}`)
            setProduct(response.data)
        }
        const fetchRatings = async () => {
            const response = await axios.get(`http://localhost:3000/products/rating/${productId}`)
            setRatingsData(response.data)
        }

        fetchProduct()
        fetchRatings()
    }, [productId])

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prevCount) => prevCount - 1)
        }
    }

    const handleIncrement = () => {
        if (quantity < 10) {
            // Change this condition to quantity < 10
            setQuantity((prevCount) => prevCount + 1)
        }
    }

    const addToCart = () => {
        let cart = sessionStorage.getItem('cart')

        if (!cart) {
            cart = {
                products: []
            }
        } else {
            cart = JSON.parse(cart)
        }

        const existingProduct = cart.products.find((product) => product.id === productId)

        if (existingProduct) {
            existingProduct.quantity = ((existingProduct.quantity) + (quantity))
        } else {
            cart.products.push({
                id: productId,
                name: product.Name,
                quantity: quantity,
                url: product.Url,
                price: product.Price
            })
        }

        // Store the updated cart in sessionStorage
        sessionStorage.setItem('cart', JSON.stringify(cart))

        console.log(sessionStorage.getItem('cart'))
    }

    return (
        <div id="page-product">
            <UserProvider>
                <Header />
                <Navbar />
            </UserProvider>
            <CategoryNav
                parents={[
                    { name: 'Trang chủ', link: '/' },
                    { name: product.Shape, link: '/filter/1/' + product.Category }
                ]}
                current={product.Name}
            ></CategoryNav>
            <div className="product-container">
                <div className="product">
                    <div className="img-container">
                        <div className="img-main">
                            <img src={product.Url} />
                        </div>
                        <div className="img-more">
                            <img className="img" src={product.Url} />
                            <img className="img" src={product.Url} />
                            <img className="img" src={product.Url} />
                        </div>
                    </div>
                    <div className="product-detail">
                        <div className="name">{product.Name}</div>
                        <div className="price">
                            <div className="cost">{parseInt(product.Price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                            <div className="discount">
                                {parseInt(product.Price * 0.9).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                            </div>
                        </div>
                        <div className="data">
                            <div className="row">
                                <span className="title">Mã Sản Phẩm</span>
                                <span className="info">{productId}</span>
                            </div>
                            <hr />
                            <div className="row">
                                <span className="title">Hình dáng</span>
                                <span className="info">{product.Shape}</span>
                            </div>
                            <hr />
                            <div className="row">
                                <span className="title">Chất Liệu</span>
                                <span className="info">{product.material}</span>
                            </div>
                            <hr />
                        </div>
                        <div className="option">
                            <div className="quantity">
                                <button type="button" onClick={handleDecrement} className="button">
                                    -
                                </button>
                                <div className="quantity-show">{quantity}</div>
                                <button type="button" onClick={handleIncrement} className="button">
                                    +
                                </button>
                            </div>
                            <div className="add-cart" onClick={addToCart}>
                                Thêm vào giỏ hàng
                            </div>
                        </div>

                        <div className="buy">
                            <p className="t1">MUA NGAY</p>
                            <p className="t2">Gọi điện xác nhận và giao hàng tận nơi</p>
                        </div>
                    </div>
                </div>
                <div className="description">
                    <div>Mô tả</div>
                    <div>{product.Description}</div>
                    <img className="logo-img" src="https://wallpapers.com/images/featured/soft-aesthetic-cei80uravrnl6ltm.jpg" />
                </div>
                <div className="feedback">
                    <div>ĐÁNH GIÁ SẢN PHẨM</div>

                    <div>
                        {ratingsData.map((rating, index) => (
                            <div key={index}>
                                <hr className="py-2" />
                                <div className="flex">
                                    <Avatar src={rating.Picture} />
                                    <h4>{rating.Name}</h4>
                                </div>
                                <Rating name="hover-feedback" value={rating.StarPoint} precision={1} readOnly />
                                <p>{rating.Content}</p>
                                {getFeedback()}
                                {/* <hr className="py-2" /> */}
                                <div className="py-2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}