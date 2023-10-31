const express = require('express');
const productRoutes = require("./routes/ProductRoute");
const categoryRoutes = require("./routes/CategoryRoute");
const userRoutes = require("./routes/UserRoute");
const orderRoutes = require("./routes/OrderRoute");
const addressRoutes = require("./routes/AddressRoute");
const paymentRoutes = require("./routes/PaymentRoute");
const adminRoutes = require("./routes/AdminRoute");
const shipperRoutes = require("./routes/ShipperRoutes");
const componentRouter = require("./routes/ComponentRoute");
const eventLog = require('./helper/logEvent');
const app = express();
const helmet = require('helmet'); // make web more secure
const hostname = 'localhost';
var cron = require('node-cron');
const port = 3000;
const cors = require('cors');
const axios = require('axios')

app.use(helmet());
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

app.use(express.json());
app.use((err,req, res, next) => {
    eventLog(err.statusMessage);
    res.status(err.status || 500);
    res.json()
})
app.use("/products", productRoutes);
app.use("/category", categoryRoutes);
app.use("/users", userRoutes);
app.use("/order", orderRoutes);
app.use("/address", addressRoutes);
app.use("/admin", adminRoutes);
app.use("/payment",paymentRoutes);
app.use("/shipper", shipperRoutes);
app.use("/component", componentRouter);





console.log("Starting... at port: " ,port);

app.listen(port, hostname, () => {
    console.log(`Server is running on port ${port}`);

    // dùng để xóa data rác nên demo 15s
    // hiện là phút thứ 55 sẽ chạy câu lệnh
    // cron.schedule('* 55 * * * *',async () => {
    //     const res = await axios.get("http://localhost:3000/admin/deleteJunkData")
    //     console.log(res.data);
    //     // http://localhost:3000/admin/deleteJunkData
    // });
});
