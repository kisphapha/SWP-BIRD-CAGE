const config = require("../config/db.config");
const sql = require("mssql");

const getAllCategory = async () => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query(
            `SELECT c.id,c.name,c.imageUrl,c.Allow_customize from Category c, Products p WHERE p.Category = c.id  
            GROUP BY c.id, c.name,c.imageUrl,c.Allow_customize
            ORDER BY c.id`
        );
        return result.recordset;
    } catch (error) {
        console.log("error: ", error);
    }
}

const getACategory = async (id) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query(
            `SELECT * FROM Category WHERE id = '${id}'`
        );
        return result.recordset;
    } catch (error) {
        console.log("error: ", error);
    }
}

const updateCategory = async (name, imageUrl, Allow_Customize, id) => {
    try {
        let poolConnection = await sql.connect(config);
        await poolConnection.request().query(
            `UPDATE dbo.Category 
            SET Name = '${name}' , imageUrl = '${imageUrl}' , Allow_Customize =  ${Allow_Customize}
            WHERE id  = '${id}'
                  `
        );
    } catch (error) {
        console.log("error: ", error);
    }
};

const deteleCategory = async (id) => {
    try {
        let poolConnection = await sql.connect(config);
        await poolConnection.request().query(
            `
          UPDATE dbo.Category
          SET isHide = 1
          WHERE id = '${id}'
            `

        )
    }catch (error) {
        console.log("error: " , error)
    }
}


const addCategory = async (Id,Name,imageU,Allow_Customize,isHide ) => {
    try {
        let poolConnection = await sql.connect(config);
        await poolConnection.request()
            .query(
            `
                INSERT INTO dbo.Category
              (
                  [Id],
                  [Name],
                  [imageUrl],
                  [Allow_Customize],
                  [isHide]
              )
              VALUES
              (   
                    '${Id}',
                    '${Name}',
                    '${imageU}',
                    ${Allow_Customize},
                    ${isHide}
                  )
            `

        )
    }catch (error) {
        console.log("error: " , error)
    }
}
module.exports = {
    getAllCategory,
    updateCategory,
    deteleCategory,
    addCategory,
    getACategory
}