const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide product name'],
      maxlength: [100, 'Name can not be more than 100 characters'],
    },
    details:{
      type: String,
      required: [true, 'Please provide product details']
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      default: 0,
    },
    size: {
      type: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL']
      },
      required: [true, 'Please provide sizes available'],
    },
    image: {
      type: String,
      default: '/uploads/example.jpeg',
    },
    category: {
      type: String,
      required: [true, 'Please provide product category'],
      enum: ['Men', 'Women', 'Kids'],
    },
    company: {
      type: String,
      required: [true, 'Please provide company'],
      
    },
    colors: {
      type: [String],
      default: ['#222'],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
