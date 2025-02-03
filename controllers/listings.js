const Listing = require("../models/listing");

module.exports.index = async(req,res) => {
    const allListings = await  Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm = (req,res) =>{
    res.render("listings/new.ejs");
};

// module.exports.showListing = async(req,res)=>{
//     let {id}=req.params;
//      const listing = await Listing.findById(id)
//      .populate({
//         path:"reviews",
//         populate : {
//             path:"author",
//         },
//     })
//         .populate("owner");
//      if(!listing) {
//     req.flash("error","Listing you requested for does not exist!");
//         res.redirect("/listings");

//      }
//      console.log(listing);
//     res.render("listings/show.ejs",{ listing });
// };


module.exports.showListing = async(req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }

  console.log(listing);

  // Pass the listing with latitude and longitude to the frontend
  res.render("listings/show.ejs", { listing });
};







// create listing
module.exports.createListing = async (req,res,next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing =  new Listing(req.body.listing);
   console.log(req.user);
    newListing.owner = req.user._id;
    newListing.image = { url,filename };
    await newListing.save();
    req.flash("success","New Listing Created !");
     res.redirect("/listings");
};


  


module.exports.renderEditForm = async(req,res) =>{
    let {id}=req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
            res.redirect("/listings");
    
         }

         let originalImageUrl = listing.image.url;
         originalImageUrl = originalImageUrl.replace("/upload","/upload/h_200,w_250");

    res.render("listings/edit.ejs",{ listing,originalImageUrl });
};




module.exports.updateListing = async(req,res) =>{
let {id}=req.params;
let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

if(typeof req.file !== "undefined") {
let url = req.file.path;
let filename = req.file.filename;
listing.image = { url, filename };
await listing.save();
}
req.flash("success","Listing updated");
res.redirect(`/listings/${id}`);
};



module.exports.destroyListing = async(req,res)=>{
    let { id }=req.params;
    let deletedListing =  await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
};






// second search
module.exports.index = async (req, res) => {
  try {
    // Capture the search query
    const { q } = req.query;

    const searchConditions = [];

    if (q) {
      const queryWords = q.trim().split(/\s+/); // Split by whitespace

      queryWords.forEach(word => {
        const price = Number(word); // Check if the word is a number for price
        if (!isNaN(price)) {
          // Search by price if it's a valid number
          searchConditions.push({ price: price });
        } else {
          // Otherwise, search by title, location, or country
          searchConditions.push({
            $or: [
              { title: { $regex: word, $options: 'i' } },
              { location: { $regex: word, $options: 'i' } },
              { country: { $regex: word, $options: 'i' } }
            ]
          });
        }
      });
    }

    // Use $or to match any of the conditions
    const allListings = await Listing.find({ $or: searchConditions });

    res.render('listings/index', { allListings });
  } catch (error) {
    console.log(error);
    req.flash('error', 'Could not fetch listings');
    res.redirect('/listings');
  }
};



exports.getListings = async (req, res) => {
  try {
    const listings = await Listing.find({});
    const gstRate = 0.18;

    const allListings = listings.map(listing => ({
      ...listing.toObject(),
      priceWithGst: Math.round(listing.price + listing.price * gstRate),
    }));

    res.render('listings/index', { allListings }); // Update the path to include the folder
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).send('Internal Server Error');
  }
};





  