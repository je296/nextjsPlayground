import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import User from "../../../../models/users";

export async function POST(req:any) {
    try {
        await connectDB();
        const {email} = await req.json();

        const data = await User.findOne({email}).select("_id");
        console.log("🚀 ~ GET ~ res:", data)
        
        return NextResponse.json({data});
    } catch(error) {
        console.log(error);
        ;
    }
}