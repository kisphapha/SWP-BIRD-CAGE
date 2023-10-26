const config = require("../config/db.config");
const sql = require("mssql");

const changeShippingState = async(id, status) => {
    try {
        let poolConnection = await sql.connect(config);
         var newStatus  = status === 'Delivered' ? 'Delivered' : 'Failed';
         const result  = await poolConnection.request().query(
                `
                 UPDATE dbo.Orders
                 SET Status_Shipping = '${newStatus}'
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