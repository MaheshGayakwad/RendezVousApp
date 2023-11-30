import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  pic: {
    type: String,
    require: true,
    default:
      "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-user-image-700-200353990.jpg",
  },
});

const User = mongoose.model("User", userSchema);
