module.exports = (sequelize, dataTypes) => {
    let alias = 'Size'; // esto debería estar en singular
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
    const Size = sequelize.define(alias, cols, config);

    Size.associate = function (models) {
        Size.belongsToMany(models.Product, {
            as: "products",
            through: "sizesproducts",
            foreignKey: "sizeID",
            otherKey: "productID",
            timestamps: false
        })

    }

    return Size
};