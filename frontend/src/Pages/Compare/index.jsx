import React, { useEffect, useState } from 'react'
import { UserProvider } from '../../UserContext'
import Header from '../../components/common/Header'
import Navbar from '../../components/common/Navbar'
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow,Button } from '@mui/material'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Compare() {
    const [product, setProduct] = useState([])

    const fetchProduct = async (id) => {
        const response = await axios.get(`http://localhost:3000/products/${id}`)
        return (response.data)
    }

    const fetchImage = async (id) => {
        const response = await axios.get(`http://localhost:3000/products/img/${id}`)
        return (response.data[0].Url)
    }

    const getProList = async () => {
        window.scrollTo(0, 0);
        const compareList = JSON.parse(sessionStorage.getItem('compareList'));
        const products = await Promise.all(compareList.map(async (compareId) => {
            return await fetchProduct(compareId.productId);
        }));
        setProduct(products);
        console.log(products)
    };

    const handleDelete = (id) => {
        const compareList = JSON.parse(sessionStorage.getItem('compareList'));
        const updatedCompareList = compareList.filter(compareItem => compareItem.productId != id);
        sessionStorage.setItem('compareList', JSON.stringify(updatedCompareList));
        getProList()
    };

    useEffect(() => {
        getProList()
    }, [])

    return (
        <div>
            <UserProvider>
                <Header />
                <Navbar />
            </UserProvider>
            <div className="font-bold text-xl text-center my-4">So sánh sản phẩm</div>
            <div className="w-5/6 mx-auto mt-4 mb-8 pb-72 flex text-center ">
                <TableContainer component={Paper} >
                        <TableHead>
                            <TableRow>
                                <TableCell>Ảnh</TableCell>
                            <TableCell>Tên sản phẩm</TableCell>
                            <TableCell>Mô tả</TableCell>
                                <TableCell> Hình dáng</TableCell>
                                <TableCell>Chất Liệu</TableCell>
                            <TableCell>Giá</TableCell>
                            <TableCell>Loại chim</TableCell>
                            <TableCell>Kích thước</TableCell>
                            <TableCell></TableCell>

                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                    <TableBody>
                        {product.map((pro) => (
                            <TableRow key={pro.Id }>
                                <TableCell>
                                    <img className="w-32 h-32" src={pro.Url} />
                                </TableCell>
                                <TableCell>{pro.Name}</TableCell>
                                <TableCell>{pro.Description}</TableCell>
                                <TableCell>{pro.Shape}</TableCell>
                                <TableCell>{pro.material}</TableCell>
                                <TableCell>
                                    {parseInt((pro.Price * (100 - pro.discount)) / 100).toLocaleString('vi', {
                                        style: 'currency',
                                        currency: 'VND'
                                    })}
                                </TableCell>
                                <TableCell>{pro.SuitableBird}</TableCell>
                                <TableCell>{pro.Size}</TableCell>
                                <TableCell><Button onClick={() => handleDelete(pro.Id) }>Delete</Button></TableCell>
                                
                            </TableRow>
                        )) }
                            
                        </TableBody>
                </TableContainer>
            </div>
        </div>
    )
}
