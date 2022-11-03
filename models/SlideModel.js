const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SlidesModelSchema = new Schema({
  name: { type: String },
  image: { type: Array },
  slidesCount: { type: Number },
});

const SlideModel = mongoose.model("slide", SlidesModelSchema);

module.exports = SlideModel;
// MONGODB_URI = mongodb://127.0.0.1:27017/test
