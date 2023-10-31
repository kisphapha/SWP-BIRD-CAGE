import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './styles.css'
import { UserProvider } from '../../UserContext'
import Header from '../../components/common/Header'
import Navbar from '../../components/common/Navbar'
import CategoryNav from '../../components/features/CategoryNav'
import { useNavigate } from 'react-router-dom'

import { Button, TextField, Rating, Avatar } from '@mui/material'


export default function ProductDetails() {
    const [imgList, setImgList] = useState([])
    const { productId } = useParams()
    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState([])
    const [ratingsData, setRatingsData] = useState([])
    const [focusUrl, setFocusUrl] = useState('')
    const navigate = useNavigate();


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
        const fetchImage = async () => {
            const response = await axios.get(`http://localhost:3000/products/img/${productId}`)
            setImgList(response.data)
            setFocusUrl(response.data[0].Url)
        }

        fetchProduct()
        fetchRatings()
        fetchImage()
    }, [productId])



    const getFeedback = () => {
        if (sessionStorage.loginedUser != null) {
            const user = JSON.parse(sessionStorage.loginedUser)
            if (user.Role === 'Admin' || user.Role === 'Staff') {
                return (
                    <div className="flex ml-8 my-2 pl-8">
                        <TextField variant="standard" label="Reply to comment" />
                        <Button variant="text">Save</Button>
                    </div>
                )
            }
        }
    }

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
            existingProduct.quantity = (parseInt(existingProduct.quantity) + parseInt(quantity))
        } else {
            cart.products.push({
                id: productId,
                name: product.Name,
                quantity: quantity,
                url: product.Url,
                price: (product.Price * (100 - product.discount)) / 100
            })
        }

        // Store the updated cart in sessionStorage
        sessionStorage.setItem('cart', JSON.stringify(cart))

        console.log(sessionStorage.getItem('cart'))
    }

    const handleBuy = () => {
        addToCart();
        navigate('/cart')
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
                            <img src={focusUrl} />
                        </div>
                        <div className="img-more">
                            {imgList.map((image) => (
                                    // eslint-disable-next-line react/jsx-key
                                <img onClick={() => setFocusUrl(image.Url) } className="img" src={image.Url} />
                            )) }
                        </div>
                    </div>
                    <div className="product-detail">
                        <div className="name">{product.Name}</div>
                        <div className="price">
                            <div className="cost">{parseInt(product.Price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                            <div className="discount">
                                {parseInt((product.Price * (100 - product.discount)) / 100).toLocaleString('vi', {
                                    style: 'currency',
                                    currency: 'VND'
                                })}
                            </div>
                        </div>
                        <div className="data">
                            <div className="row">
                                <span className="title">Mã Sản Phẩm</span>
                                <span className="info">{productId}</span>
                            </div>
                            <hr className="border border-slate-300 " />
                            <div className="row">
                                <span className="title">Hình dáng</span>
                                <span className="info">{product.Shape}</span>
                            </div>
                            <hr className="border border-slate-300 " />
                            <div className="row">
                                <span className="title">Chất Liệu</span>
                                <span className="info">{product.material}</span>
                            </div>
                            <hr className="border border-slate-300 " />
                            <div className="row">
                                <span className="title">Còn</span>
                                <span className="info">{product.Stock}</span>
                            </div>
                            <hr className="border border-slate-300 " />
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

                        <div className="buy" onClick={handleBuy}>
                            <p className="t1">MUA NGAY</p>
                            <p className="t2">Gọi điện xác nhận và giao hàng tận nơi</p>
                        </div>
                    </div>
                </div>
                <div className="description">
                    <div>
                        <div className="font-bold text-xl my-4">Mô tả</div>
                        <div className="mb-4">{product.Description}</div>
                    </div>
                    <hr className="border border-slate-300" />
                    <div className="my-4">
                        <div className="font-bold text-xl my-2">Thông số</div>
                        <table className="w-full">
                            <thead></thead>
                            <tbody>
                                <tr className="">
                                    <td className="my-4 py-4  w-1/6 pl-4 bg-slate-300">Tên sản phẩm</td>
                                    <td className="my-4 py-4  bg-white pl-4">{product.Name}</td>
                                </tr>
                                <hr className="border border-r-violet-400" />
                                <tr className="">
                                    <td className="my-4 py-4  w-1/6 pl-4 bg-slate-300">Phân loại</td>
                                    <td className="my-4 py-4  bg-white pl-4">{product.Shape}</td>
                                </tr>
                                <hr className="border border-r-violet-400" />
                                <tr className="">
                                    <td className="my-4 py-4  w-1/6 pl-4 bg-slate-300">Kích thước: dài , rộng</td>
                                    <td className="my-4 py-4  bg-white pl-4">{product.Size}</td>
                                </tr>
                                <hr className="border border-r-violet-400" />
                                <tr className="">
                                    <td className="my-4 py-4  w-1/6 pl-4 bg-slate-300">Loại chim phù hợp</td>
                                    <td className="my-4 py-4  bg-white pl-4">{product.SuitableBird}</td>
                                </tr>
                                <hr className="border border-r-violet-400" />
                                <tr className="">
                                    <td className="my-4 py-4 w-1/6 pl-4 bg-slate-300">Chất Liệu</td>
                                    <td className="my-4 py-4  bg-white pl-4">{product.material}</td>
                                </tr>
                                <hr className="border border-r-violet-400" />
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="feedback">
                    <div className="font-bold my-4 text-xl ">Đánh giá sản phẩm </div>

                    <hr className="border border-slate-300  mt-1" />
                    <div className="bg-white w-full ">
                        {ratingsData.map((rating, index) => (
                            <div key={index} className=" mb-2 ">
                                <div className="">
                                    <div className="flex">
                                        <div>
                                            <Avatar className="rounded-2xl h-24 w-24 m-2" src={rating.Picture} />
                                        </div>
                                        <div className="mx-4">
                                            <div className="">
                                                <h4 className=" ">{rating.Name}</h4>

                                                <div className="text-sm">
                                                    <Rating name="hover-feedback " size="small" value={rating.StarPoint} precision={1} readOnly />
                                                </div>
                                            </div>
                                            <p>{rating.Content}</p>
                                        </div>
                                    </div>
                                    <div className="mx-8">{getFeedback()}</div>
                                    <hr className="border border-slate-300 mt-4 mx-4" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
