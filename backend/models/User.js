const config = require("../config/db.config");
const sql = require("mssql");

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

const getUserByEmail = async (email) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query(
            `SELECT * FROM [dbo].[User] WHERE email = '${email}'`
        );
        return result.recordset[0];
    } catch (error) {
        console.log("error: ", error);
    }
};
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
        return getUserByEmail(email)
    } catch (error) {
        console.log("error: ", error);
    }
};

const getPointForUser = async(id, point) => {
    try {
        let poolConnection = await sql.connect(config);
        await poolConnection.request()
        .input('id', id)
        .input('point', point)
        .query(`
            UPDATE dbo.[User]
            SET Point = Point + @point 
            WHERE Id = @id
        `)
    } catch (error) {
        console.log("error: ", error);
    }
}

module.exports = {
    getAllUser,
    getUserByEmail,
    newUser,
    updateUser,
    getPointForUser
};
