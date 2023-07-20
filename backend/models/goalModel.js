const moongose=require('mongoose')

const goalSchema = moongose.Schema(
  {
    user: {
      type: moongose.Schema.Types.ObjectId,
      required:true,
      ref:'User',
    },
    text:{
      type: String,
      required:[true,'Please add a text value']
    },
  },
  {
    timestamps: true,
  }
)

module.exports = moongose.model('Goal',goalSchema)