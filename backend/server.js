const express = require('express');
const productRoutes = require("./routes/ProductRoute");
const categoryRoutes = require("./routes/CategoryRoute");
const userRoutes = require("./routes/UserRoute");
const orderRoutes = require("./routes/OrderRoute");
const addressRoutes = require("./routes/AddressRoute");
const paymentRoutes = require("./routes/PaymentRoute");
const adminRoutes = require("./routes/AdminRoute");
const shipperRoutes = require("./routes/ShipperRoutes");
const eventLog = require('./helper/logEvent');
const app = express();
const helmet = require('helmet'); // make web more secure
const hostname = 'localhost';
const port = 3000;
const cors = require('cors');

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
// jsdsdf


console.log("Starting... at port: " ,port);

app.listen(port, hostname), () => {
    console.log(`Server is running on port ${port}`);
};