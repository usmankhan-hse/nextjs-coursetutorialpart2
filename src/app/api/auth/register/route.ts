import connectDb from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req:NextRequest){
    try {
        const {name, email, password} = await req.json();
        if (!name || !email || !password) {
            return NextResponse.json({message : 'incomplete credentials'})
            
        }
        await connectDb();
        //check existing email
        const userExists = await User.findOne({email});
        if (userExists) {
            return NextResponse.json({message: 'user already exists'})
            
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password:hashedPassword})
        return NextResponse.json({success: true, user})
    } catch (error) {
        throw error;
    }
}