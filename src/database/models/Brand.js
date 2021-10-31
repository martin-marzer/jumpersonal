module.exports = (sequelize, dataTypes) => {
    let alias = 'Brand'; // esto debería estar en singular
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
        createdAt: {
            type: dataTypes.DATE
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: false,
        deletedAt: false
    }
    const Brand = sequelize.define(alias, cols, config);

    Brand.associate = function (models) {
        Brand.hasMany(models.Product, {
            as: "products",
            foreignKey: "brandID"
        })

    }

    return Brand
};