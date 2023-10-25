const config = require("../config/db.config");
const sql = require("mssql");

const getAllProducts = async () => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query(
            `SELECT DISTINCT p.*,i.Url,c.name as Shape
            FROM Products p, Image i, Category c
            WHERE i.ProductId = p.id AND p.Category = c.id AND p.isDeleted = 0`
        );
        return result.recordset;
    } catch (error) {
        console.log("error: ", error);
    }
}

const getProductsByCategory = async (code) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query(
            `SELECT DISTINCT p.*,i.Url,c.name as Shape
            FROM Products p, Image i, Category c
            WHERE i.ProductId = p.id AND p.Category = c.id AND Category = '${code}' AND material != 'Custom' AND p.isDeleted = 0`
        );
        return result.recordset;
    } catch (error) {
        console.log("error: ", error);
    }
}

const getProductById = async (id) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query(
            `SELECT p.*,i.Url,c.name as Shape
            FROM Products p, Image i, Category c
            WHERE i.ProductId = p.id AND p.Category = c.id AND i.ProductId = ${id}`
        );
        return result.recordset[0];
    } catch (error) {
        console.log("error: ", error);
    }

};
const getProductByName = async (name) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query(
            `SELECT DISTINCT p.*, i.Url, c.name as Shape
          FROM [dbo].[Products] p, image i, Category c
          WHERE i.ProductId = p.id AND p.Category = c.Id
          AND p.Name LIKE N'%${name}%' AND p.isDeleted = 0`
        );
        return result.recordset;
    } catch (error) {
        console.log("error: ", error);
    }
}

const addNewProductToDB = async (Name, Description, Price, Category, Material, SuitableBird, Discount, Size, Stock, Status) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request()
            .input('Name', sql.NVarChar, Name)
            .input('Description', sql.NVarChar, Description)
            .input('Price', sql.Int, Price)
            .input('Stock', sql.Int, Stock)
            .input('Status', sql.NVarChar, Status)
            .input('Category', sql.NVarChar, Category)
            .input('Size', sql.NVarChar, Size)
            .input('Material', sql.NVarChar, Material)
            .input('SuitableBird', sql.NVarChar, SuitableBird)
            .input('Discount', sql.NVarChar, Discount)
            .query(`
            INSERT INTO dbo.Products
            (
            [Name]
            ,[Description]
            ,[Price]
            ,[Stock]
            ,[Status]
            ,[Category]
            ,[Size]
            ,[material]
            ,[isDeleted]
            ,[CreatedAt]
            ,[UpdateAt]
            ,[SuitableBird]
            ,[discount]
            )
            VALUES
            (
                @Name, 
                @Description, 
                @Price,
                @Stock, 
                @Status, 
                @Category, 
                @Size, 
                @Material, 
                NULL, 
                GETDATE(), 
                GETDATE(),
                @SuitableBird, 
                @Discount
            );
        `);
        return result.recordset;
    } catch (error) {
        console.log("error: ", error);
    }
}

const updateProduct = async (Id, Name, Description, Price, Stock, Category, material, Size, SuitableBird, discount, Status,Url) => {
    try {
        const poolConnection = await sql.connect(config);
        const result = await poolConnection.request()
            .input('Id', sql.Int, Id)
            .input('Name', sql.NVarChar, Name)
            .input('Description', sql.NVarChar, Description)
            .input('Price', sql.Int, Price)
            .input('Stock', sql.Int, Stock)
            .input('Status', sql.NVarChar, Status)
            .input('Size', sql.NVarChar, Size)
            .input('Material', sql.NVarChar, material)
            .input('SuitableBird', sql.NVarChar, SuitableBird)
            .input('Discount', sql.Int, discount)
            .query(`
        UPDATE dbo.Products 
        SET
        [Name] = @Name,
        [Description] = @Description,
        [Price] = @Price,
        [Stock] = @Stock,
        [Status] = @Status,
        [Category] = '${Category}',
        [Size] = @Size,
        [Material] = @Material,
        [UpdateAt] = GETDATE(),
        [SuitableBird] = @SuitableBird,
        [Discount] = @Discount 
        WHERE [Id] = @Id
      `);
      await poolConnection.request()
          .input('Id', sql.Int, Id)
          .query(
        `UPDATE Image SET Url='${Url}' WHERE id=${Id}`
      )
        return result.recordset;
    } catch (error) {
        console.log("error:", error);
    }
}

