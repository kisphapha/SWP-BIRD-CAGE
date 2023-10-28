import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import Custom from './Pages/Custom'
import Test from './Pages/Test'
import ProductDetails from './Pages/ProductDetail'
import FilteredPage from './Pages/FilteredPage'
import { UserProvider } from './UserContext'
import AdminLayout from './layouts/AdminLayout'
import UserLayout from './layouts/UserLayout'
import NewProduct from './Pages/Admin/NewProduct'
import Products from './Pages/Admin/Products'
import NewCoupon from './Pages/Admin/NewCoupon'
import Dashboard from './Pages/Admin/Dashboard'
import Attribute from './Pages/Admin/Attribute'
import Categories from './Pages/Admin/Categories'
import Collection from './Pages/Admin/Collections'
import Order from './Pages/Admin/Order'
import Users from './Pages/Admin/User'
import Coupons from './Pages/Admin/Coupons'
import ProfilePage from './Pages/UserPage/ProfilePage'
import AddressPage from './Pages/UserPage/AddressPage'
import PurchasePage from './Pages/UserPage/PurchasePage'
import LoginCard from './components/features/LoginCard'
import VNPaySuccess from './Pages/VNPay/Success'

import GeneralPolicy from './Pages/NaviFooter/Policy/GeneralPolicy'
import PaymentPolicy from './Pages/NaviFooter/Policy/PaymentPolicy'
import ReturnPolicy from './Pages/NaviFooter/Policy/ReturnPolicy'
import SecurePolicy from './Pages/NaviFooter/Policy/SecurePolicy'
function App() {
    return (
        <div>
            <Routes>
                <Route element={<UserLayout />} path="/">
                    <Route element={<Home />} path="" />
                    <Route element={<LoginCard />} path="/login" />
                    <Route element={<ProductDetails />} path="/products/:productId" />
                    <Route element={<GeneralPolicy />} path="/GeneralPolicy" />
                    <Route element={<PaymentPolicy />} path="/PaymentPolicy" />
                    <Route element={<ReturnPolicy />} path="/ReturnPolicy" />
                    <Route element={<SecurePolicy />} path="/SecurePolicy" />
                    <Route
                        element={
                            <UserProvider>
                                <ProfilePage />
                            </UserProvider>
                        }
                        path="/user/profile"
                    />
                    <Route
                        element={
                            <UserProvider>
                                <AddressPage />
                            </UserProvider>
                        }
                        path="/user/address"
                    />
                    <Route
                        element={
                            <UserProvider>
                                <PurchasePage />
                            </UserProvider>
                        }
                        path="/user/purchase"
                    />
                    <Route element={<Cart />} path="cart" />
                    <Route element={<FilteredPage />} path="/filter/:filter/:keyword" />
                    <Route element={<Custom />} path="/Custom" />
                    <Route element={<VNPaySuccess />} path="/test" />
                    <Route element={<Custom /> } path="/custom"/>
                </Route>

                <Route element={<AdminLayout />} path="/admin">
                    <Route element={<Dashboard />} path="" />
                    <Route element={<NewCoupon />} path="NewCoupon" />
                    <Route element={<NewProduct />} path="NewProduct" />
                    <Route element={<Products />} path="Products" />
                    <Route element={<Categories />} path="Categories" />
                    <Route element={<Collection />} path="Collection" />
                    <Route element={<Attribute />} path="Attribute" />
                    <Route element={<Order />} path="Orders" />
                    <Route element={<Users />} path="Users" />
                    <Route element={<Coupons />} path="Coupons" />
                </Route>
            </Routes>
        </div>
    )
}

export default App
