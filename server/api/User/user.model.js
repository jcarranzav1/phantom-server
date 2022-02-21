const { hash, compare } = require('bcryptjs');
const mongoose = require('mongoose');
const { isEmail } = require('validator');

const fields = {
  email: {
    type: String,
    required: true,
    trim: true,
    maxLength: 256,
    unique: true,
    validate: {
      validator(value) {
        return isEmail(value);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
    maxLength: 256,
  },
  confirmPassword: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
    maxLength: 256,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 128,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 256,
  },

  cellphone: {
    type: String,
    trim: true,
  },
  photo: {
    type: String,
    default: '',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  city: {
    type: String,
    default: '',
  },
  country: {
    type: String,
    default: '',
  },
  postalCode: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
};
const hiddenFields = ['password', 'confirmPassword'];

const userSchema = new mongoose.Schema(fields, {
  timestamps: true,
});

userSchema.methods.toJSON = function toJSON() {
  const document = this.toObject();
  hiddenFields.forEach((field) => {
    if (document[field] !== undefined) {
      delete document[field];
    }
  });
  return document;
};

userSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password') && !this.isModified('confirmPassword')) {
      next();
    }
    this.password = await hash(this.password, 10);
    this.confirmPassword = await hash(this.confirmPassword, 10);
    next();
  } catch (err) {
    next({
      message: err,
      statusCode: 403,
    });
  }
});

userSchema.methods.verifyPassword = function verifyPassword(value) {
  return compare(value, this.password);
};

const User = mongoose.model('users', userSchema);

module.exports = User;
