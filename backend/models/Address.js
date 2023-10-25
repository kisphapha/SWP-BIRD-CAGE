const config = require("../config/db.config");
const sql = require("mssql");

const newAddress = async (city,district,ward,location,userid) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection
            .request()
            .query(`INSERT INTO UserAddress (SoNha,PhuongXa,QuanHuyen,TinhTP,Userid)
                VALUES (N'${location}',N'${ward}',N'${district}',N'${city}','${userid}')`);
        return result.recordset;
    } catch (error) {
        console.log("error", error);
    }
};

const getAddressOfUser = async (userid) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection
            .request()
            .query(`SELECT * FROM UserAddress WHERE userId = ${userid}`);
        return result.recordset;
    } catch (error) {
        console.log("error", error);
    }
};

const updateAddress = async (id, sonha, phuongxa, quanhuyen, tinhtp) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query(`
           UPDATE UserAddress SET SoNha=N'${sonha}',PhuongXa=N'${phuongxa}',QuanHuyen=N'${quanhuyen}',TinhTP=N'${tinhtp}' WHERE id=${id}
        `)
    } catch (error) {
        console.log("error: ", error)
    }
}

const deleteAddress = async (id) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query(`
           DELETE FROM UserAddress WHERE id=${id}
        `)
    } catch (error) {
        console.log("error: ", error)
    }
}



module.exports = {
    newAddress,
    getAddressOfUser,
    updateAddress,
    deleteAddress
}