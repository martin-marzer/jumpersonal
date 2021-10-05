const fs = require('fs');
const { each } = require('jquery');
const path = require('path');

const productsFilePath = path.resolve(__dirname, '../database/products.json');


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controlador = {
    productsList: (req,res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


        //esto ordena la vaina, obtiene el dato desde el link y de ahi se acomoda la vista

        let order = req.params.OrderBy;
        let orderFunc = () => {
            
            switch (order) {
                case "OrderByReleaseDateDESC":
                    products.sort(function(a, b) {  
                        return a.id - b.id ;  
                    }); 
                    break;

                case "OrderByReleaseDateASC":
                    products.sort(function(a, b) {  
                        return  b.id - a.id ;  
                    }); 
                break;

                case "OrderByPriceASC":
                    products.sort(function(a, b) {  
                        return a.price - b.price ;  
                    }); 
                    break;

                case "OrderByPriceDESC":
                    products.sort(function(a, b) {  
                        return b.price - a.price ;  
                    }); 
                break;
            }
        }


        let filterData =  req.params.FilterBy
        let filterFunc = () => {
            let filterFinal = [];
            if (filterData != undefined) {
                filterProcess = filterData.split("+")
                for (let i = 0; i < filterProcess.length; i++) {
                    const element = filterProcess[i];
                    filterFinal.push(element)
                    // console.log(filterFinal)
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
                        // 'adidas', 'fila', 'nike', 'vans'  '35-37', '38-40', '41-43', '44-45'    '$5000-$14999', '$15000-max'
                    if (eachFilter == "adidas" || eachFilter == "fila" || eachFilter == "nike" || eachFilter == "vans") {
                       categoriaFiltros[0].push(eachFilter)
                    }
                    else if (eachFilter ==  "35-40" || eachFilter ==  "40-45") {
                        categoriaFiltros[1].push(eachFilter)
                    }
                    else if (eachFilter ==  "0$-19999$" || eachFilter ==  "20000$-max") {
                        categoriaFiltros[2].push(eachFilter)
                    }
                }
                let brands = categoriaFiltros[0]
                let size = categoriaFiltros[1]
                let price = categoriaFiltros[2]

                let allMarcas = categoriaFiltros[0]
                let filterByMarca = []


                let allTalles = categoriaFiltros[1]
                let filterByTalle = []

                let allPrecios = categoriaFiltros[2]
                let filterByPrecio = []


                // todas los categoria de filtro seleccionada
                if  ( brands.length != 0 && size.length != 0 && price.length != 0 ) {

                    for (let i = 0; i < allMarcas.length; i++) {
                        const marca = allMarcas[i];
                        products.map(product => {
                        
                            if (product.brand == marca) {
                              filterByMarca.push(product)
                            }
                      } ) 
                    }

                    let principioCamino = filterByMarca.filter(producto => producto != undefined)

                    for (let i = 0; i < allTalles.length; i++) {
                        const talle = allTalles[i];
                        principioCamino.map(product => {
                        
                            if (product.talle == talle) {
                                filterByTalle.push(product) 
                            } 
                      } ) 
                    }

                    let cleanFilter = filterByTalle.filter(producto => producto != undefined)
                    
                    for (let i = 0; i < allPrecios.length; i++) {
                        const precio = allPrecios[i];
                        cleanFilter.map(product => {
                            
                            if (precio == "0$-19999$") {                               
                                if (product.price >= 0 && product.price <= 19999) {
                                    filterByPrecio.push(product) 
                                } 
                            }
                            if (precio == "20000$-max") {                               
                                if (product.price >= 20000 && product.price <= 200_000) {
                                    filterByPrecio.push(product) 
                                } 
                            }  
                            
                      } ) 
                    }
                    
                    let finishedFilter = filterByPrecio
            
                    productsFilterFinal = finishedFilter
                }


                // 2 categorias selected

                else if (brands.length != 0 && size.length != 0 && price.length == 0) {
                    for (let i = 0; i < allMarcas.length; i++) {
                        const marca = allMarcas[i];
                        products.map(product => {
                        
                            if (product.brand == marca) {
                              filterByMarca.push(product)
                            }
                      } ) 
                    }

                    let principioCamino = filterByMarca.filter(producto => producto != undefined)

                    
                    for (let i = 0; i < allTalles.length; i++) {
                        const talle = allTalles[i];
                        principioCamino.map(product => {
                        
                            if (product.talle == talle) {
                                filterByTalle.push(product) 
                            } 
                      } ) 
                    }

                    let cleanFilter = filterByTalle.filter(producto => producto != undefined)
                    productsFilterFinal = cleanFilter
                }

                else if (brands.length != 0 && size.length == 0 && price.length != 0) {
                    for (let i = 0; i < allMarcas.length; i++) {
                        const marca = allMarcas[i];
                        products.map(product => {
                        
                            if (product.brand == marca) {
                              filterByMarca.push(product)
                            }
                      } ) 
                    }

                    let principioCamino = filterByMarca.filter(producto => producto != undefined)
                    for (let i = 0; i < allPrecios.length; i++) {
                        const precio = allPrecios[i];
                        principioCamino.map(product => {
                            
                            if (precio == "0$-19999$") {                               
                                if (product.price >= 0 && product.price <= 19999) {
                                    filterByPrecio.push(product) 
                                } 
                            }
                            if (precio == "20000$-max") {                               
                                if (product.price >= 20000 && product.price <= 200_000) {
                                    filterByPrecio.push(product) 
                                } 
                            }  
                            
                      } ) 
                    }


                    productsFilterFinal = filterByPrecio
                }

                else if (brands.length == 0 && size.length != 0 && price.length != 0) {
                    for (let i = 0; i < allTalles.length; i++) {
                        const talle = allTalles[i];
                        products.map(product => {
                        
                            if (product.talle == talle) {
                                filterByTalle.push(product) 
                            } 
                      } ) 
                    }

                    let cleanFilter = filterByTalle.filter(producto => producto != undefined)
                    
                    for (let i = 0; i < allPrecios.length; i++) {
                        const precio = allPrecios[i];
                        cleanFilter.map(product => {
                            
                            if (precio == "0$-19999$") {                               
                                if (product.price >= 0 && product.price <= 19999) {
                                    filterByPrecio.push(product) 
                                } 
                            }
                            if (precio == "20000$-max") {                               
                                if (product.price >= 20000 && product.price <= 200_000) {
                                    filterByPrecio.push(product) 
                                } 
                            }  
                            
                      } ) 
                    }
                    
                    let finishedFilter = filterByPrecio
            
                    productsFilterFinal = finishedFilter
                }


                // 1 categoria seleccionada
                else if (brands.length != 0 && size.length == 0 && price.length == 0) {
                    for (let i = 0; i < allMarcas.length; i++) {
                        const marca = allMarcas[i];
                        products.map(product => {
                        
                            if (product.brand == marca) {
                              filterByMarca.push(product)
                            }
                      } ) 
                    }

                    let finalCamino = filterByMarca.filter(producto => producto != undefined)
                    productsFilterFinal = finalCamino
                }

                else if (brands.length == 0 && size.length != 0 && price.length == 0) {
                    for (let i = 0; i < allTalles.length; i++) {
                        const talle = allTalles[i];
                        products.map(product => {
                        
                            if (product.talle == talle) {
                                filterByTalle.push(product) 
                            } 
                      } ) 
                    }

                    let finalCamino = filterByTalle.filter(producto => producto != undefined)
                    productsFilterFinal = finalCamino
                }

                else if (brands.length == 0 && size.length == 0 && price.length != 0) {
                    for (let i = 0; i < allPrecios.length; i++) {
                        const precio = allPrecios[i];
                        products.map(product => {
                            
                            if (precio == "0$-19999$") {                               
                                if (product.price >= 0 && product.price <= 19999) {
                                    filterByPrecio.push(product) 
                                } 
                            }
                            if (precio == "20000$-max") {                               
                                if (product.price >= 20000 && product.price <= 200_000) {
                                    filterByPrecio.push(product) 
                                } 
                            }  
                            
                      } ) 
                    }
                    let finishedFilter = filterByPrecio
            
                    productsFilterFinal = finishedFilter


                }


            res.render("listProducts", {
                articulos: productsFilterFinal,
                order: order,
                filter: filterFinal,
                toThousand: toThousand
                })
            } else {
                res.render("listProducts", {
                    articulos: products,
                    order: order,
                    filter: filterFinal,
                    toThousand: toThousand
                });
            }
        }
        orderFunc();
        filterFunc();
        
    },
    productDetail: (req,res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let idZapatilla = req.params.id;
        let articuloId;
        products.forEach(producto => {
            if (producto.id == idZapatilla) {
                articuloId = producto;
            }
            
        }); 

        if(products.indexOf(articuloId) != -1){
            res.render("detailProducts", {
                articulos: products,
                articuloId: articuloId,
                toThousand: toThousand
            });
        } else {
            res.render("error")
          }
    }
};

module.exports = controlador;