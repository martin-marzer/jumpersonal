const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");


router.get("/", mainController.index);
router.get('/search', mainController.search); 
router.get("/carrito", mainController.carrito);
router.get("/terminos-y-condiciones", mainController.terminos);
router.get("/quienes-somos", mainController.quienes_somos);
router.get("/politicas-de-privacidad", mainController.politicas);
router.get("/formas-de-pago", mainController.pagos);




module.exports = router;