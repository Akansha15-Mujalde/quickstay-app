const mongoose = require("mongoose");
require("dotenv").config();

// Hotels ka schema define karein (agar aapka model alag hai toh field names check kar lein)
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

const seedImages = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("🚀 Connected to MongoDB for updating images...");

    // 1. Aura Ocean Breeze Stay ki image update karein
    await Hotel.updateOne(
      { name: /Aura Ocean Breeze/i },
      {
        $set: {
          image:
            "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
        },
      },
    );

    // 2. Elite Glasshouse Resort ki image update karein
    await Hotel.updateOne(
      { name: /Elite Glasshouse/i },
      {
        $set: {
          image:
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
        },
      },
    );

    // 3. The Grand Midnight Villa & Spa ki image update karein
    await Hotel.updateOne(
      { name: /The Grand Midnight/i },
      {
        $set: {
          image:
            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80",
        },
      },
    );

    console.log(
      "✅ Saari hotel images database me successfully update ho gayi hain!",
    );
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedImages();
