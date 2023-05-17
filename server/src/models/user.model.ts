import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

// createdAt, updatedAt are not in user body in request. So an error is generated when using UserDocument interface as the type of the parameter of createUser functions. This is a nice workaround to use this interface in such functions
export interface UserInput {
  email: string;
  username: string;
  password: string;
  img?: string;
  country?: string;
  countryCode?: string;
  phone?: string;
  desc?: string;
  isSeller?: boolean;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String, required: false, default: "https://i.imgur.com/0kPOgsA.jpg" },
    country: { type: String, required: true },
    countryCode: { type: String, required: false },
    phone: { type: String, required: false },
    desc: { type: String, required: false },
    isSeller: { type: Boolean, default: false },
  }, {
    timestamps: true,
  }
);

// never return the password when returning the user collection. (wont work because of lean() method)
// userSchema.set("toJSON", {
//   transform: function(doc, ret, opt) {
//     delete ret.password;
//     return ret;
//   }
// });


userSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  if(!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
}

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;




