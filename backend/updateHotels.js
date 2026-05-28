const mongoose = require("mongoose");
require("dotenv").config();

// Standard Hotel Schema mapping
const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  price: Number,
  rating: Number,
  image: String,
  category: String,
});

const Hotel = mongoose.model("Hotel", hotelSchema);

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/quickstay";

async function fixImages() {
  try {
    await mongoose.connect(mongoURI);
    console.log("⚡ MongoDB Connected Successfully for absolute image fix...");

    // Pure collection ka direct data overwrite with active working high-res links
    const luxuryImages = [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80", // Aura Ocean
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80", // Elite Glasshouse
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80", // Grand Midnight
    ];

    const currentHotels = await Hotel.find();

    for (let i = 0; i < currentHotels.length; i++) {
      // Har hotel document me automatic sequential dynamic link push hogi
      const assignedImage = luxuryImages[i % luxuryImages.length];
      await Hotel.updateOne(
        { _id: currentHotels[i]._id },
        { $set: { image: assignedImage } },
      );
    }

    console.log(
      "🎉 SUCCESS: Saari image links solid premium images se replace ho gayi hain!",
    );
    process.exit(0);
  } catch (err) {
    console.error("❌ Error while updating database documents:", err);
    process.exit(1);
  }
}

fixImages();
