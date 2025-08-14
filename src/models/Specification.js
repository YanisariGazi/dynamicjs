import Mongoose from "mongoose";

const Schema = new Mongoose.Schema(
{
  "productId": {
    "type": Mongoose.Schema.Types.ObjectId,
    "required": true
  },
  "name": {
    "type": "String",
    "required": true
  },
  "status": {
    "type": "Boolean",
    "default": true
  },
  "createdAt": {
    "type": "Number"
  },
  "updatedAt": {
    "type": "Number"
  }
},
{
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000 )},
    //TABLE NAME
});

Schema.set('toObject', { virtuals: true });
Schema.set('toJSON', { virtuals: true });

export default Mongoose.model('Specification', Schema);