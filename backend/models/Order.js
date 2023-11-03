const config = require("../config/db.config")
const sql = require("mssql");

const getAllOrder = async () => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query(
            `SELECT *
             FROM [dbo].[Orders]`
        );
        return result.recordset;
    } catch (error) {
        console.log("error: ", error);
    }
};

const getOrderByUserId = async (id) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request()
            .input("ID",sql.Int, id)
            .query(
            `select *
             from Orders
             where Orders.UserID = @Id
             order by Id DESC`
        );
        return result.recordset;
    } catch (error) {
        console.log("error: ", error);
    }
};

const getOrderById = async (id) => {
    try {
        let poolConnection = await sql.connect(config);
        const query = `
            SELECT *
            FROM Orders
            WHERE Orders.id = @Id
        `;
        const result = await poolConnection.request()
            .input('Id', sql.Int, id)
            .query(query);
        return result.recordset[0];
    } catch (error) {
        console.log("error: ", error);
    }
};

const addOrderToDB = async (UserID, OrderDate, PaymentDate, ShippingAddress, PhoneNumber, Note, TotalAmount, PaymentMethod, Items) => {
    try {
        let poolConnection = await sql.connect(config);
        const orderQuery = `
            INSERT INTO dbo.Orders
            (
                [UserID],
                [OrderDate],
                [PaymentDate],
                [AddressID],
                [PhoneNumber],
                [Note],
                [TotalAmount],
                [PaymentMethod],
                [IsDeleted],
                [CreateAt],
                [UpdateAt],
                [View_Status],
                [Status_Shipping],
                [Status_Paid]
            )
            OUTPUT INSERTED.Id
            VALUES
            (
                @UserID,
                @OrderDate,
                @PaymentDate,
                @AddressID,
                @PhoneNumber,
                @Note,
                @TotalAmount,
                @PaymentMethod,
                0,
                GETDATE(),
                GETDATE(),
                @Status,
                0,
                N'Chờ duyệt',
                'UnPaid'
            );
        `;
        const orderRequest = poolConnection.request()
            .input('UserID', sql.Int, UserID)
            .input('OrderDate', sql.DateTime, OrderDate)
            .input('PaymentDate', sql.DateTime, PaymentDate)
            .input('AddressID', sql.Int, ShippingAddress)
            .input('PhoneNumber', sql.NVarChar, PhoneNumber)
            .input('Note', sql.NVarChar, Note)
            .input('TotalAmount', sql.Int, TotalAmount)
            .input('PaymentMethod', sql.NVarChar, PaymentMethod)
            .input('Status', sql.NVarChar, Status);
        const orderResult = await orderRequest.query(orderQuery);
        const orderId = orderResult.recordset[0].Id;
        for (const item of Items) {
            const itemQuery = `
                INSERT INTO OrderItem(
                    ProductId,
                    OrdersId,
                    Quantity,
                    Price,
                    CreatedAt
                ) VALUES (
                    @ProductId,
                    @OrderId,
                    @Quantity,
                    @Price,
                    GETDATE()
                );
            `;
            const itemRequest = poolConnection.request()
                .input('ProductId', sql.Int, item.id)
                .input('OrderId', sql.Int, orderId)
                .input('Quantity', sql.Int, parseInt(item.quantity))
                .input('Price', sql.Int, parseInt(item.price));
            await itemRequest.query(itemQuery);
        }
        return orderId;
    } catch (error) {
        console.log("error: ", error);
    }
};

const changeStatus_Paid = async (id) => {
    try {
        let poolConnection = await sql.connect(config);
        const query = `
            UPDATE dbo.Orders
            SET Status_Paid = 'Paid'
            WHERE id = @Id;
        `;
        const result = await poolConnection.request()
            .input('Id', sql.Int, id)
            .query(query);
    } catch (e) {
        console.log("error: ", e);
    }
};

const getAllOrderItemByOrderID = async (id) => {
    try {
        let poolConnection = await sql.connect(config);
        const query = `
            SELECT p.Id, p.Name, oi.CreatedAt, oi.Price, oi.Quantity, i.Url, c.name AS Shape, p.discount
            FROM OrderItem oi
            INNER JOIN Orders o ON o.Id = oi.OrdersId
            INNER JOIN Products p ON oi.ProductId = p.id
            INNER JOIN Category c ON p.Category = c.Id
            JOIN (
                SELECT Image.*, ROW_NUMBER() OVER (PARTITION BY ProductId ORDER BY Id) AS RowNum
                FROM Image
            ) i ON i.ProductId = p.id AND i.RowNum = 1
            WHERE o.Id = @OrderId;
        `;
        const result = await poolConnection.request()
            .input('OrderId', sql.Int, id)
            .query(query);
        return result.recordset;
    } catch (error) {
        console.log("error: ", error);
    }
};


const loadUnSeen = async (id) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request()
        .input('id', id)
        .query(
            `SELECT * FROM dbo.Orders 
             WHERE UserID = @id`

        )
        return result.recordset;
    } catch (error) {
        console.log("Error: " , error)
    }
}

const changetoSeen = async(id, userid) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request()
        .input('id', id)
        .input('userid', userid)
        .query(
            ` 
            UPDATE dbo.Orders
            SET View_Status = 1
            WHERE UserID = @userid
            AND Id = @id
            `
        )
    } catch (error) {
        console.log("error: ", error);
    }
}

module.exports = {
    getAllOrder,
    getOrderById,
    addOrderToDB,
    changeStatus_Paid,
    getAllOrderItemByOrderID,
    getOrderByUserId,
    loadUnSeen,
    changetoSeen
}