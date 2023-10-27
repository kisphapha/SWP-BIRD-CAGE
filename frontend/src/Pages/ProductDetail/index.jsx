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
                    <div className="flex h-16">
                        <TextField label="Reply to comment" />
                        <Button>Save</Button>
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
            existingProduct.quantity = (parseInt(existingProduct.quantity) + parseInt(quantity)).toString()
        } else {
            cart.products.push({
                id: productId,
                name: product.Name,
                quantity: quantity.toString(),
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
                                {parseInt(product.Price * (100-product.discount)/100).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
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
                            <div className="row">
                                <span className="title">Còn</span>
                                <span className="info">{product.Stock}</span>
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
                                {' '}
                                Thêm vào giỏ hàng{' '}
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
                    <div>Thông số</div>
                    <table>
                        <tbody>
                            <tr>
                                <td>Tên sản phẩm</td>
                                <td>{product.Name}</td>
                            </tr>
                            <tr>
                                <td>Phân loại</td>
                                <td>{product.Shape}</td>
                            </tr>
                            <tr>
                                <td>Kích thước dài rộng (cm)</td>
                                <td>{product.Size}</td>
                            </tr>
                            <tr>
                                <td>Loại chim phù hợp</td>
                                <td>{product.SuitableBird}</td>
                            </tr>
                            <tr>
                                <td>Chất Liệu</td>
                                <td>{product.material}</td>
                            </tr>


                        </tbody>
                    </table>
                </div>
                <div className="feedback">
                    <div>ĐÁNH GIÁ SẢN PHẨM</div>

                    <div>
                        {ratingsData.map((rating, index) => (
                            <div key={index} className="bg-white flex py-2 ">
                                <hr className="py-2" />
                                {/* <div className="flex-row"> */}
                                <div>
                                    <Avatar className="rounded-xl w-16 h-16 m-2" src={rating.Picture} />
                                </div>
                                <div className="">
                                    <div>
                                        <h4 className=" px-4">{rating.Name}</h4>
                                        <Rating name="hover-feedback" value={rating.StarPoint} precision={1} readOnly />
                                    </div>
                                    <p>{rating.Content}</p>
                                    {getFeedback()}
                                </div>
                                <hr className="py-2 " />
                                {/* </div> */}
                                <div className="py-2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
