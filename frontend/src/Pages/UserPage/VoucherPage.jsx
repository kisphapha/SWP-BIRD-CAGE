import React, { useContext } from 'react'
import { UserContext, UserProvider } from '../../UserContext'
import Header from '../../components/common/Header'
import Navbar from '../../components/common/Navbar'
import CategoryNav from '../../components/features/CategoryNav'
import UserUtilities from '../../components/common/UserUtilities'
import voucherImage from '../../image/icons/voucher.png'
import { Button } from '@mui/material'

export default function VoucherPage() {
    const { user } = useContext(UserContext)

    return (
        <div className="user-page">
            <UserProvider>
                <Header />
                <Navbar />
            </UserProvider>
            <CategoryNav parents={[{ name: 'Trang chủ', link: '/' }]} current="Hồ sơ"></CategoryNav>
            <div className="user-container">
                {user != null ? <UserUtilities user={user} /> : <div>Loading...</div>}
                <div className="user-view">
                    <div>
                        <div className="form-header">
                            <h1>Mã giảm giá của tôi</h1>
                            <p>Áp dụng ngay nào </p>
                        </div>
                        <div className="flex-col bg-slate-50 m-2 p-2 rounded-lg">
                            <div>Hết hạn: 14/11/2023 </div>
                            <div className="flex place-content-between">
                                <div className=" flex my-2">
                                    <div className="w-32">
                                        <img src={voucherImage} alt="" />
                                    </div>
                                    <div>Mã giảm giá ....% </div>
                                </div>
                                <div>
                                    <div>Số lượng : x...</div>
                                    <Button variant="contained" s>
                                        {' '}
                                        Dùng ngay
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
