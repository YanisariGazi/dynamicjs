import Mongoose from "mongoose";

const Schema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Number,
    },
    updatedAt: {
        type: Number,
    },
},
{
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000 )}
});

Schema.set('toObject', { virtuals: true });
Schema.set('toJSON', { virtuals: true });

export default Mongoose.model('Category', Schema);