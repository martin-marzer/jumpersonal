const fs = require('fs');
const path = require('path');



const db = require("../database/models")
const Products = db.Product

const Op = db.Sequelize.Op

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controlador = {
    index: (req,res) => {
		Products.findAll({
			include: ["images"]
		})
		.then(allProducts => {
			res.render("home", {
				articulos: allProducts,
				toThousand: toThousand
				})
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
		let limited = 20
		let searchs = {
			name: {[Op.like]:  "%" + finalSentence + "%"}
		}
		if (finalSentence.length <= 0) {
			limited = 0
		}
		else if (finalSentence.includes("nike")) {
			searchs = {brandID: 3}
		}
		//aca se guardan los datos que coinciden con la busqueda

		Products.findAll({
			include: ['images', "brands", "sizes"],
			where: searchs,
			limit: limited
		})
		.then(allProducts => {
			res.render("results", {
				searchUser: searchUser,
				usersResults: allProducts,
				toThousand: toThousand
			});
		})
		.catch(error => res.send(error))


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