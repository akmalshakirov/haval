const { getAllAdmin, createAdmin, updateAdmin, deleteAdmin, loginAdmin, logoutAdmin } = require('./controllers/adminController');
  const { getCars, addCar, updateCar, deleteCar } = require('./controllers/carController');
  const { register, login } = require('./controllers/authController');
  const { getDiler, addDiler, deleteDiler } = require('./controllers/dilerController');
  const { getAllNews, addNews, updateNews, deleteNews } = require('./controllers/newsController');
  const { getVideos, addVideo, updateVideo, deleteVideo } = require('./controllers/videoController');
  const { createCategory, getAllCategories, getCategoryById, deleteCategory } = require('./controllers/categoryController');
  const { getAllDealerCalls, addDealerCall, deleteDealerCall } = require('./controllers/oreder-dealer-callController');
  const { getAllSavdoStatistikasi, addSavdoStatistikasi, updateSavdoStatistikasi, deleteSavdoStatistikasi } = require('./controllers/savdo_statistikasiController');
  const { getTestDrivers, addTestDriver } = require('./controllers/test_drayverController');
  const { loginLimiter } = require('./middlewares/loginLimiter');
  const {  jwtAccessMiddleware } = require('./middlewares/jwt-access.middleware');
  const { roleAccessMiddleware } = require('./middlewares/role-access.middleware');
  const router = require("express").Router();
  
  router
    .get("/admins", jwtAccessMiddleware,roleAccessMiddleware(['admin']),  getAllAdmin)
    .post("/add-admin", jwtAccessMiddleware, roleAccessMiddleware(['admin']),  createAdmin) 
    .post("/loginAdmin", loginLimiter, loginAdmin) 
    .post("/logoutAdmin", jwtAccessMiddleware, roleAccessMiddleware(['admin']), logoutAdmin)
    .put("/admins/:id", jwtAccessMiddleware, roleAccessMiddleware(['admin']), updateAdmin)
    .delete("/admins/:id", jwtAccessMiddleware, roleAccessMiddleware(['admin']), deleteAdmin)
  
    .get("/cars", getCars)
    .post("/add-car", addCar)
    .put("/cars/:id", updateCar)
    .delete("/cars:id", deleteCar)

    .post("/login", loginLimiter, login)
    .post("/register", register)

    .get("/dilers", getDiler)
    .post("/add-diler", addDiler)
    // .put("/dilers/:id", updat)
    .delete("/dilers/:id", deleteDiler)

    .get("/news", getAllNews)
    .post("/add-news", addNews)
    .put("/news/:id", updateNews)
    .delete("/news/:id", deleteNews)

    .get("/videos", getVideos)
    .post("/add-video", addVideo)
    .put("/videos/:id", updateVideo)
    .delete("/videos/:id", deleteVideo)

    .get("/categories", getAllCategories)
    .get("/categories/:id", getCategoryById)
    .post("/add-category", createCategory)
    .delete("/categories/:id", deleteCategory)

    .get("/dealerCall", getAllDealerCalls)
    .post("/add-dealerCall", addDealerCall)
    .delete("/dealerCall/:i", deleteDealerCall)

    .get("/savdo-statistikasi", getAllSavdoStatistikasi)
    .post("/add-savdo-statistikasi", addSavdoStatistikasi)
    .put("/savdo-statistikasi/:id", updateSavdoStatistikasi)
    .delete("/savdo-statistikasi/:id", deleteSavdoStatistikasi)

    .get("/test-driver", getTestDrivers)
    .post("/add-test-driver", addTestDriver)

  module.exports = router;
  