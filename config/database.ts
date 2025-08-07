import mongoose from "mongoose"

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Connect to database successfully <3")
  } catch (error) {
    console.log("Connect to database failed")
    console.log(error)
  }
}