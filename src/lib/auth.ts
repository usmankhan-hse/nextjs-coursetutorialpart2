import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import connectDb from "./db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import { userAgent } from "next/server";

const authOptions:NextAuthOptions = {
    
    providers:[
        CredentialsProvider({
            name: 'Credentials',
            credentials : {
                email:{
                    label: 'Email',
                    type: 'text'
                },
                password:{
                    label : 'Password',
                    type : 'password'
                }
            },
           async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;
                if (!email || !password) {
                    throw new Error('Email or password not found.')
                    
                }
                await connectDb();
                // check user email exists
                const user = await User.findOne({email});
                if (!user) {
                    throw new Error('User doesnt exists.')
                    
                }
                // check password match
                const passwordMatched = await bcrypt.compare(password, user.password);
                if (!passwordMatched) {
                    throw new Error('Incorrect password.')
                    
                }
                return {
                    id: user._id,
                    name : user.name,
                    email: user.email,
                    image: user.image
                }


            },
        }),
        GoogleProvider({
           clientId: process.env.GOOGLE_CLIENT_ID!,
           clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks:{
        async signIn({account, user}){
            if (account?.provider == 'google') {
                await connectDb();
                let existingUser = await User.findOne({email: user?.email});
                if (!existingUser) {
                 const existUser =    await User.create({
                    email: user.email,
                    name : user.name,
                    

                 })
                    
                }
                user.id = existingUser._id as string;

                
            }
            return true;
        },
        async jwt({token,user}){
            if (user) {
                token.id = user.id,
                token.name = user.name,
                token.email = user.email,
                token.image = user.image                
            }

            return token;
        },
        session({session, token}){
            if (session.user) {
                session.user.id = token.id as string,
                session.user.name = token.name,
                session.user.email = token.email,
                session.user.image = token.image as string
            }
            return session;
        }

    },
    session:{
        strategy:"jwt",
        maxAge: 1000*60*60*24*30

    },
    pages:{
        signIn : '/login',
        error : '/login'
    },
    secret:process.env.NEXT_AUTH_SECRET
};


export default authOptions;