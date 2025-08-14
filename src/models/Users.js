import Mongoose from "mongoose";

const Schema = new Mongoose.Schema(
{
  "roleId": {
    "type": Mongoose.Schema.Types.ObjectId,
    "ref": "Roles"
  },
  "fullname": {
    "type": "String",
    "required": true
  },
  "email": {
    "type": "String",
    "default": true
  },
  "passsword": {
    "type": "String",
    "default": true
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

export default Mongoose.model('Users', Schema);