const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const fs = require('fs');
const path = require("path");
const ImagesFolderPath = path.join(__dirname, '../../public/images/zapatillas/');
const multer = require("multer");
const { body } = require("express-validator")

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/images/zapatillas'));
  },
  filename: (req, file, cb) => {
    const newFilename = "product" + '-' + Date.now() + path.extname(file.originalname);
    cb(null, newFilename);
  }
})

const upload = multer({
  storage: multerStorage,
  fileFilter: function (req, file, callback) {
    let ext = path.extname(file.originalname);
    //aca se especifica los archivos q admite
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return callback(new Error('solo imagenes pa'))
    }
    callback(null, true)
  },
  //aca se especifica los limites, se aceptan aprox 2MB each foto, and only 3 files sino no se sube
  limits: {
    fileSize: 1424 * 1424,
    files: 3
  }
});

function validUploadLength(req, res, next) {
  if (req.files.length !== 3) {
    // console.log(req.files);
    let images;
    if (req.files.length == 1) {
      images = req.files[0].filename
      fs.unlinkSync(ImagesFolderPath + images)
    }
    else if (req.files.length == 2) {
      images = [req.files[0].filename, , req.files[1].filename]
      images.forEach(image => {
        fs.unlinkSync(ImagesFolderPath + image)
      })
    }
    let e = new Error('Solo 3 imagenes')
    res.locals.imgERROR = e.toString()
  }
  next()
}


const validations = [
  body("name")
    .notEmpty().withMessage("Escribe un Nombre").bail()
    .isLength({ min: 5, max: 100 }).withMessage("Longitud: 5 a 100 Caracteres"),

  body("fechaEntrada")
    .notEmpty().withMessage("No puede estar vacío").bail()
    .isDate().withMessage("Elige una fecha"),

  body("talle")
    .notEmpty().withMessage("Elige el talle").bail()
    .isInt().withMessage(),

  body("marca")
    .notEmpty().withMessage("Elige la marca").bail()
    .isInt().withMessage(),

  body("precio")
    .notEmpty().withMessage("Escribe el precio").bail()
    .matches(/^[0-9]*\.?[0-9]*$/).withMessage("solo números"),

  body("descuento")
    .notEmpty().withMessage("Escribe el descuento").bail()
    .matches(/^[0-9]+$/).withMessage("solo números").bail()
    .custom(value => {
      if (value >= 0 && value <= 100) {
        return true
      } else {
        return false
      }

    }).withMessage("de 0 a 100"),

  body("stock")
    .notEmpty().withMessage("Escribe el descuento").bail()
    .matches(/^[0-9]+$/).withMessage("solo números"),

  // body("myFile")
  // .custom(( value, { req }) => {
  //   let file = req.file
  //   let validExt = [".jpg", ".png", ".jpeg"]

  //   if (!file) {
  //     throw new Error("tenes que subir una imagenes")
  //   }
  //   return true
  // }),

  body("descripcion")
    .notEmpty().withMessage("Escribe la descripcion").bail()
    .isLength({ min: 1, max: 200 }).withMessage("Longitud: 1 a 200 Caracteres")

];

// console.log(validations);
// router.get("/holi", adminMiddleware, adminController.nose);

/*** GET ADMINISTRATOR ***/
router.get("/", adminController.administrator);

/*** GET TODOS LOS PRODUCTOS COMO ADMIN ***/
router.get("/products", adminController.allProducts)

/*** CREATE ONE PRDUCT ***/
router.get("/products/create", adminController.productCreate)
router.post('/products/create', upload.array("myFile", 3), validUploadLength, validations, adminController.store);

/*** EDIT ONE PRDUCT ***/
router.get("/products/edit/:id", adminController.productEdit)
router.put('/products/edit/:id', validations, adminController.update);

// /*** DELETE ONE PRODUCT***/ 
router.delete('/products/delete/:id', adminController.delete);

/*** GET ALL USERS AS ADMIN ***/
router.get("/users", adminController.allUsers)

/*** EDIT ONE USER ***/
router.get("/users/edit/:id", adminController.userEdit)
router.put('/users/edit/:id', adminController.userUpdate);


module.exports = router;