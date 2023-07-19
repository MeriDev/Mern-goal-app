const moongose=require('mongoose')

const goalSchema = moongose.Schema(
  {
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