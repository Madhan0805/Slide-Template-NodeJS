const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MyTemplateSchema = new Schema({
  name: { type: String },
  slides: { type: Array },
  slidesCount: { type: Number },
  user_id: { type: ObjectId },
});

const MyTemplateModel = mongoose.model("mytemplate", MyTemplateSchema);

module.exports = MyTemplateModel;
