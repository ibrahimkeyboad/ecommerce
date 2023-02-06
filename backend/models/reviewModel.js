const { Schema, model, models } = require('mongoose');

const reviewSchema = new Schema(
  {
    review: {
      type: String,
      required: [true, 'Review must have content'],
    },
    rating: {
      type: Number,
      default: 0,
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Review must be belong to a product'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  });
  next();
});

const Review = models.Review || model('Review', reviewSchema);

module.exports = Review;
