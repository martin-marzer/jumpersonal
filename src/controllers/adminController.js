const fs = require('fs');
const path = require('path');

const productsFilePath = path.resolve(__dirname, '../database/products.json');
const ImagesFolderPath = path.join(__dirname, '../../public/images/zapatillas/');
const usersFilePath = path.resolve(__dirname, '../database/users.json');


let resultHandler = function(err) { 
    if(err) {
       console.log("unlink failed", err);
    } else {
       console.log("file deleted");
    }
}
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controlador = {
    administrator: (req,res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        res.render("administrator", {
            articulos: products,
            usuarios: users,
            user: req.session.userLogged
        });
    },
    administratorTools: (req,res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render("administratorToolsProducts", {
            articulos: products,
            toThousand: toThousand
        });
    },
    productCreate: (req,res) => {
        res.render("productCreate");
    },
    store: (req,res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
       let newId = products[products.length -1].id;
       let id = newId +1;

       let newProduct = {
           id: id,
           name:  req.body.name,
           price: req.body.precio,
           talle: req.body.talle,
           brand: req.body.marca,
           image: [req.files[0].filename, req.files[1].filename, req.files[2].filename],
           date: req.body.fechaEntrada,
           description: req.body.descripcion,
           
       }


       // aca convertimos algunos datos como el precio pasado a number en vez de string, y al text se le agrega mayusculas
       newProduct.name = newProduct.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
       newProduct.description = newProduct.description.charAt(0).toUpperCase() + newProduct.description.slice(1);
       newProduct.price = parseInt(newProduct.price, 10)
       

       let newBasedata = products.concat(newProduct)

       //lo del null y 2 es para que el json respete el formato al editar productos
       let finalProduct = JSON.stringify(newBasedata, null, 2)

       fs.writeFileSync(productsFilePath, finalProduct)  

    //    console.log(req.file)

		res.redirect("/administratorToolsProducts");
    },
    productEdit: (req,res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let idZapatilla = req.params.id;
        let productId;
        products.forEach(producto => {
            if (producto.id == idZapatilla) {
                productId = producto;
            }
        }); 
        res.render("productEdit", {
            articulo: productId
        });
    },
    update: (req,res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        productToEditBody = req.body;
		let idProduct = req.params.id;
        let product;
        products.forEach(producto => {
            if (producto.id == idProduct) {
                product = producto;
            }
	        })

        product.name =  productToEditBody.name;
        product.price = productToEditBody.price;
        product.talle =  productToEditBody.talle;
        product.brand = productToEditBody.brand;
        // product.image = [req.files[0].filename, req.files[1].filename, req.files[2].filename]
        product.date = productToEditBody.date;
        product.description = productToEditBody.description;

        // aca convertimos algunos datos como el precio pasado a number en vez de string, y al text se le agrega mayusculas
        product.price = parseInt(product.price, 10)
        product.name =  product.name.charAt(0).toUpperCase() +  product.name.slice(1);
        product.description = product.description.charAt(0).toUpperCase() +  product.description.slice(1);
        
        //el producto especifico ahora vale lo editado previamente
        products[product] = product;
        
        //lo del null y 2 es para que el json respete el formato al editar productos
        let finalProduct = JSON.stringify(products, null, 2)

        fs.writeFileSync(productsFilePath, finalProduct)

        // console.log(product.image)
        res.redirect("/administratorToolsProducts");
    }, 
    delete: (req,res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //esto es para eliminar tambien las imagenes + json


        let productoExiliado = products.filter(product => product.id == req.params.id);
		let productsNew = products.filter(product => product.id != req.params.id)


              // Aca es para ordenar los id tras eliminar un producto

        for(let i = 0; i < productsNew.length; i ++){
            let eachProduct = productsNew[i];
            eachProduct.id =  i + 1
        }

        //lo del null y 2 es para que el json respete el formato al editar productos
		let productsFinal = JSON.stringify(productsNew, null, 2);
		let imageToDelete = productoExiliado[0].image;
        //aca se mete un for para eliminar las imagenes al borrarla info del json
		// for (let i = 0; i < imageToDelete.length; i++) {
		// 	fs.unlinkSync(ImagesFolderPath + imageToDelete[i], resultHandler)
		// }
		// console.log(imageToDelete)
		fs.writeFileSync( productsFilePath, productsFinal);
		res.redirect("/administratorToolsProducts");



        // este elimina solo la info del json


    //   let productsNew = products.filter(product => (product.id != req.params.id))
      
      // Aca es para ordenar los id tras eliminar un producto

    //   for(let i = 0; i < productsNew.length; i ++){
    //     let eachProduct = productsNew[i];
    //     eachProduct.id =  i + 1
    // }
    //   let finalProduct = JSON.stringify(productsNew, null, 2)
    //   fs.writeFileSync(productsFilePath, finalProduct)

      
     
    //     res.redirect("/administratorToolsProducts");
    },
    administratorUsers: (req,res) => {
        res.send("aca iria para ver los perfiles, podria editarse para cambiar su rol")
    }
};

module.exports = controlador;