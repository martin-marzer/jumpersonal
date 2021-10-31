module.exports = (sequelize, dataTypes) => {
    let alias = 'Stock'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        quantity: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
        createdAt: {
            type: dataTypes.DATE
        },
        modifiedAt: {
            type: dataTypes.DATE
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: "modifiedAt",
        deletedAt: false
    }
    const Stock = sequelize.define(alias, cols, config);


    Stock.associate = function (models) {
        Stock.hasOne(models.Product, {
            as: "products",
            foreignKey: "stockID"
        })
    }

    return Stock
};