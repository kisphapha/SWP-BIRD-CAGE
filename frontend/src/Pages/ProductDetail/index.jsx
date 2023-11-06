import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext, UserProvider } from '../../UserContext'
import { Button, TextField, Rating, Avatar } from '@mui/material'
import axios from 'axios'
import Popup from 'reactjs-popup'
import Header from '../../components/common/Header'
import Navbar from '../../components/common/Navbar'
import LoginCard from '../../components/features/LoginCard'
import CategoryNav from '../../components/features/CategoryNav'
import AddressPopup from '../../components/features/AddressPopup/AddressPopup'
import './styles.css'
import 'reactjs-popup/dist/index.css'

export default function ProductDetails() {
    const { user } = useContext(UserContext)
    const [imgList, setImgList] = useState([])
    const { productId } = useParams()
    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState([])
    const [ratingsData, setRatingsData] = useState([])
    const [focusUrl, setFocusUrl] = useState('')
    const [addressList, setAddressList] = useState([])
    const [paymentMethod, setPaymentMethod] = useState('COD')
    const [orderAddress, setOrderAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [valid, setValid] = useState(true)

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

    async function fetchAddresses() {
        const response = await axios.get(`http://localhost:3000/address/${user.Id}`)
        console.log(response.data)
        setAddressList(response.data)
        console.log(addressList)
    }

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

    const handlePhoneChange = (e) => {
        const inputPhoneNumber = e.target.value

        // Regular expression pattern for a valid phone number. You can adjust it as needed.
        const phonePattern = /^[0-9]{10,12}$/

        if (phonePattern.test(inputPhoneNumber)) {
            setValid(true)
        } else {
            setValid(false)
        }

        setPhoneNumber(inputPhoneNumber)
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
            existingProduct.quantity = existingProduct.quantity + quantity
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

    const handlePayment = async () => {
        try {
            console.log(product)
            if (sessionStorage.loginedUser != null) {
                if (orderAddress) {
                    console.log(orderAddress)
                    if (phoneNumber) {
                        if(valid){
                            console.log(phoneNumber)
                            const res = await axios.post('http://localhost:3000/order/addordertodb', {
                                UserID: JSON.parse(sessionStorage.loginedUser).Id,
                                OrderDate: new Date().toISOString().slice(0, 10),
                                PaymentDate: null,
                                AddressID: orderAddress,
                                PhoneNumber: phoneNumber,
                                Note: 'abcxyz',
                                TotalAmount: ((product.Price * (100 - product.discount)) / 100) * quantity,
                                PaymentMethod: paymentMethod,
                                Status: 'UNPAID',
                                Items: [
                                    {
                                        id: product.Id,
                                        name: product.Name,
                                        quantity: quantity,
                                        url: product.Url,
                                        price: ((product.Price * (100 - product.discount)) / 100) * quantity
                                    }
                                ]
                            })
                            // await axios.post('http://localhost:3000/users/updatePoint', {
                            //     id: 17,
                            //     point: 1000
                            // })
                            console.log(res.data.orderid)
                            if (paymentMethod == 'vnpay') {
                                const response = await axios.post('http://localhost:3000/payment/create_payment_url', {
                                    amount: ((product.Price * (100 - product.discount)) / 100) * quantity,
                                    bankCode: '',
                                    language: 'vn',
                                    email: JSON.parse(sessionStorage.loginedUser).Email,
                                    phoneNumber: JSON.parse(sessionStorage.loginedUser).PhoneNumber,
                                    orderid: res.data.orderid
                                })
                                // setTimeout(() => {
                                //     alert('Đang chuyển tiếp đến VNPay')
                                // }, 2000)
                                close()
                                console.log(response.data.url)
                                window.location.href = response.data.url
                            } else {
                                alert('Đặt hàng thành công')
                                close()
                                // sessionStorage.setItem('cart', '{"products":[]}')
                                window.location.reload(false)
                            }
                        }else{
                            alert('Xin hãy nhập lại số điện thoại');
                        }
                    } else {
                        alert('Xin hãy nhập số điện thoại')
                    }
                } else {
                    alert('Xin hãy nhập địa chỉ')
                }
            } else {
                alert('Đăng nhập để tiến hành thanh toán')
            }
        } catch (error) {
            console.error('Lỗi thanh toán:', error)
        }
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
                            <img className="image" src={focusUrl} />
                        </div>
                        <div className="img-more ">
                            {imgList.map((image) => (
                                // eslint-disable-next-line react/jsx-key
                                <img onClick={() => setFocusUrl(image.Url)} className="img" src={image.Url} />
                            ))}
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

                        {user == null ? (
                            <Popup
                                contentStyle={{ width: '500px', height: '250px', borderRadius: '10px' }}
                                trigger={
                                    <div className="buy">
                                        <p className="t1">MUA NGAY</p>
                                        <p className="t2">Gọi điện xác nhận và giao hàng tận nơi</p>
                                    </div>
                                }
                                position="center"
                                modal
                            >
                                {(close) => (
                                    <div className="login-popup">
                                        <LoginCard />
                                    </div>
                                )}
                            </Popup>
                        ) : (
                            <Popup
                                trigger={
                                    <div className="buy">
                                        <p className="t1">MUA NGAY</p>
                                        <p className="t2">Gọi điện xác nhận và giao hàng tận nơi</p>
                                    </div>
                                }
                                onOpen={fetchAddresses}
                                position="right center"
                                modal
                                closeOnDocumentClick={false}
                                // closeOnEscape={false}
                            >
                                {(close) => (
                                    <div className="popup-order">
                                        {/* <AddressPopup user={user} close={close} /> */}
                                        <h1>Thông tin người nhận</h1>
                                        <div className="adr-container">
                                            <TextField
                                                select
                                                required
                                                fullWidth
                                                label="Chọn địa chỉ của bạn"
                                                className="user-input"
                                                id="adrress"
                                                size="small"
                                                SelectProps={{
                                                    native: true
                                                }}
                                                onChange={(event) => {
                                                    setOrderAddress(event.target.value)
                                                }}
                                            >
                                                <option value="" selected></option>
                                                {addressList.map((adr) => (
                                                    <option key={adr} value={adr.ID}>
                                                        {adr.SoNha + ', ' + adr.PhuongXa + ', ' + adr.QuanHuyen + ', ' + adr.TinhTP}
                                                    </option>
                                                ))}
                                            </TextField>
                                            <div className="add-address-btn">
                                                <Popup trigger={<Button variant="contained">Thêm</Button>} position="right center" modal>
                                                    {(close) => (
                                                        <div className="popup-address">
                                                            <h1>Thêm địa chỉ</h1>
                                                            <AddressPopup user={user} fetchAddresses={fetchAddresses} close={close} />
                                                        </div>
                                                    )}
                                                </Popup>
                                            </div>
                                        </div>
                                        <div className="phone-container">
                                            <TextField
                                                type="number"
                                                required
                                                fullWidth
                                                label="Số điện thoại"
                                                className="user-input"
                                                id="phoneNumber"
                                                size="small"
                                                inputProps={{
                                                    maxLength: 12,
                                                }}
                                                value={phoneNumber}
                                                onChange={handlePhoneChange}
                                                error={!valid}
                                                helperText={!valid ? 'Please enter a valid phone number' : ''}
                                            ></TextField>
                                        </div>
                                        <h1>Sản phẩm</h1>
                                        <div className="curr-item-container">
                                            <table className="curr-item">
                                                <tr>
                                                    <th>Ảnh</th>
                                                    <th>Tên sản phẩm</th>
                                                    <th>Giá</th>
                                                    <th>Số lượng</th>
                                                    <th>Tổng</th>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">
                                                        <img className="h-full w-16 rounded-md" src={product.Url} alt={product.name} />
                                                    </td>
                                                    <td className="text-center">
                                                        <div>{product.Name}</div>
                                                    </td>
                                                    <td className="text-center">
                                                        {parseInt((product.Price * (100 - product.discount)) / 100).toLocaleString('vi', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}{' '}
                                                    </td>
                                                    <td className="text-center">
                                                        <div>{quantity}</div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            {parseInt(((product.Price * (100 - product.discount)) / 100) * quantity).toLocaleString(
                                                                'vi',
                                                                {
                                                                    style: 'currency',
                                                                    currency: 'VND'
                                                                }
                                                            )}{' '}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>

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

                                        <div className="buttons">
                                            {/* <button className="decision" onClick={close}></button> */}
                                            <Button variant="contained" onClick={close}>
                                                Hủy
                                            </Button>
                                            <Button
                                                variant="contained"
                                                onClick={() => {
                                                    handlePayment()
                                                }}
                                            >
                                                Đặt hàng
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                        )}
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
