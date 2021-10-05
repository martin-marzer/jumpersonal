const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");
const path = require("path");
const multer = require("multer");

const multerStorage = multer.diskStorage({
    destination:  (req, file, cb) => {
      cb(null, path.join(__dirname, "../../public/images/zapatillas"));
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
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('solo imagenes pa'))
        }
        callback(null, true)
    },
    //aca se especifica los limites, se aceptan aprox 2MB each foto, and only 3 files sino no se sube
    limits:{
        fileSize: 1424 * 1424,
        files: 3
    }
});

/*** GET ADMINISTRATOR ***/  
router.get("/administrator", adminMiddleware, adminController.administrator);

/*** GET TODOS LOS PRODUCTOS COMO ADMIN ***/  
router.get("/administratorToolsProducts", adminMiddleware, adminController.administratorTools)

/*** CREATE ONE PRDUCT ***/  
router.get("/productCreate", adminMiddleware, adminController.productCreate)
router.post('/administratorToolsProducts', upload.array("myFile"), adminController.store); 

/*** EDIT ONE PRDUCT ***/  
router.get("/products/edit/:id", adminMiddleware, adminController.productEdit)
router.put('/products/edit/:id', adminController.update);

// /*** DELETE ONE PRODUCT***/ 
router.delete('/products/delete/:id', adminMiddleware, adminController.delete); 

/*** GET ALL USERS AS ADMIN ***/  
router.get("/administratorToolsUsers", adminMiddleware, adminController.administratorUsers)

module.exports = router;