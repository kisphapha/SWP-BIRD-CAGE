import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './styles.css'
import { UserContext, UserProvider } from '../../UserContext'
import Header from '../../components/common/Header'
import Navbar from '../../components/common/Navbar'
import CategoryNav from '../../components/features/CategoryNav'
import AddressPopup from '../../components/features/AddressPopup/AddressPopup'
import LoginCard from '../../components/features/LoginCard'
import Popup from 'reactjs-popup'
import { Button, TextField, Rating, Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ProductDetails() {
    const { user } = useContext(UserContext)
    const [imgList, setImgList] = useState([])
    const { productId } = useParams()
    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState([])
    const [ratingsData, setRatingsData] = useState([])
    const [focusUrl, setFocusUrl] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('COD')
    const [addressList, setAddressList] = useState([])
    const [orderAddress, setOrderAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [checkValidation, setCheckValidation] = useState(true)

    window.addEventListener('popstate', function () {
        // This function will be triggered when the window is unloaded, including when it's reloaded.
        sessionStorage.setItem('quantity', 1)
    })

    useEffect(() => {
        window.scrollTo(0, 0)
        const sesQuantity = parseInt(sessionStorage.getItem('quantity'))
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
        sesQuantity ? setQuantity(sesQuantity) : setQuantity(1)
    }, [productId])

    async function fetchAddresses() {
        const response = await axios.get(`http://localhost:3000/address/${user.Id}`)
        setAddressList(response.data)
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
        sessionStorage.setItem('quantity', quantity - 1)
    }
    const handleIncrement = () => {
        if (quantity < 10) {
            // Change this condition to quantity < 10
            setQuantity((prevCount) => prevCount + 1)
        }
        sessionStorage.setItem('quantity', quantity + 1)
    }

    function isOrderAddressEmpty(orderAddress) {
        return !orderAddress || orderAddress.trim() === ''
    }

    const checkPattern = (inputValue, pattern) => {
        const regex = new RegExp(pattern)
        return regex.test(inputValue)
    }

    const handlePhoneChange = (event) => {
        let inputPhoneNumber = event.target.value

        // Remove unwanted characters "e", "+", and "-"
        inputPhoneNumber = inputPhoneNumber.replace(/[e+-]/gi, '')

        // Regular expression pattern for a valid phone number. You can adjust it as needed.
        const phonePattern = '(032|033|034|035|036|037|038|039|096|097|098|086|083|084|085|081|082|088|091|094|070|079|077|076|078|090|093|089|056|058|092|059|099)[0-9]{7}'

        if (inputPhoneNumber.length <= 11) {
            if (checkPattern(inputPhoneNumber, phonePattern)) {
                setCheckValidation(true)
            } else {
                setCheckValidation(false)
            }
        } else {
            setValid(false)
        }
        setPhoneNumber(event.target.value)
    }

    const handleKeyDown = (event) => {
        // Prevent the characters "e", "+", and "-" from being entered.
        if (['e', '+', '-', '.'].includes(event.key)) {
            event.preventDefault()
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

        toast.dismiss()
        toast.success('Sản phẩm đã được thêm vào', {
            position: 'bottom-left',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'colored'
        })
    }

    const handlePayment = async () => {
        try {
            if (sessionStorage.loginedUser != null) {
                if (orderAddress) {
                    if (phoneNumber) {
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
                            window.location.href = response.data.url
                        } else {
                            toast.dismiss()
                            toast.success('Đặt hàng thành công', {
                                position: 'bottom-left',
                                autoClose: 1000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                                theme: 'colored'
                            })
                            close()
                            // sessionStorage.setItem('cart', '{"products":[]}')
                            // window.location.reload(false)
                        }
                        // sessionStorage.setItem('cart', '{"products":[]}')
                    } else {
                        alert('Please enter your phone number')
                    }
                } else {
                    alert('Please enter your address')
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
                            <img src={focusUrl} />
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
                            {user == null ? (
                            <Popup
                                contentStyle={{ width: '500px', height: '250px', borderRadius: '10px' }}
                                trigger={
                                    <Button variant="contained">
                                        Thêm vào giỏ hàng
                                    </Button>
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
                            <div>
                                <Button variant="contained" className="add-cart" onClick={addToCart}>
                                    Thêm vào giỏ hàng
                                </Button>
                                <ToastContainer />
                            </div>
                        )}
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
                                        <h1>Thông tin người nhận</h1>
                                        <div className="container">
                                            <div className="adr-container">
                                                <div className="w-3/4">
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
                                                        error={isOrderAddressEmpty(orderAddress)}
                                                        helperText={isOrderAddressEmpty(orderAddress) ? 'Xin hãy chọn địa chỉ' : ''}
                                                    >
                                                        <option value="" selected></option>
                                                        {addressList.map((adr) => (
                                                            <option key={adr} value={adr.ID}>
                                                                {adr.SoNha + ', ' + adr.PhuongXa + ', ' + adr.QuanHuyen + ', ' + adr.TinhTP}
                                                            </option>
                                                        ))}
                                                    </TextField>
                                                </div>
                                                <div>
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
                                            <div className="phone-container w-3/4">
                                                <TextField
                                                    type="number"
                                                    required
                                                    fullWidth
                                                    label="Số điện thoại"
                                                    className="user-input"
                                                    id="phoneNumber"
                                                    size="small"
                                                    value={phoneNumber}
                                                    onChange={handlePhoneChange}
                                                    onKeyDown={handleKeyDown}
                                                    error={!checkValidation}
                                                    helperText={!checkValidation ? "Số điện thoại không hợp lệ" : ''}
                                                ></TextField>
                                            </div>
                                            <hr className="border  border-slate-300 my-2 w-full" />
                                            <h1>Sản phẩm</h1>
                                        </div>
                                        <div>
                                            <TableContainer className=" " component={Paper}>
                                                <Table aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>
                                                                <div className="text-center  font-bold text-base">Ảnh</div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="text-center font-bold  text-base">Tên sản phẩm</div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="text-center font-bold  text-base">Giá</div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="text-center font-bold  text-base">Số lượng</div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="text-center font-bold  text-base">Tổng</div>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>
                                                                <div className="flex justify-center">
                                                                    <img className="h-full w-16 rounded-md" src={product.Url} alt={product.name} />
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="text-center text-base">{product.Name}</div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="text-center text-base">
                                                                    {parseInt((product.Price * (100 - product.discount)) / 100).toLocaleString('vi', {
                                                                        style: 'currency',
                                                                        currency: 'VND'
                                                                    })}{' '}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="text-center text-base">{quantity}</div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="text-center text-base">
                                                                    {parseInt(
                                                                        ((product.Price * (100 - product.discount)) / 100) * quantity
                                                                    ).toLocaleString('vi', {
                                                                        style: 'currency',
                                                                        currency: 'VND'
                                                                    })}{' '}
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>

                                        <hr className="border  border-slate-300 my-2 w-full" />

                                        <div className="flex place-content-between">
                                            <div>
                                                <div className="">
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value="COD"
                                                        checked={paymentMethod === 'COD'}
                                                        onChange={() => setPaymentMethod('COD')}
                                                    />
                                                    Thanh toán khi nhận hàng
                                                </div>

                                                <div className=" ">
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value="vnpay"
                                                        checked={paymentMethod === 'vnpay'}
                                                        onChange={() => setPaymentMethod('vnpay')}
                                                    />
                                                    Thanh toán nhanh cùng VNPay
                                                </div>
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
