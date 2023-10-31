const config = require("../config/db.config");
const sql = require("mssql");

const getAllComponent = async() => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query(`
            select * from ComponentDetail
        `)
        return result.recordset;
    } catch (error) {
        console.log("error: ", error)
    }
}




module.exports  = {
    getAllComponent
}