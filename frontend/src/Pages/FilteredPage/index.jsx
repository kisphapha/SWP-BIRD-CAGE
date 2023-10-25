import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/common/Header'
import Navbar from '../../components/common/Navbar'
import './styles.css'
import CardListExtend from '../../components/features/CardListExtend'
import axios from 'axios'
import { UserProvider } from '../../UserContext'
import CategoryNav from '../../components/features/CategoryNav'

export default function FilteredPage() {
    const { filter, keyword } = useParams()
    const [search, setSearch] = useState([])
    const [proList, setProList] = useState([])

    useEffect(() => {
        getCardListFilter(filter, keyword)
    }, [])

    async function fetchCate() {
        const response = await axios.get(`http://localhost:3000/category/${keyword}`)
        setSearch(response.data[0].Name)
    }

    const getCardListFilter = async (filter, keyword) => {
        if (filter == 1) {
            const response = await axios.get('http://localhost:3000/products/cate/' + keyword)
            setProList(response.data)
            fetchCate()
        } else if (filter == 2) {
            const response = await axios.get('http://localhost:3000/products/search/' + keyword)
            setProList(response.data)
            setSearch('Kết quả tìm kiếm cho: ' + keyword)
        }
    }

    return (
        <div id="page_home">
            <UserProvider>
                <Header />
                <Navbar />
            </UserProvider>

            <main id="body">
                {/* <div className="body-logo">
                    { <img className="logo-img" src="https://wallpapers.com/images/featured/soft-aesthetic-cei80uravrnl6ltm.jpg" /> }
                </div>
                <div className="body-bottom">
                    <div className="des">
                        <h2>Bica – Shop Mua Bán Lồng Chim Đẹp Giá Rẻ & Cao Cấp</h2>
                    </div>
                </div> */}
                <CategoryNav parents={[{ name: 'Trang chủ', link: '/' }]} current={search}></CategoryNav>
                <CardListExtend categoryId={keyword} proList={proList} />
            </main>
        </div>
    )
}
