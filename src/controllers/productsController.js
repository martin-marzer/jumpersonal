const fs = require('fs');
const path = require('path');


const db = require("../database/models")

const Products = db.Product
const Op = db.Sequelize.Op

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controlador = {
    productsList: (req, res) => {
        let orderParams = req.params.OrderBy;
        let filterData =  req.params.FilterBy

        Products.findAll({
            include: ['images', "brands", "sizes"]
        })
            .then(allProducts => {

                let url = req.originalUrl.split("/")
                let viewToRender;
                if (url.includes("sneakers")) {
                    viewToRender = "listProducts"
                } else {
                    viewToRender = "ofertas"
                    allProducts = allProducts.filter(product => {
                        if (product.discount != 0) {
                            return product
                        }
                    })
                }

                let orderFunc = () => {
            
                    switch (orderParams) {
                        case "OrderByReleaseDateASC":
                            allProducts.sort(function(a, b) {  
                                return a.id - b.id ;  
                            }); 
                            break;
        
                        case "OrderByReleaseDateDESC":
                            allProducts.sort(function(a, b) {  
                                return  b.id - a.id ;  
                            }); 
                        break;
        
                        case "OrderByPriceASC":
                            allProducts.sort(function(a, b) {  
                                return a.price - b.price ;  
                            }); 
                            break;
        
                        case "OrderByPriceDESC":
                            allProducts.sort(function(a, b) {  
                                return b.price - a.price ;  
                            }); 
                        break;
                    }
                }

                let filterFunc = () => {
                    let filterFinal = [];
                    if (filterData != undefined) {
                        filterProcess = filterData.split("+")
                        for (let i = 0; i < filterProcess.length; i++) {
                            const element = filterProcess[i];
                            filterFinal.push(element)
                        }
                        let productsFilterFinal = [];
                        // categoriaFIltrosOrden: marcas, talles, precio
                        let categoriaFiltros = [
                            [],
                            [],
                            []
                        ]
                        
                        for (let i = 0; i < filterFinal.length; i++) {
                            const eachFilter = filterFinal[i]
                            switch (eachFilter) {
        
                                case "adidas":
                                case "fila":
                                case "nike":
                                case "vans":
                                    categoriaFiltros[0].push(eachFilter)
                                    break;
        
                                case "35-40":
                                case "40-45":
                                    categoriaFiltros[1].push(eachFilter)
                                    break;
                                case "0$-19999$":
                                case "20000$-max":
                                    categoriaFiltros[2].push(eachFilter)
                                    break;
                                default:
                                    break;
                            }
                        }
                        let brands = categoriaFiltros[0]
                        let size = categoriaFiltros[1]
                        let price = categoriaFiltros[2]
        
                        let filterByMarca = []
        
                        let filterByTalle = []
        
                        let filterByPrecio = []
        
                        brandFilter = () => {
                            for (let i = 0; i < brands.length; i++) {
                                const marca = brands[i];
                                 allProducts.filter(product => {
                                
                                    if (product.brands.name == marca) {
                                        filterByMarca.push(product)
                                    }
                              } ) 
                            }
                            allProducts = filterByMarca
                        }
                        
                        sizeFilter = () => {
                            for (let i = 0; i < size.length; i++) {
                                const talle = size[i];
                                allProducts.filter(product => {
                                
                                    if (product.sizes[0].name == talle) {
                                        filterByTalle.push(product) 
                                    } 
                              } ) 
                            }
                            allProducts = filterByTalle
                        }
                        priceFilter = () => {
                            for (let i = 0; i < price.length; i++) {
                                const precio = price[i];
                                allProducts.filter(product => {
                                    
                                    priceOFF = product.price - (product.price * product.discount / 100)
                                    
                                    if (precio == "0$-19999$") {
                                                               
                                        if (priceOFF >= 0 && priceOFF <= 19999) {
                                            filterByPrecio.push(product) 
                                        } 
                                    }
                                    if (precio == "20000$-max") {                               
                                        if (priceOFF >= 20000 && priceOFF <= 200_000) {
                                            filterByPrecio.push(product) 
                                        } 
                                    }  
                                    
                              } ) 
                            }
                            allProducts = filterByPrecio
                        }
        
        
                        switch (true) {
        
                            // si  todas las categorias estan seleccionadas
                            case brands.length != 0 && size.length != 0 && price.length != 0 :
                                brandFilter()
                                sizeFilter()
                                priceFilter()
                                break;
        
                            // si hay hay 2 categorias seleccionadas
        
                            case brands.length != 0 && size.length != 0 && price.length == 0 :
                                brandFilter()
                                sizeFilter()
                                break;
        
                            case brands.length != 0 && size.length == 0 && price.length != 0 :
                                brandFilter()
                                priceFilter()
                                break;
        
                            case brands.length == 0 && size.length != 0 && price.length != 0 :
                                sizeFilter()
                                priceFilter()
                                break;
        
                            // si solo hay una categoria seleccionada
        
                            case brands.length != 0 && size.length == 0 && price.length == 0 :
                                brandFilter()
                                break;
        
                            case brands.length == 0 && size.length != 0 && price.length == 0 :
                                sizeFilter()
                                break;
        
                            case brands.length == 0 && size.length == 0 && price.length != 0 :
                                priceFilter()
                                break;
        
                            default:
                                break;
                        }
                        productsFilterFinal = allProducts
        
                    res.render(viewToRender, {
                        articulos: productsFilterFinal,
                        order: orderParams,
                        filter: filterFinal,
                        toThousand: toThousand
                        })
                    } else {
                        res.render(viewToRender, {
                            articulos: allProducts,
                            order: orderParams,
                            filter: filterFinal,
                            toThousand: toThousand
                        });
                    }
                }
                orderFunc()
                filterFunc()
                })
                .catch(error => res.send(error))
    },
    productDetail: (req,res) => {
        Products.findByPk(req.params.id, {
            include: ['images', "brands", "sizes"]
        })
        .then(product => {
            return res.render("detailProducts", {
                articuloID: product,
                toThousand: toThousand
            });
        })
        .catch(error => res.send(error))
    }
};

module.exports = controlador;



