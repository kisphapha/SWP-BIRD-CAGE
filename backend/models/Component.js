const config = require("../config/db.config");
const sql = require("mssql");

const getByComponentCate = async (CateID) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request()
        .input('CateId', sql.VarChar, CateID)
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



const filterComponents = async (id, name, category, upper_price, lower_price, upper_stock, lower_stock, status, page) => {
    try {
        const perPage = 10;
        const poolConnection = await sql.connect(config);

        const conditions = [];
        if (id) conditions.push(`id = ${id}`);
        if (name) conditions.push(`Name LIKE N'%${name}%'`);
        if (category && category !== "All") conditions.push(`Type = N'${category}'`);
        if (status && status !== "All") conditions.push(`Status = '${status}'`);
        if (upper_price) conditions.push(`Price <= ${upper_price}`);
        if (lower_price) conditions.push(`Price >= ${lower_price}`);
        if (upper_stock) conditions.push(`Stock <= ${upper_stock}`);
        if (lower_stock) conditions.push(`Stock >= ${lower_stock}`);

        const conditionString = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

        const query = `
            select * 
            from ComponentDetail 
            ${conditionString}
            ORDER BY Id ASC
            OFFSET ${(page - 1) * perPage} ROWS
            FETCH NEXT ${perPage} ROWS ONLY;
        `;

        const result = await poolConnection.request().query(query);
        const json = { data: result.recordset };

        const linesQuery = `
            select COUNT(*) AS COUNT from ComponentDetail
            ${conditionString}
        `;

        const linesResult = await poolConnection.request().query(linesQuery);
        json.lines = linesResult.recordset[0];
        return json;
    } catch (error) {
        console.log("error: ", error);
    }
};

const addNewComponent = async (Name, Type, Material, Color, Description, Price, Stock, Status, Urls, Application) => {
    try {
        let poolConnection = await sql.connect(config);
        const request = poolConnection.request();

        request.input('Name', sql.NVarChar, Name);
        request.input('Description', sql.NVarChar, Description);
        request.input('Price', sql.Int, Price);
        request.input('Stock', sql.Int, Stock);
        request.input('Status', sql.NVarChar, Status);
        request.input('Type', sql.NVarChar, Type);
        request.input('Material', sql.NVarChar, Material);
        request.input('Color', sql.NVarChar, Color);
        request.input('Picture', sql.NVarChar, Urls);

        const result = await request.query(`
            INSERT INTO dbo.ComponentDetail
            (
            [Name]
            ,[Description]
            ,[Price]
            ,[Stock]
            ,[Status]
            ,[Type]
            ,[Material]
            ,[Color]
            ,[Picture]
            )
            VALUES
            (
                @Name, 
                @Description, 
                @Price,
                @Stock, 
                @Status, 
                @Type, 
                @Material,
                @Color, 
                @Picture
            );
        `);

        const createdIdRs = await poolConnection.request().query(`SELECT TOP 1 Id FROM ComponentDetail ORDER BY Id DESC`);
        const createdId = createdIdRs.recordset[0].Id;

        for (const cate of Application) {
            const cateRequest = poolConnection.request(); // Create a new Request object for each iteration
            const query = `
                    INSERT INTO ComponentDetail_Category (ComponentID, cateID)
                    VALUES (@ComponentID, @CateID)
                `;
            await cateRequest
                .input("ComponentID", sql.Int, createdId)
                .input("CateID", sql.NVarChar, cate)
                .query(query);
        }
        return result.recordset;
    } catch (error) {
        console.log("error: ", error);
    }
}

module.exports  = {
    getAllComponent,
    getByComponentCate,
    filterComponents,
    addNewComponent
}