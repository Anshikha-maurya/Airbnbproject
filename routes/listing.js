const express =  require("express");
const router  = express.Router();
const  wrapAsync=require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const  { isLoggedIn,isOwner,validateListing } = require("../middleware.js"); 
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


// Filter search option
// router.get("/search", wrapAsync(async (req, res) => {
//     const { query } = req;
//     const listings = await Listing.find(query);
//     res.render("listings/index", { listings });
//   }));
router.get("/search", wrapAsync(listingController.index));

//   gst
router.get('/',listingController.getListings);



    router.route("/")
        .get(wrapAsync(listingController.index))
            .post(
            isLoggedIn,
            
            upload.single("listing[image]"),
            validateListing,
            wrapAsync(listingController.createListing)
        );

       

       

      // new route
    router.get("/new", isLoggedIn,listingController.renderNewForm);


router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put
(isLoggedIn,isOwner, upload.single("listing[image]"),
 validateListing,
wrapAsync(listingController.updateListing)
)

.delete(
isLoggedIn,isOwner,
wrapAsync(listingController.destroyListing ));
     






// Edit route
router.get("/:id/edit",isLoggedIn,isOwner,
    wrapAsync(listingController.renderEditForm));


module.exports = router;