module.exports = (sequelize, dataTypes) => {
    let alias = 'SizesProduct'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        sizeID: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
        productID: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        } 
    };
    let config = {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        deletedAt: false
    }
    const SizesProduct = sequelize.define(alias, cols, config);

    SizesProduct.associate = function(models) {
        SizesProduct.belongsToMany(models.Product, {
            as: "products",
            through: "sizesproducts",
            foreignKey: "sizeID",
            otherKey: "productID",
            timestamps: false
        })

        SizesProduct.belongsToMany(models.Size, {
            as: "sizes",
            through: "sizesproducts",
            foreignKey: "productID",
            otherKey: "sizeID",
            timestamps: false
        })
    
    }

    return SizesProduct
};