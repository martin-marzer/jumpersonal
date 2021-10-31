module.exports = (sequelize, dataTypes) => {
    let alias = 'ImagesProduct'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        url: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        productsID: {
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
    const imagesProduct = sequelize.define(alias, cols, config);

    imagesProduct.associate = function(models) {
        imagesProduct.belongsTo(models.Product, {
            as: "product", 
            foreignKey: "productsID"
        })
    
    }

    return imagesProduct
};