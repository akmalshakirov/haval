const multer = require("multer")
const upload = multer()
const {
    getAllAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    getAdminById,
} = require("./controllers/adminController");
const {
    getCars,
    addCar,
    updateCar,
    deleteCar,
} = require("./controllers/carController");
const { register, loginAdmin } = require("./controllers/authController");
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
const router = require("express").Router();

router
    .get(
        "/admins",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        getAllAdmin
    )
    .get(
        "/admins/:id",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        getAdminById
    )
    .post(
        "/add-admin",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        createAdmin
    )
    .post("/login", loginLimiter, loginAdmin)
    .post("/register", jwtAccessMiddleware, register)
    .put(
        "/admins/:id",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        updateAdmin
    )
    .delete(
        "/admins/:id",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        deleteAdmin
    )

    .get("/cars", jwtAccessMiddleware, getCars)
    .post(
        "/add-car",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        upload.single("image"),
        addCar
    )
    .put(
        "/cars/:id",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        updateCar
    )
    .delete(
        "/cars/:id",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        deleteCar
    )

    .get("/categories", jwtAccessMiddleware, getAllCategories)
    .get(
        "/categories/:id",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
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
        roleAccessMiddleware(["admin"]),
        updateCategory
    )
    .delete(
        "/categories/:id",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        deleteCategory
    )

    .get("/dilers", jwtAccessMiddleware, getDiler)
    .post(
        "/add-diler",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        addDiler
    )
    .put(
        "/dilers/:id",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        updateDiler
    )
    .delete(
        "/dilers/:id",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        deleteDiler
    )

    .get("/news", jwtAccessMiddleware, getAllNews)
    .post(
        "/add-news",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        addNews
    )
    .put(
        "/news/:id",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        updateNews
    )
    .delete(
        "/news/:id",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        deleteNews
    )

    .get("/dealerCall", jwtAccessMiddleware, getAllDealerCalls)
    .post("/add-dealerCall", addDealerCall)
    .put(
        "/dealerCall/:id",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        updateDealerCall
    )
    .delete(
        "/dealerCall/:id",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        deleteDealerCall
    )

    .get("/savdo-statistikasi", jwtAccessMiddleware, getAllSavdoStatistikasi)
    .post(
        "/add-savdo-statistikasi",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        addSavdoStatistikasi
    )
    .put(
        "/savdo-statistikasi/:id",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        updateSavdoStatistikasi
    )
    .delete(
        "/savdo-statistikasi/:id",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        deleteSavdoStatistikasi
    )

    .get("/test-driver", jwtAccessMiddleware, getTestDrivers)
    .post("/add-test-driver", jwtAccessMiddleware, addTestDriver)

    .get(
        "/users",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        getAllUsers
    )
    .get(
        "/users/:id",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        getUserById
    )
    .delete(
        "/users/:id",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        deleteUser
    )

    .get("/videos", jwtAccessMiddleware, getVideos)
    .post(
        "/add-video",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        addVideo
    )
    .put(
        "/videos/:id",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        updateVideo
    )
    .delete(
        "/videos/:id",
        jwtAccessMiddleware,
        roleAccessMiddleware(["admin"]),
        deleteVideo
    );

module.exports = router;
