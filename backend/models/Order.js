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
        const result = await poolConnection.request().query(
            `select *
             from Orders
             where Orders.UserID = ${id}`
        );
        return result.recordset;
    } catch (error) {
        console.log("error: ", error);
    }
};

const getOrderById = async (id) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query(
            `select *
             from Orders
             where Orders.id = ${id}`
        );
        return result.recordset[0];
    } catch (error) {
        console.log("error: ", error);
    }
};

const addOrderToDB = async (UserID, OrderDate, PaymentDate, ShippingAddress, PhoneNumber, Note, TotalAmount, PaymentMethod, Status, Items) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request()
            .input('UserID', sql.Int, UserID)
            .input('OrderDate', sql.DateTime, OrderDate)
            .input('PaymentDate', sql.DateTime, PaymentDate)
            .input('AddressID', sql.Int, ShippingAddress)
            .input('PhoneNumber', sql.NVarChar, PhoneNumber)
            .input('Note', sql.NVarChar, Note)
            .input('TotalAmount', sql.Int, TotalAmount)
            .input('PaymentMethod', sql.NVarChar, PaymentMethod)
            .input('Status', sql.NVarChar, Status)
            .query(`
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
                    [Status],
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
            `);
        Items.forEach(item => {
            poolConnection.request()
                .input('ProductId', sql.Int, item.id)
                .input('Quantity', sql.Int, parseInt(item.quantity))
                .input('Price', sql.Int, parseInt(item.price))
                .query(`
                INSERT INTO OrderItem(
                    ProductId,
                    OrdersId,
                    Quantity,
                    Price,
                    CreatedAt
                ) VALUES (
                    @ProductId,
                    (SELECT 
                        TOP 1 Id 
                    FROM 
                        Orders 
                    ORDER BY 
                        Id DESC),
                    @Quantity,
                    @Price,
                    GETDATE()
                )               
                `)
        });
        return result.recordset[0].Id;
    } catch (error) {
        console.log("error: ", error);
    }
}

const changeStatus_Paid = async (id) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query(
            ` UPDATE dbo.Orders
              SET Status_Paid = 'Paid', View_Status = 0
              WHERE id = ${id}
              `
        )
    } catch (e) {
        console.log("error: ", e);
    }
}


const getAllOrderItemByOrderID = async (id) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query(`
           SELECT p.Id,p.Name, oi.CreatedAt, oi.Price, oi.Quantity, i.Url, o.Status, c.name AS Shape, p.discount
         FROM OrderItem oi, Orders o, Products p, Image i, Category c
         WHERE o.Id = ${id} AND o.Id = oi.OrdersId AND oi.ProductId = p.id AND i.ProductId = p.Id AND p.Category = c.Id

        `)
        return result.recordset;
    } catch (error) {
        console.log("error: ", error)
    }
}


const loadUnSeen = async (id) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request()
        .input('id', id)
        .query(
            `SELECT * FROM dbo.Orders 
             WHERE UserId = @id AND View_Status = 0`

        )
        return result.recordset;
    } catch (error) {
        console.log("Error: " , error)
    }
}

const changetoSeen = async(id) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request()
        .input('id', id)
        .query(
            ` 
            UPDATE dbo.Orders
            SET  View_Status = 1
            WHERE UserID  = @id
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