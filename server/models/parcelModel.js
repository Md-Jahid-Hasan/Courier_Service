const { Schema, model } = require('mongoose');
const parcelSchema = new Schema({
    ProductType:String,
    SenderName: String,
    SenderNumber: Number,
    RecieverName:String,
    RecieverNumber: Number,
    BookedFrom:{type:Schema.Types.ObjectId,ref:'branch'},
    SendTo:{type:Schema.Types.ObjectId,ref:'branch'},
    TotalCost:Number,
    PaidAmount:Number,
    PayableAmount:Number,
    status:String,
    BookedBy:{type:Schema.Types.ObjectId,ref:'user'},
    // date: { type: Date, default: Date}
},
{
    timestamps:true
})




const Parcel = model('parcel', parcelSchema);
module.exports.Parcel = Parcel;