const router = require("express").Router();
const myTemplate = require("../controllers/mytemplate-controller");
const myUser = require("../controllers/user-controller");
const mySlide = require("../controllers/slide-controller");
const AuthM = require("../middleware/auth-middleware");
const upload = require("../middleware/multer-middleware");

router.get("/", myTemplate.home);
router.get("/get-template-list", AuthM.userAuth, myTemplate.getMyTemplateList);
router.get(
  "/get-template-details-by-id/:id",
  myTemplate.getMyTemplateDetailsById
);

router.post("/create-new-slide", AuthM.userAuth, myTemplate.createNewTemplate);
router.delete("/delete-a-slide", AuthM.userAuth, myTemplate.deleteMyTemplate);
router.put("/update-a-slide", AuthM.userAuth, myTemplate.updateMyTemplate);
router.post("/user-signup", myUser.userSignUp);

router.post("/user-login", myUser.userLogin);
// router.post("/user-profile", myUser.userProfile);
router.post("/user-profile", AuthM.userAuth, myUser.userProfile);

router.get("/slides", mySlide.getSlides);
router.post("/add-slide", upload.single("slide"), mySlide.addNewSlide);

module.exports = router;
