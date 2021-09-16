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
            if (order == "OrderByReleaseDateDESC" ) {
                products.sort(function(a, b) {  
                    return a.id - b.id ;  
                }); 
            }
            else if (order == "OrderByReleaseDateASC" ) {
                products.sort(function(a, b) {  
                    return  b.id - a.id ;  
                }); 
            }
            else if (order == "OrderByPriceASC") {
                products.sort(function(a, b) {  
                    return a.price - b.price ;  
                }); 
            }
            else if (order == "OrderByPriceDESC") {
                products.sort(function(a, b) {  
                    return b.price - a.price ;  
                }); 
            }
        }

        let filterData =  req.params.FilterBy
        let filterFunc = () => {
            let filterFinal = [];
        if (filterData != undefined) {
            filterProcess = filterData.split("+")
            for (let i = 0; i < filterProcess.length; i++) {
                const element = filterProcess[i];
                if (element ==  "35-37" || element ==  "38-40" || element ==  "41-43" || element ==  "44-45") {
                    
                    filterFinal.unshift(element)
                }
                else if (element == "adidas" || element == "fila" || element == "nike" || element == "vans") {
                    filterFinal.push(element)
                }
                // console.log(filterFinal)
            }
            
            let productsFilterFinal = [];
            let filteredProducts;
            let ojo = [
                [],
                []
            ]

            for (let i = 0; i < filterFinal.length; i++) {
                const eachFilter = filterFinal[i]
                    // 'adidas', 'fila', 'nike', 'vans'  '35-37', '38-40', '41-43', '44-45'    '$5000-$14999', '$15000-max'
                if (eachFilter == "adidas" || eachFilter == "fila" || eachFilter == "nike" || eachFilter == "vans") {
                   ojo[0].push(eachFilter)
                }
                else if (eachFilter ==  "35-37" || eachFilter ==  "38-40" || eachFilter ==  "41-43" || eachFilter ==  "44-45") {
                    ojo[1].push(eachFilter)
                }
                if  ( (ojo[0].length != 0 && ojo[1].length != 0) ) {
                    
                    let marcas = products.map(product => {
                          if (product.brand == eachFilter) {
                            return product
                          }
                    } ) 
                    
                    let mitadCamino = marcas.filter(producto => producto != undefined)
                    let productosFiltradosFinal = mitadCamino.filter(producto => producto.talle == ojo[1] )
                    // console.log(productosFiltradosFinal)
                    productsFilterFinal = productosFiltradosFinal
                }
                else if ( ojo[0].length != 0 && ojo[1].length == 0 ) {
                    filteredProducts = products.filter(product => product.brand == eachFilter)
                     filteredProducts.forEach(producto => productsFilterFinal.push(producto) )
                }
                else if ( ojo[1].length != 0  && ojo[0].length == 0 ) {
                    filteredProducts = products.filter(product => product.talle == eachFilter)
                    filteredProducts.forEach(producto => productsFilterFinal.push(producto) )
                }

                // console.log(ojo)
               
            }

            // console.log(filteredProducts)
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