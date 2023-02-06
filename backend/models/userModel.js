const { Schema, model, models } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'user must have a name'],
    },
    email: {
      type: String,
      required: [true, 'user must have a email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'user must have a password'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = models.User || model('User', userSchema);
module.exports = User;
