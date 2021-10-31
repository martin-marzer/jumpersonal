module.exports = (sequelize, dataTypes) => {
    let alias = 'Discount'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        discountPercent: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
        active: {
            type: dataTypes.BOOLEAN,
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
    const Discount = sequelize.define(alias, cols, config);

    Discount.associate = function (models) {
        Discount.hasOne(models.Product, {
            as: "products",
            foreignKey: "discountID"
        })

    }

    return Discount
};