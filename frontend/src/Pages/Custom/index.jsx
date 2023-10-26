import React from 'react';
import { UserProvider } from '../../UserContext';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';

function CustomPage() {
    return (
        <div>
            <UserProvider>
                <Header />
                <Navbar />
            </UserProvider>
            <div id="custom">
                <div className="custom-page">
                    <h1>Tạo lồng chim của riêng bạn</h1>
                    <label>Loại lồng:</label>
                    <select id="type">
                        <option value="" >Loại lồng</option>
                    </select><br />
                    <label>Chọn loại móc:</label>
                    <select id="Hook">
                        <option value="">Mók tròn</option>
                        <option value=""></option>
                        <option value=""></option>
                    </select><br />
                    <label>Chọn chất liệu:</label>
                    <select id="material">
                        <option value="">Tre</option>
                        <option value=""></option>
                        <option value=""></option>
                    </select><br />
                </div>
            </div>
        </div>
    )
}

export default CustomPage;