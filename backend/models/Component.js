const config = require("../config/db.config");
const sql = require("mssql");

const getAllComponent = async (Type, CateID) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request()
        .input('Type', Type)
        .input('CateId', CateID)
        .query(`
            select * from ComponentDetail
            JOIN dbo.ComponentDetail_Category 
            ON ComponentDetail_Category.ComponentID = ComponentDetail.ID
            WHERE Type = @Type AND CateID = @CateID
        `)
        return result.recordset;
    } catch (error) {
        console.log("error: ", error)
    }
}

module.exports  = {
    getAllComponent
}