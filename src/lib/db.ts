import { connect } from "mongoose";
let mongodbUrl = process.env.MONGODB_URL;
if (!mongodbUrl) {
throw new Error ('mongodb url not available')    
}

let cached = global.mongoose;

if (!cached) {
   cached = global.mongoose = {conn : null, promise : null};

    
}
const connectDb = async () =>{
    
        if (cached.conn) {
            console.log('connecting from cached conn')
            return cached.conn;
            
        }
        if (!cached.promise) {
           cached.promise = connect(mongodbUrl).then((c)=>c.connection);
           console.log('installing new cached promise')

            
        }
        try {
            if (cached.promise) {
            cached.conn = await cached.promise;
            console.log('installing new cached conn from new cached promise')

            
        }
            
        } catch (error) {
            throw error
        }
        console.log('starting connection from new one')
        return cached.conn;       
        
    
}
export default connectDb;