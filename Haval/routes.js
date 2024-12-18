const { getAllAdmin, createAdmin, updateAdmin, deleteAdmin, loginAdmin, logoutAdmin, getAdminById } = require('./controllers/adminController');
  const { getCars, addCar, updateCar, deleteCar } = require('./controllers/carController');
  const { register } = require('./controllers/authController');
  const { getDiler, addDiler, deleteDiler, updateDiler } = require('./controllers/dilerController');
  const { getAllNews, addNews, updateNews, deleteNews } = require('./controllers/newsController');
  const { getVideos, addVideo, updateVideo, deleteVideo } = require('./controllers/videoController');
  const { createCategory, getAllCategories, getCategoryById, deleteCategory } = require('./controllers/categoryController');
  const { getAllDealerCalls, addDealerCall, deleteDealerCall } = require('./controllers/oreder-dealer-callController');
  const { getAllSavdoStatistikasi, addSavdoStatistikasi, updateSavdoStatistikasi, deleteSavdoStatistikasi } = require('./controllers/savdo_statistikasiController');
  const { getTestDrivers, addTestDriver } = require('./controllers/test_drayverController');
  const { loginLimiter } = require('./middlewares/loginLimiter');
  const {  jwtAccessMiddleware } = require('./middlewares/jwt-access.middleware');
  const { roleAccessMiddleware } = require('./middlewares/role-access.middleware');
  const { getAllUsers, deleteUser } = require('./controllers/userController');
  const router = require("express").Router();
  
  router
    .get("/admins", jwtAccessMiddleware,roleAccessMiddleware(['admin']), getAllAdmin)
    .get("/admins/:id", jwtAccessMiddleware,roleAccessMiddleware(['admin']), getAdminById)
    .post("/add-admin", jwtAccessMiddleware, roleAccessMiddleware(['admin']), createAdmin) 
    .post("/login", loginLimiter, loginAdmin) 
    .post("/register", register)
    .post("/logoutAdmin", jwtAccessMiddleware, roleAccessMiddleware(['admin']), logoutAdmin)
    .put("/admins/:id", jwtAccessMiddleware, roleAccessMiddleware(['admin']), updateAdmin)
    .delete("/admins/:id", jwtAccessMiddleware, roleAccessMiddleware(['admin']), deleteAdmin)
  
    .get("/cars", getCars)
    .post("/add-car",jwtAccessMiddleware, roleAccessMiddleware(['admin']), addCar)
    .put("/cars/:id",jwtAccessMiddleware, roleAccessMiddleware(['admin']), updateCar)
    .delete("/cars:id",jwtAccessMiddleware, roleAccessMiddleware(['admin']), deleteCar)


    .get("/dilers", getDiler)
    .post("/add-diler",jwtAccessMiddleware, roleAccessMiddleware(['admin']), addDiler)
    .put("/dilers/:id",jwtAccessMiddleware, roleAccessMiddleware(['admin']), updateDiler)
    .delete("/dilers/:id",jwtAccessMiddleware, roleAccessMiddleware(['admin']), deleteDiler)

    .get("/news", getAllNews)
    .post("/add-news",jwtAccessMiddleware, roleAccessMiddleware(['admin']), addNews)
    .put("/news/:id",jwtAccessMiddleware, roleAccessMiddleware(['admin']), updateNews)
    .delete("/news/:id",jwtAccessMiddleware, roleAccessMiddleware(['admin']), deleteNews)

    .get("/videos", getVideos)
    .post("/add-video", jwtAccessMiddleware, roleAccessMiddleware(['admin']), addVideo)
    .put("/videos/:id", jwtAccessMiddleware, roleAccessMiddleware(['admin']), updateVideo)
    .delete("/videos/:id", jwtAccessMiddleware, roleAccessMiddleware(['admin']), deleteVideo)

    .get("/categories", getAllCategories)
    .get("/categories/:id", jwtAccessMiddleware, roleAccessMiddleware(['admin']),  getCategoryById)
    .post("/add-category", jwtAccessMiddleware, roleAccessMiddleware(['admin']), createCategory)
    .delete("/categories/:id", jwtAccessMiddleware, roleAccessMiddleware(['admin']), deleteCategory)

    .get("/dealerCall", getAllDealerCalls)
    .post("/add-dealerCall", addDealerCall)
    .delete("/dealerCall/:id", jwtAccessMiddleware, roleAccessMiddleware(['admin']), deleteDealerCall)

    .get("/savdo-statistikasi", getAllSavdoStatistikasi)
    .post("/add-savdo-statistikasi", jwtAccessMiddleware, roleAccessMiddleware(['admin']), addSavdoStatistikasi)
    .put("/savdo-statistikasi/:id", jwtAccessMiddleware, roleAccessMiddleware(['admin']), updateSavdoStatistikasi)
    .delete("/savdo-statistikasi/:id", jwtAccessMiddleware, roleAccessMiddleware(['admin']), deleteSavdoStatistikasi)

    .get("/test-driver", getTestDrivers)
    .post("/add-test-driver", addTestDriver)

    .get("/users", getAllUsers)
    .delete("/users/:id", deleteUser)

  module.exports = router;
  