import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    pic: {
      type: String,
      require: true,
      default:
        "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-user-image-700-200353990.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.path("createdAt");

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.log(error);
  }
});

userSchema.methods.isPasswordSame = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
