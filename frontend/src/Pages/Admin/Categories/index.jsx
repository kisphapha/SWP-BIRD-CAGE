import { Radio, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import axios from 'axios'
import CategoryNav from '../../../components/features/CategoryNav'
export default function Categories() {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        axios
            .get('http://localhost:3000/category')
            .then((response) => {
                setCategories(response.data)
            })
            .catch((error) => {
                console.error('Error fetching category data:', error)
            })
    }, [])

    const status = [
        {
            value: 'False',
            label: 'False'
        },
        {
            value: 'True',
            label: 'True'
        }
    ]
    return (
        <div className="px-2 py-2 w-full  mb-96">
            <div className="flex-col">
                <CategoryNav
                    parents={[{ name: 'Trang chủ', link: '/' }, { name: 'Bảng điều khiển', link: '/admin' }]}
                    current="Danh mục sản phẩm"
                    margin={0}
                    />
                {/* <Button onClick={() => '/admin/NewProduct'}>New Product</Button> */}
            </div>

            <div className="my-5 text-2xl font-bold">Danh mục sản phẩm</div>

            <table className="bg-white px-4   gap-14 w-full">
                <tr className="items-center flex  h-10 w-full">
                    <th className="w-32">
                        <div> </div>
                    </th>
                    <th className="w-2/4 text-left ml-8 pl-8">Category Name</th>
                    <th className="w-1/6 text-left ml-3">Category ID </th>
                    <th className="w-1/6 text-left ml-36">Status </th>
                </tr>
                {/*<tr className="items-start flex  px-4 gap-6 w">*/}
                {/*    <th className="w-2/4  pl-20  flex items-start">*/}
                {/*        <TextField className=" w-3/5 " id="outlined-basic" label="Name" variant="standard" />*/}
                {/*    </th>*/}
                {/*    <th className="w-1/4 pl-12  flex items-start">*/}
                {/*        <TextField className="w-16" id="outlined-basic" label="ID" variant="standard" />*/}
                {/*    </th>*/}

                {/*    <th className="w-1/6">*/}
                {/*        <TextField className="text-left" fullWidth select label="Status" variant="filled">*/}
                {/*            {status.map((option) => (*/}
                {/*                <MenuItem key={option.value} value={option.value}>*/}
                {/*                    {option.label}*/}
                {/*                </MenuItem>*/}
                {/*            ))}*/}
                {/*        </TextField>*/}
                {/*    </th>*/}
                {/*</tr>*/}
                {categories.map((category) => (
                    <div key={category.id}>
                        <hr className="my-2" />
                        <tr className="items-start flex px-4 gap-6 w ">
                            <th className="mr-4">
                                <img
                                    className="w-12 h-12"
                                    src={
                                        category.imageUrl != null
                                            ? category.imageUrl
                                            : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png'
                                    }
                                    alt={category.name}
                                />
                            </th>
                            <th className="w-2/4 flex items-start">{category.name}</th>
                            <th className="w-1/4 pl-8 flex items-start">{category.id}</th>
                            <th className="w-1/6 ">Available</th>
                        </tr>
                    </div>
                ))}
            </table>
        </div>
    )
}