const getRatingByProductId = async (ProductId) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query(
            `select 
                u.Picture, 
                u.Name, 
                f.StarPoint, 
                f.Content 
            from 
                Feedback f, 
                [User] u 
            where 
                ProductId = ${ProductId} 
                and f.UserId = u.id
`
        )
        return result.recordset;
    } catch (error) {
        console.log("error: ", error)

    }
}

const deleteProduct = async (Id) => {
    try {
        const poolConnection = await sql.connect(config);
        const result = await poolConnection.request()
            .input('Id', sql.Int, Id)
            .query(`
        UPDATE dbo.Products 
        SET isDeleted = 1
        WHERE [Id] = @Id
      `);
        return result.recordset;
    } catch (error) {
        console.log("error:", error);
    }
}

const addRating = async (UserId, ProductId, StarPoint, Content) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query(
            `INSERT INTO dbo.Feedback
                (
                    UserId,
                    ProductId,
                    StarPoint,
                    Content,
                    CreateAt
                )
                VALUES
                (   ${UserId},    
                    ${ProductId}, 
                    ${StarPoint}, 
                    '${Content}', 
                    GETDATE() 
                    )
                    `
        )
        return result.recordset;
    } catch (error) {
        console.log("error: ", error)

    }
}

const paging = async (page, cate) => {
    try {
        const perPage = 2; // so phan tu hien thi trong 1 lan
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query(
            `
                SELECT *
                FROM dbo.Products
                WHERE dbo.Products.Category = '${cate}' AND p.isDeleted = 0
                ORDER BY CreatedAt DESC
                OFFSET ${(page - 1) * perPage} ROWS
                    FETCH NEXT ${perPage} ROWS ONLY
        `
        );
        return result.recordset;
    } catch (e) {
        console.log("error: ", e)
    }
}
const filterProduct = async (id,name,category,upper_price,lower_price,upper_stock,lower_stock,status, page) => {
    try {
        var perPage = 10;
        let poolConnection = await sql.connect(config);
        let checkId = ""
        let checkName = ""
        let checkCate = ""
        let checkStatus = ""
        let checkUpperPrice = ""
        let checkLowerPrice = ""
        let checkUpperStock = ""
        let checkLowerStock = ""

        if (id != null && id != "") checkId = `AND p.id = ${id} `
        if (name != null && name != "") checkName = `AND p.Name LIKE N'%${name}%' `
        if (category != null && category != "" && category != "All") checkCate = `AND c.id = N'${category}' `
        if (status != null && status != "" && status != "All") checkStatus = `AND p.Status = '${status}' `
        if (upper_price != null && upper_price != "") checkUpperPrice = `AND p.Price <= ${upper_price} `
        if (lower_price != null && lower_price != "") checkLowerPrice = `AND p.Price >= ${lower_price} `
        if (upper_stock != null && upper_stock != "") checkUpperStock = `AND p.Stock <= ${upper_stock} `
        if (lower_stock != null && lower_stock != "") checkLowerStock = `AND p.Stock >= ${lower_stock} `

        const result = await poolConnection.request().query(
            `
                SELECT DISTINCT p.*, i.Url, c.name as Shape
                FROM Products p
                         JOIN Image i ON i.ProductId = p.id
                         JOIN Category c ON p.Category = c.Id
                WHERE p.isDeleted = 0
                   ${checkCate} 
                   ${checkId}           
                   ${checkName}
                   ${checkStatus} 
                   ${checkUpperPrice} 
                   ${checkLowerPrice} 
                   ${checkUpperStock}
                   ${checkLowerStock} 
                ORDER BY p.CreatedAt DESC
                OFFSET ${(page - 1) * perPage} ROWS
                    FETCH NEXT ${perPage} ROWS ONLY;
                ;
            `
        );
        return result.recordset;
    } catch (error) {
        console.log("error: ", error);
    }
}


module.exports = {
    getAllProducts,
    getProductsByCategory,
    getProductById,
    getProductByName,
    addNewProductToDB,
    updateProduct,
    getRatingByProductId,
    addRating,
    deleteProduct,
    paging,
    filterProduct
}

