import React, { useEffect, useState } from 'react'
import { UserProvider } from '../../UserContext'
import Header from '../../components/common/Header'
import Navbar from '../../components/common/Navbar'
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Compare() {
    const [product, setProduct] = useState([])
    const { productId } = useParams()
    const [imgList, setImgList] = useState([])
    const [focusUrl, setFocusUrl] = useState('')

    useEffect(() => {
        window.scrollTo(0, 0)
        const sesQuantity = parseInt(sessionStorage.getItem('quantity'))
        const fetchProduct = async () => {
            const response = await axios.get(`http://localhost:3000/products/${productId}`)
            setProduct(response.data)
        }

        const fetchImage = async () => {
            const response = await axios.get(`http://localhost:3000/products/img/${productId}`)
            setFocusUrl(response.data[0].Url)
        }

        fetchProduct()

        fetchImage()
    }, [productId])

    return (
        <div>
            <UserProvider>
                <Header />
                <Navbar />
            </UserProvider>
            <div className="font-bold text-xl text-center my-4">So sánh sản phẩm</div>
            <div className="w-5/6 mx-auto mt-4 mb-8 pb-72 flex text-center ">
                <TableContainer component={Paper} className="flex">
                    <div>
                        <TableHead>
                            <TableCell>
                                <TableRow>Ảnh</TableRow>
                                <TableRow>Tên sản phẩm</TableRow>
                                <TableRow> Hình dáng</TableRow>
                                <TableRow>Chất Liệu</TableRow>
                                <TableRow>Giá</TableRow>
                                <TableRow></TableRow>
                            </TableCell>
                        </TableHead>
                    </div>
                    <div>
                        <TableBody>
                            <TableCell>
                                <TableRow>
                                    <img className="big-img" src={focusUrl} />\ ádsa
                                </TableRow>
                                <TableRow>adsada{product.Name}</TableRow>
                                <TableRow>sssss{product.Shape}</TableRow>
                                <TableRow>ddd{product.material}</TableRow>
                                <TableRow>
                                    {parseInt((product.Price * (100 - product.discount)) / 100).toLocaleString('vi', {
                                        style: 'currency',
                                        currency: 'VND'
                                    })}
                                </TableRow>
                                <TableRow>qqqqq</TableRow>
                            </TableCell>
                        </TableBody>
                    </div>
                </TableContainer>
            </div>
        </div>
    )
}
