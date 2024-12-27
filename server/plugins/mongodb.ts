import { connect } from "mongoose";

export default defineNitroPlugin((_nitroApp) => {
    connect(useRuntimeConfig().MONGO_URI, {
        dbName: 'images'
    }),
    console.log('Connected to MongoDB')
});