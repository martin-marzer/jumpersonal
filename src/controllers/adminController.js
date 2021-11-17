const fs = require('fs');
const path = require('path');

const ImagesFolderPath = path.join(__dirname, '../../public/images/zapatillas/');
let db = require("../database/models");

const Product = db.Product;
const ImagesProduct = db.ImagesProduct;
const SizesProduct = db.SizesProduct;
const User = db.User;

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { validationResult } = require("express-validator")

const controlador = {
    administrator: (req, res) => {
        let promProducts = Product.findAll()
        let promUsers = User.findAll()
        Promise
            .all(([promProducts, promUsers]))
            .then(([products, users]) => {
                res.render("administrator", {
                    articulos: products,
                    usuarios: users,
                    user: req.session.userLogged
                });
            })
    },
    allProducts: (req, res) => {
        Product.findAll({
            include: ["images"]
        })
            .then(articulos => {
                res.render("administratorProducts", {
                    articulos: articulos,
                    toThousand: toThousand
                })
            });
    },
    productCreate: (req, res) => {
        res.render('productCreate');
    },
    store: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            res.render("productCreate", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        } else {
            let images = [req.files[0].filename, req.files[1].filename, req.files[2].filename]

            Product.create({
                name: req.body.name,
                price: req.body.precio,
                description: req.body.descripcion,
                brandID: req.body.marca,
                discount: req.body.descuento,
                createdAt: req.body.fechaEntrada,
                updatedAt: null,
                quantity: req.body.stock
            })
                .then(() => {
                    Product.count({
                        col: 'Product.id'
                    })
                        .then(count => {
                            images.forEach(image => {

                                ImagesProduct.create({
                                    url: image,
                                    productsID: count
                                })

                            })
                            console.log(count);
                            SizesProduct.create({
                                sizeID: req.body.talle,
                                productID: count
                            })
                                .then(() => {
                                    res.redirect('/administrator/products')
                                })
                        })

                })
                .catch(error => res.send(error))
        }

    },
    productEdit: (req, res) => {
        Product.findByPk(req.params.id, {
            include: ["brands", "sizes"]
        })
            .then(product => {
                res.render("productEdit", {
                    articulo: product,
                    toThousand: toThousand
                });
            })
            .catch(error => res.send(error))
    },
    update: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            Product.findByPk(req.params.id, {
                include: ["brands", "sizes"]
            })
                .then(product => {
                    res.render("productEdit", {
                        articulo: product,
                        toThousand: toThousand,
                        errors: resultValidation.mapped(),
                        oldData: req.body
                    });
                })
                .catch(error => res.send(error))
        } else {
            let productId = req.params.id;
            Product
                .update(
                    {
                        name: req.body.name,
                        price: req.body.precio,
                        description: req.body.descripcion,
                        brandID: req.body.marca,
                        discount: req.body.descuento,
                        createdAt: req.body.fechaEntrada,
                        quantity: req.body.stock
                    },
                    {
                        where: { id: productId }
                    })
                .then(() => {
                    res.redirect('/administrator/products')
                })
                .catch(error => res.send(error))
        }
    },
    delete: (req, res) => {

        ImagesProduct.findAll({
            where: {
                productsID: req.params.id
            }
        })
            .then((images) => {
                let arrIMG = [images[0].url, images[1].url, images[2].url]
                arrIMG.forEach(image => {
                    fs.unlinkSync(ImagesFolderPath + image)
                })
            })
            .then(() => {
                ImagesProduct.destroy({
                    where: {
                        productsID: req.params.id
                    }, force: true
                })
                    .then(() => {
                        SizesProduct.destroy({
                            where: {
                                productID: req.params.id,
                                sizeID: req.body.talle
                            }, force: true
                        })
                            .then(() => {
                                Product.destroy({
                                    where: {
                                        id: req.params.id
                                    }, force: true
                                })
                                    // .then(()=>{

                                    //     Product.count({
                                    //         col: "Product.id"
                                    //     })
                                    //     .then(count => {
                                    //         for (let i = 1; i <= count; i++) {
                                    //             Product.findByPk(i)
                                    //             .then(producto => {
                                    //                 if (producto == undefined) {
                                    //                     Product.update(
                                    //                         { id: i},
                                    //                         { where: {id: i + 1} }
                                    //                     )
                                    //                 }

                                    //             })

                                    //         }
                                    //     })


                                    // })
                                    .then(() => {
                                        res.redirect('/administratorToolsProducts')
                                    })
                            })


                    })
            })


            .catch(error => res.send(error))
    },
    allUsers: (req, res) => {
        User.findAll()
            .then(usuarios => {
                res.render("administratorUsers", {
                    usuarios: usuarios
                })
            });
    },
    userEdit: (req, res) => {
        User.findByPk(req.params.id)
            .then(user => {
                res.render("userEdit", {
                    user: user,
                });
            })
            .catch(error => res.send(error))
    },
    userUpdate: (req, res) => {
        User
            .update(
                {
                    rol: req.body.rol
                },
                {
                    where: { id: req.params.id }
                })
            .then(() => {
                res.redirect('/administrator/users')
            })
            .catch(error => res.send(error))
    }
    // nose: (req, res) => {
    //     Product.count({
    //         col: 'Product.id'
    //     })
    //     .then(count => {
    //         let idk = [];

    //         for (let i = 1; i <= count; i++) {
    //             const eachwacho = i;
    //             idk.push(eachwacho)
    //             Product.findByPk(i)
    //             .then(producto => {
    //                 if (producto == undefined) {
    //                     Product
    //                     .update(
    //                         {
    //                             id: id - 1
    //                         },
    //                         {
    //                             where: {id: i + 1}
    //                         })
    //                 } 
    //             })

    //             // Product
    //             // .update(
    //             //     {
    //             //         id: i
    //             //     },
    //             //     {
    //             //         where: {id: i}
    //             //     })

    //             // console.log( eachwacho);
    //         }

    //         //  let hola = Array.from(Array(count).keys()).map(e => {
    //         //      return e + 1
    //         //  })
    //         // console.log(hola);

    //         res.json(idk)
    //     })

    // }
};

module.exports = controlador;