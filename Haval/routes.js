const { adminValidationRules } = require("./validators/add_admin.validate.js");
const { validateCar } = require("./validators/add_car.validate.js");
const { validateDiler } = require("./validators/add_diler.validate.js");
const { validateNews } = require("./validators/add_news.validate.js");
const { validateVideo } = require("./validators/add_video.validate.js");
const { validateLogin } = require("./validators/login.validate.js");
const {
  validateOrder_Dealer_Call,
} = require("./validators/Order-dealer-call.validate.js");
const { validateRegister } = require("./validators/register.validate.js");
const {
  validateSavdoStatistikasi,
} = require("./validators/savdoStatistikasi.validate.js");
const {
  validateTest_drayver,
} = require("./validators/Test_drayver.validate.js");
const {
  adminValidationRulesUpdate,
} = require("./validators/update_admin.validate.js");
const { validateCarUpdate } = require("./validators/update_car.validate.js");
const {
  validateDilerUpdate,
} = require("./validators/update_diler.validate.js");
const { validateNewsUpdate } = require("./validators/update_news.validate.js");
const {
  validateOrder_Dealer_CallUpdate,
} = require("./validators/update_Order-dealer-call.validate.js");
const {
  validateSavdoStatistikasiUpdate,
} = require("./validators/update_savdoStatistikasi.validate.js");
const {
  validateVideoUpdate,
} = require("./validators/update_video.validate.js");
const { validateProfilUpdate } = require("./validators/profil.validate.js");
const { pdfValidationRules } = require("./validators/pfkit.js");
const multer = require("multer");
const upload = multer();
const { checkSchema } = require("express-validator");
const {
  getAllAdmin,
  updateAdmin,
} = require("./controllers/adminController");
const { createAdmin, updateSuperAdmin, deleteAdmin } = require("./controllers/superAdminController.js")
const {
  getCars,
  addCar,
  updateCar,
  deleteCar,
} = require("./controllers/carController");
const { register, login, loginAdmin } = require("./controllers/authController");
const {
  getDiler,
  addDiler,
  deleteDiler,
  updateDiler,
} = require("./controllers/dilerController");
const {
  getAllNews,
  addNews,
  updateNews,
  deleteNews,
} = require("./controllers/newsController");
const {
  getVideos,
  addVideo,
  updateVideo,
  deleteVideo,
} = require("./controllers/videoController");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
} = require("./controllers/categoryController");
const {
  getAllDealerCalls,
  addDealerCall,
  deleteDealerCall,
  updateDealerCall,
} = require("./controllers/oreder-dealer-callController");
const {
  getAllSavdoStatistikasi,
  addSavdoStatistikasi,
  updateSavdoStatistikasi,
  deleteSavdoStatistikasi,
} = require("./controllers/savdo_statistikasiController");
const {
  getTestDrivers,
  addTestDriver,
} = require("./controllers/test_drayverController");
const { loginLimiter } = require("./middlewares/loginLimiter");
const { jwtAccessMiddleware } = require("./middlewares/jwt-access.middleware");
const {
  roleAccessMiddleware,
} = require("./middlewares/role-access.middleware");
const {
  getAllUsers,
  deleteUser,
  getUserById,
} = require("./controllers/userController");
const { generate_pdf, download_pdf } = require("./controllers/pdfkit");
const {
  getOrders,
  makePayment,
  createOrder,
  deleteOrder
} = require("./shartnoma/controllers/orderController");
const { Profil, updatedProfil } = require("./controllers/profil.js");
const { adminAccessMiddleware } = require("./middlewares/admin-access.middleware.js");
const router = require("express").Router();

