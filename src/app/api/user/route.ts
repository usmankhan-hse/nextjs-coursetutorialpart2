import authOptions from "@/lib/auth";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        await connectDb();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({message: 'session not found'},{status:400})
            
        }
        const user = await User.findById(session.user.id).select('-password');
        if (!user) {
            return NextResponse.json({message: 'user not found'},{status:400})
            
        }
        return NextResponse.json(user, {status:200})
        
        
    } catch (error) {
        return NextResponse.json({message: 'error in getting user'},{status:500})
    }
}