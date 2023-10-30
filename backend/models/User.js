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
        const query = `
            SELECT *
            FROM [dbo].[User]
            WHERE email = @Email;
        `;
        const result = await poolConnection.request()
            .input('Email', sql.NVarChar, email)
            .query(query);
        return result.recordset[0];
    } catch (error) {
        console.log("error: ", error);
    }
};

const newUser = async (name, email, picture) => {
    try {
        let poolConnection = await sql.connect(config);
        const query = `
            INSERT INTO [User] (Name, email, picture, Role, point, Status, CreatedAt) 
            VALUES (@Name, @Email, @Picture, 'User', 0, 'Active', GETDATE());
        `;
        await poolConnection.request()
            .input('Name', sql.NVarChar, name)
            .input('Email', sql.NVarChar, email)
            .input('Picture', sql.NVarChar, picture)
            .query(query);
    } catch (error) {
        console.log("error: ", error);
    }
};

const updateUser = async (name, email, phone, dateOfBirth) => {
    try {
        let poolConnection = await sql.connect(config);
        const query = `
            UPDATE [User]
            SET Name = @Name, PhoneNumber = @Phone, DateOfBirth = @DateOfBirth
            WHERE Email = @Email;
        `;
        await poolConnection.request()
            .input('Name', sql.NVarChar, name)
            .input('Phone', sql.NVarChar, phone)
            .input('DateOfBirth', sql.NVarChar, dateOfBirth)
            .input('Email', sql.NVarChar, email)
            .query(query);
        return getUserByEmail(email);
    } catch (error) {
        console.log("error: ", error);
    }
};


module.exports = {
    getAllUser,
    getUserByEmail,
    newUser,
    updateUser,
};
