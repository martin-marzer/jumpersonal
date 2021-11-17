module.exports = (sequelize, dataTypes) => {
    let alias = 'Product'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE,
            allowNull: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        price: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        quantity: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
        discount: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
        brandID: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        } 
         
    };
    let config = {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: "updatedAt",
        deletedAt: false
    }
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
        Product.hasMany(models.ImagesProduct, {
            as: "images",
            foreignKey: "productsID"
        })
        Product.belongsTo(models.Brand, {
            as: "brands",
            foreignKey: "brandID"
        })
        Product.belongsToMany(models.Size, {
            as: "sizes",
            through: "sizesproducts",
            foreignKey: "productID",
            otherKey: "sizeID",
            timestamps: false
        })


    }

    return Product
};