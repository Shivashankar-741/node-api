const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: { type: String, required: [true, "A tour must have a name"], unique: true, trim: true },
  duration: { type: String, required: [true, "A tour must have a duration"] },
  maxGroupSize: { type: Number, required: [true, "A tour must have a Group Size"] },
  difficulty: { type: String, required: [true, "A tour must have a difficulty"] },
  ratingsAverage: { type: Number, default: 4.5 },
  ratingsQuantity: { type: Number, default: 0 },
  price: { type: Number, required: [true, "A tour must have a price"] },
  priceDiscount: Number,
  summary: { type: String, trim: true, required: [true, "A tour must have a description"] },
  description: { type: String, trim: true },
  imageCover: { type: String, required: [true, "A tour must have a cover image"] },
  images: [String],
  createdAt: { type: Date, default: Date.now() },
  startDates: [Date],
});

const Tour = mongoose.model("Tour", tourSchema); // inside the model name will create the collection name+s in db

module.exports = Tour;

// const testTour = new Tour({
//     name: "The Forest jack",
//     rating: 4.96,
//     price: 497,
//   });

//   testTour
//     .save()
//     .then((doc) => {
//       console.log(doc);
//     })
//     .catch((err) => {
//       console.log("ERROR:", err);
//     });
