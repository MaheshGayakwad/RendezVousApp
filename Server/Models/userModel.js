import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  pic: {
    type: String,
    require: true,
    default:
      "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-user-image-700-200353990.jpg",
  },
});

userSchema.methods.isPasswordSame = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = bcrypt.hash(this.password, 10);
});
const User = mongoose.model("User", userSchema);

export default User;
