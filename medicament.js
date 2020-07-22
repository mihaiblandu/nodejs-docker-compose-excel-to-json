import mongoose from "mongoose";

const Schema = mongoose.Schema;
const {ObjectId} = mongoose
// Create the User Schema.
const medicamentSchema = new Schema({
  props: {
    type: Object,
    required: true
  },
  _class:{
    type: String,
    required: false,
    default: "javabrains.io.registru.model.MedMongoModel"

  } 
});

const Medicament = mongoose.model("medicaments", medicamentSchema);

export default Medicament;