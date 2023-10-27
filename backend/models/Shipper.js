const config = require("../config/db.config");
const sql = require("mssql");

const changeShippingState = async(id, status) => {
    try {
        console.log(id, status);
        let poolConnection = await sql.connect(config);
         const result  = await poolConnection.request().query(
                `
                 UPDATE dbo.Orders
                 SET Status_Shipping = '${status}'
                 WHERE id = ${id};
            `   
            );
    }catch (error) {
        console.log("error: ", error);
    }
}



module.exports = {
    changeShippingState
}