router
  .get(
    "/admins",
    adminAccessMiddleware,
    roleAccessMiddleware(["superadmin"]),
    getAllAdmin
  )
  .post(
    "/add-admin",
    adminAccessMiddleware,
    roleAccessMiddleware(["superadmin"]),
    [...adminValidationRules],
    createAdmin
  )
  .post("/login-Admin", loginLimiter, [...validateLogin], loginAdmin)
  .put(
    "/admins/:id",
    adminAccessMiddleware,
    roleAccessMiddleware(["superadmin"]),
    [...adminValidationRulesUpdate],
    updateAdmin
  )
  .delete(
    "/admins/:id",
    adminAccessMiddleware,
    roleAccessMiddleware(["superadmin"]),
    deleteAdmin
  )

  .post("/login-SuperAdmin", loginLimiter, [...validateLogin], loginAdmin)

  .get("/cars", jwtAccessMiddleware, getCars)
  .post(
    "/add-car",
    jwtAccessMiddleware,
    roleAccessMiddleware(["superadmin", "admin"]),
    upload.single("image"),
    [...validateCar],
    addCar
  )
  .put(
    "/cars/:id",
    jwtAccessMiddleware,
    roleAccessMiddleware(["superadmin", "admin"]),
    upload.single("image"),
    [...validateCarUpdate],
    updateCar
  )
  .delete(
    "/cars/:id",
    jwtAccessMiddleware,
    roleAccessMiddleware(["superadmin", "admin"]),
    deleteCar
  )

  .get("/categories", jwtAccessMiddleware, getAllCategories)
  .get(
    "/categories/:id",
    jwtAccessMiddleware,
    roleAccessMiddleware(["superadmin", "admin"]),
    getCategoryById
  )
  .post(
    "/add-category",
    jwtAccessMiddleware,
    roleAccessMiddleware(["admin"]),
    createCategory
  )
  .put(
    "/categories/:id",
    jwtAccessMiddleware,
    roleAccessMiddleware(["superadmin", "admin"]),
    updateCategory
  )
  .delete(
    "/categories/:id",
    jwtAccessMiddleware,
    roleAccessMiddleware(["superadmin", "admin"]),
    deleteCategory
  )

  .get("/dilers", jwtAccessMiddleware, getDiler)
  .post(
    "/add-diler",
    jwtAccessMiddleware,
    roleAccessMiddleware(["superadmin", "admin"]),
    [...validateDiler],
    addDiler
  )
  .put(
    "/dilers/:id",
    jwtAccessMiddleware,
    roleAccessMiddleware(["superadmin", "admin"]),
    [...validateDilerUpdate],
    updateDiler
  )
  .delete(
    "/dilers/:id",
    jwtAccessMiddleware,
    roleAccessMiddleware(["superadmin", "admin"]),
    deleteDiler
  )

  .get("/news", jwtAccessMiddleware, getAllNews)
  .post(
    "/add-news",
    jwtAccessMiddleware,
    roleAccessMiddleware(["superadmin", "admin"]),
    [...validateNews],
    addNews
  )
  .put(
    "/news/:id",
    jwtAccessMiddleware,
    roleAccessMiddleware(["superadmin", "admin"]),
    [...validateNewsUpdate],
    updateNews
  )
  .delete(
    "/news/:id",
    jwtAccessMiddleware,
    roleAccessMiddleware(["superadmin", "admin"]),
    deleteNews
  )

  .get("/dealerCall", jwtAccessMiddleware, getAllDealerCalls)
  .post("/add-dealerCall", [...validateOrder_Dealer_Call], addDealerCall)
  .put(
    "/dealerCall/:id",
    jwtAccessMiddleware,
    roleAccessMiddleware(["superadmin", "admin"]),
    [...validateOrder_Dealer_CallUpdate],
    updateDealerCall
  )
  .delete(
    "/dealerCall/:id",
    jwtAccessMiddleware,
    roleAccessMiddleware(["superadmin", "admin"]),
    deleteDealerCall
  )

  .get("/savdo-statistikasi", jwtAccessMiddleware, getAllSavdoStatistikasi)
  .post(
    "/add-savdo-statistikasi",
    jwtAccessMiddleware,
    roleAccessMiddleware(["superadmin", "admin"]),
    [...validateSavdoStatistikasi],
    addSavdoStatistikasi
  )
  .put(
    "/savdo-statistikasi/:id",
    jwtAccessMiddleware,
    roleAccessMiddleware(["superadmin", "admin"]),
    [...validateSavdoStatistikasiUpdate],
    updateSavdoStatistikasi
  )
  .delete(
    "/savdo-statistikasi/:id",
    jwtAccessMiddleware,
    roleAccessMiddleware(["superadmin", "admin"]),
    deleteSavdoStatistikasi
  )

  .get("/test-driver", jwtAccessMiddleware, getTestDrivers)
  .post(
    "/add-test-driver",
    jwtAccessMiddleware,
    [...validateTest_drayver],
    addTestDriver
  )
  .post(
    "/register",
    // jwtAccessMiddleware,
    [...validateRegister],
    register
  )
  .post(
    "/loginUser",
    // jwtAccessMiddleware,
    loginLimiter,
    [...validateLogin],
    login
  )
  .get(
    "/users",
    jwtAccessMiddleware,
    roleAccessMiddleware(["superadmin", "admin"]),
    getAllUsers
  )
  .get(
    "/users/:id",
    jwtAccessMiddleware,
    roleAccessMiddleware(["superadmin", "admin"]),
    getUserById
  )
  .delete(
    "/users/:id",
    jwtAccessMiddleware,
    roleAccessMiddleware(["superadmin", "admin"]),
    deleteUser
  )

  .get("/videos", getVideos)
  .post(
    "/add-video",
    jwtAccessMiddleware,
    roleAccessMiddleware(["superadmin", "admin"]),
    [...validateVideo],
    addVideo
  )
  .put(
    "/videos/:id",
    jwtAccessMiddleware,
    roleAccessMiddleware(["superadmin", "admin"]),
    [...validateVideoUpdate],
    updateVideo
  )
  .delete(
    "/videos/:id",
    jwtAccessMiddleware,
    roleAccessMiddleware(["superadmin", "admin"]),
    deleteVideo
  )
  .post("/generate-pdf", /* jwtAccessMiddleware,*/ [...pdfValidationRules], generate_pdf)
  .post("/download-pdf/:filename", download_pdf)

  .post(
    "/createOrder",
    jwtAccessMiddleware,
    [...pdfValidationRules],
    createOrder
  )
  .get("/orders", /* jwtAccessMiddleware, */ getOrders)
  .post("/orders/pay", jwtAccessMiddleware, makePayment)
  .delete("/orders/:id", /* jwtAccessMiddleware, */ deleteOrder)

  .get("/profil/:id", jwtAccessMiddleware, Profil)
  .put(
    "/profil-edit/:id",
    jwtAccessMiddleware,
    [...validateProfilUpdate],
    updatedProfil
  );
module.exports = router;
