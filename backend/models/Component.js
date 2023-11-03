const config = require("../config/db.config");
const sql = require("mssql");

const getByComponentCate = async (CateID) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request()
        .input('CateId', CateID)
        .query(`
            select * from ComponentDetail
            JOIN dbo.ComponentDetail_Category 
            ON ComponentDetail_Category.ComponentID = ComponentDetail.ID
            WHERE CateID = @CateID
        `)
        return result.recordset;
    } catch (error) {
        console.log("error: ", error)
    }
}

const getAllComponent = async () => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request()
            .query(`
            select * from ComponentDetail
        `)
        return result.recordset;
    } catch (error) {
        console.log("error: ", error)
    }
}


module.exports  = {
    getAllComponent,
    getByComponentCate
}