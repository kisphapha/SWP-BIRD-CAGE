const config = require("../config/db.config");
const sql = require("mssql");

const getOrderBy5Month = async () => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection
            .request()
            .query(`
                
            `
            );
        return result.recordset;
    } catch (error) {
        console.log("error", error);
    }
};

const getBestSellingProducts = async () => {
    try{
        let poolConnection = await sql.connect(config);
        const result  = await poolConnection.request()
            .query(`
            WITH sales_data AS (
                SELECT
                ProductId,
                SUM(quantity) AS total_quantity_sold
                FROM
                orders
                JOIN
                dbo.OrderItem ON OrderItem.OrdersId = Orders.Id
                GROUP BY
                ProductId
                )
                SELECT
                products.Id,
                products.Name,
                sales_data.total_quantity_sold
                FROM
                products
                JOIN
                sales_data ON products.Id = sales_data.ProductId
                ORDER BY
                sales_data.total_quantity_sold DESC
            `);
        return result.recordset;
    }catch (error) {
        console.log("error: ", error);
    }
}

const getAllUser = async () => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query(
            `SELECT * FROM [dbo].[User]`
        );
        return result.recordset;
    } catch (error) {
        console.log("error: ", error);
    }
}

const newUser = async (name, email, picture) => {
    try {
        let poolConnection = await sql.connect(config);
        await poolConnection.request().query(
            `INSERT INTO [User] (Name,email,picture,Role,point,Status,CreatedAt) 
            VALUES (N'${name}','${email}','${picture}','User',0,'Active',GETDATE())`
        );
    } catch (error) {
        console.log("error: ", error);
    }
};

const updateUser = async (name, email, phone, dateOfBirth) => {
    try {
        let poolConnection = await sql.connect(config);
        await poolConnection.request().query(
            `UPDATE [User] 
            SET Name=N'${name}',PhoneNumber='${phone}',DateOfBirth='${dateOfBirth}'
            WHERE Email='${email}'`
        );
    } catch (error) {
        console.log("error: ", error);
    }
};


const deleteUser = async (userId, status, ReasonBlock) => {
    try {
        let poolConnection = await sql.connect(config);
        await poolConnection.request().query(
            `
                UPDATE dbo.[User]
                SET BlockDate = GETDATE(), ReasonBlocked= N'${ReasonBlock}', Status = '${status}' 
                WHERE Id = ${userId}
            `
        );
    }catch (error){
        console.log("error: ", error);
    }
}


const loadUnSeen = async () => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request()
        .input('id', id)
        .query(
            `SELECT * FROM dbo.Orders 
             WHERE View_Status = 0
            `
        )
        return result.recordset;
    } catch (error) {
        console.log("Error: " , error)
    }
}

const changetoSeen = async() => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request()
        .input('id', id)
        .query(
            ` 
            UPDATE dbo.Orders
            SET  View_Status = 1
            `
        )
    } catch (error) {
        console.log("error: ", error);
    }
}

const getMonthLyIncome = async() => {
    try {
       let poolConnection= await sql.connect(config);
       const result = await poolConnection.request().query(`
       SELECT DISTINCT DATEPART(MONTH, PaymentDate) AS Month, SUM(TotalAmount) AS revenue
       FROM dbo.Orders
       WHERE Status_Paid = 'Paid' 
       GROUP BY  DATEPART(MONTH, PaymentDate)
       `) 
        return result.recordset;
    } catch (error) {
        console.log("error: ", error)
    }
}

const deleteJunkData = async() => {
    try {
        let poolConnection= await sql.connect(config);
        const result = await poolConnection.request().query(`
            DELETE dbo.OrderItem WHERE OrdersId IN (  SELECT id FROM dbo.Orders
            WHERE PaymentDate IS NULL AND AddressID IS NULL )
            DELETE dbo.Orders
            WHERE PaymentDate IS NULL AND AddressID IS NULL 
        `) 
    } catch (error) {
        console.log("error: ", error);
    }
} 

const orderStatisticByMonth = async (month,year) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request()
            .input('Month', sql.Int, month)
            .input('Year', sql.Int, year)
            .query(
                ` 
                CREATE TABLE #Calendar (DayDate DATE);

                DECLARE @StartDate DATE = DATEFROMPARTS(@Year, @Month, 1);
                DECLARE @EndDate DATE = EOMONTH(@StartDate);

                WHILE @StartDate <= @EndDate
                BEGIN
                    INSERT INTO #Calendar (DayDate) VALUES (@StartDate);
                    SET @StartDate = DATEADD(DAY, 1, @StartDate);
                END;

                SELECT CONCAT(DAY(c.DayDate), '/', MONTH(c.DayDate)) AS MonthDay, ISNULL(SUM(o.TotalAmount), 0) AS TotalAmount
                FROM #Calendar c
                LEFT JOIN Orders o ON CAST(o.OrderDate AS DATE) = c.DayDate
                GROUP BY c.DayDate
                ORDER BY c.DayDate;

                DROP TABLE #Calendar;
            `
        )
        return result.recordset;
    } catch (error) {
        console.log("error: ", error);
    }
}

module.exports = {
    getOrderBy5Month,
    getBestSellingProducts,
    getAllUser,
    updateUser,
    newUser,
    deleteUser,
    loadUnSeen,
    deleteJunkData,
    orderStatisticByMonth,
    getMonthLyIncome,
    changetoSeen
};

