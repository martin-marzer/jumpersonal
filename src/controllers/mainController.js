const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controlador = {
    index: (req,res) => {
        res.render("home", {
		articulos: products,
		toThousand: toThousand
		})
    },
    carrito: (req,res) => {
        res.render("carrito");
    },
    search: (req, res) => {

		//aca es para recibir lo escrito y sacarle mayus y tildes
		let searchUser = req.query.keywords;
		let normalizeSearch = searchUser.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
		let finalSentence = normalizeSearch.toLowerCase();
		//aca se guardan los datos que coinciden con la busqueda
		let usersResults = [];
		for (let i = 0; i < products.length; i++) {
			//aca es para cambiar el text de los productos y sacarle mayus and tildes
			let nameNormal = products[i].name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
			let nameNormalFinal = nameNormal.toLowerCase();
			// si lo que puso  en el buscador coincide con algun producto
			if (nameNormalFinal.includes(finalSentence) && (finalSentence.length != 0) ) {
				usersResults.push(products[i]);
			}		
		}
		res.render("results", {
			searchUser: searchUser,
			usersResults, usersResults,
			toThousand: toThousand
		});
	},
	terminos: (req,res) => {
		res.render("terminos")
	},
	quienes_somos: (req,res) => {
		res.render("quienes-somos")
	},
	politicas: (req,res) => {
		res.render("politicas")
	},
	pagos: (req,res) => {
		res.render("formasPago")
	}
};
module.exports = controlador;