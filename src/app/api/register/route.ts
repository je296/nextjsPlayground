import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import bcrypt from "bcryptjs";
import User from "../../../../models/users";

export async function POST(req:any) {
    try {
        const {name, email, password} = await req.json();
        const hashPassword = await bcrypt.hash(password, 16);
        await connectDB();

        await User.create({name,email,password: hashPassword});
        
        return NextResponse.json({message: "User Registerd"}, {status: 200});
    } catch(error) {
        return NextResponse.json({message: "An error occure while register the user"}, {status: 500});
    }
}