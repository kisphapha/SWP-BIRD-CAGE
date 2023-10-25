/* eslint-disable react/jsx-key */
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Axios from 'axios'
import Popup from 'reactjs-popup'
import EditProductForm from '../EditProductForm/index'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'

export default function Products() {
    const [products, setProducts] = useState([])
    const [cate, setCate] = useState([])
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [upperPrice, setUpperPrice] = useState('')
    const [lowerPrice, setLowerPrice] = useState('')
    const [upperStock, setUpperStock] = useState('')
    const [lowerStock, setLowerStock] = useState('')
    const [prostatus, setProStatus] = useState('')

    const handleIdChange = (event) => {
        setId(event.target.value)
    }
    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    }

    const handleUpperPriceChange = (event) => {
        setUpperPrice(event.target.value)
    }

    const handleLowerPriceChange = (event) => {
        setLowerPrice(event.target.value)
    }

    const handleUpperStockChange = (event) => {
        setUpperStock(event.target.value)
    }

    const handleLowerStockChange = (event) => {
        setLowerStock(event.target.value)
    }

    const handleStatusChange = (event) => {
        setProStatus(event.target.value)
    }

    async function handleDelete(id) {
        await axios.delete(`http://localhost:3000/products/` + id)
        alert('Product deleted')
        fetchProducts()
    }

    const handleFilter = async () => {
        const json = {
            id: id,
            name: name,
            category: category,
            upper_price: upperPrice,
            lower_price: lowerPrice,
            upper_stock: upperStock,
            lower_stock: lowerStock,
            status: prostatus,
            page: '1'
        }
        Axios.post('http://localhost:3000/products/filter/', json)
            .then((response) => {
                console.log(json)
                console.log(response.data)
                setProducts(response.data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }
    async function fetchProducts() {
        Axios.get('http://localhost:3000/products')
            .then((response) => {
                setProducts(response.data)
            })
            .catch((error) => {
                console.error('Error fetching category data:', error)
            })
    }
    async function fetchCates() {
        Axios.get('http://localhost:3000/category')
            .then((response) => {
                setCate(response.data)
            })
            .catch((error) => {
                console.error('Error fetching category data:', error)
            })
    }

    useEffect(() => {
        fetchProducts()
        fetchCates()
    }, [])
    const status = [
        {
            value: 'All',
            label: 'All'
        },
        {
            value: 'Enable',
            label: 'Enable'
        },
        {
            value: 'Disable',
            label: 'Disable'
        }
    ]

    return (
        <div className="px-2 py-2 w-full  mb-96">
            <div className="flex-col">
                <div className="my-5">Product</div>
                {/* <Button onClick={() => '/admin/NewProduct'}>New Product</Button> */}
            </div>
            <table className="bg-white w-full m-2">
                <thead>
                    <tr className="items-center flex h-10 w-full">
                        <th className="w-1/12 text-left pl-2">Mã SP</th>
                        <th className="w-1/6 text-left">Tên sản phẩm</th>
                        <th className="w-1/12 text-left"></th>
                        <th className="w-1/6 text-left ml-12">Giá</th>
                        <th className="w-1/6 text-left">Số lượng</th>
                        <th className="w-1/6 text-left">Phân loại</th>
                        <th className="w-1/6 text-left">Status</th>
                        {/* <th className="w-1/12 text-left"></th> */}
                    </tr>
                </thead>
                <tbody>
                    <tr className="items-center flex w-full  space-x-4　">
                        <td className="w-1/12 pl-2">
                            <TextField className="w-16" id="outlined-basic" label="Mã SP" variant="standard" onChange={handleIdChange} />
                        </td>
                        <td className="w-1/6">
                            <TextField className="w-64" id="outlined-basic" label="Tên sản phẩm" variant="standard" onChange={handleNameChange} />
                        </td>
                        <td className="w-1/6 flex gap-4 ml-24 pl-8">
                            <TextField className="w-16" id="outlined-basic" label="From" variant="standard" onChange={handleLowerPriceChange} />
                            <TextField className="w-16" id="outlined-basic" label="To" variant="standard" onChange={handleUpperPriceChange} />
                        </td>
                        <td className="w-1/6 flex gap-4 pl-8 ">
                            <TextField className="w-12" id="outlined-basic" label="From" variant="standard" onChange={handleLowerStockChange} />
                            <TextField className="w-12" id="outlined-basic" label="To" variant="standard" onChange={handleUpperStockChange} />
                        </td>
                        <td className="w-1/5">
                            <TextField className="w-64" select label="Loại" variant="filled" onChange={handleCategoryChange}>
                                <MenuItem value={'All'}>All</MenuItem>
                                {cate.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </td>
                        <td className="w-1/12">
                            <TextField className="w-32 text-left" select label="Status" variant="filled" onChange={handleStatusChange}>
                                {status.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </td>
                        <td className="w-1/12 text-end pr-2">
                            <Button variant="outlined" onClick={handleFilter}>
                                Filter
                            </Button>
                        </td>
                    </tr>
                    {products.map((product) => (
                        <div>
                            <hr className="my-2" />
                            <tr className="items-center flex  w-full">
                                <td className="w-8 mx-2 text-center">{product.Id}</td>
                                <td className="w-16 ">
                                    <img className="w-16 h-16   " src={product.Url} />
                                </td>
                                <td className="w-1/4 mx-2">{product.Name}</td>
                                <td className="w-1/12 ml-12 pr-8 text-right">
                                    {product.Price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                </td>
                                <td className="w-1/6 text-center">{product.Stock}</td>
                                <td className="w-1/6 ml-20">{product.Shape}</td>
                                <td className="w-1/12 text-end ">{product.Status}</td>
                                <td className="w-32 ml-4   ">
                                    {/* Use 'flex' and 'justify-end' to move buttons to the right */}
                                    <div className="flex justify-end">
                                        <Popup
                                            trigger={
                                                <button className="">
                                                    <ModeEditIcon fontSize="medium" />
                                                </button>
                                            }
                                            position="right center"
                                            modal
                                            closeOnDocumentClick={false}
                                            closeOnEscape={false}
                                        >
                                            {(close) => (
                                                <>
                                                    <button className="px-5" onClick={close}>
                                                        X
                                                    </button>
                                                    <EditProductForm productId={product.Id} close={close} fetchProducts={fetchProducts} />
                                                </>
                                            )}
                                        </Popup>
                                        <button onClick={() => handleDelete(product.Id)}>
                                            <DeleteIcon fontSize="medium" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </div>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
