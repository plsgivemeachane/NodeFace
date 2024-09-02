import logger from "@/app/winstonlogger";
import { NextRequest, NextResponse } from "next/server";
import { get_client, DATABASE_ID, USERS_ID } from "../../Appwrite";
import { Databases, ID, Query } from "node-appwrite";
import { jwt } from "../../JWT";
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
    const cookieStore = cookies()
    const database = new Databases(get_client());

    // Create user in database
    try {
        const data = await request.json();
        logger.verbose(data)

        const username = data.username;
        const email = data.email;
        const password = data.password; // Password hash is stored in the database
        
        if(!username || !email || !password) {
            return new NextResponse("Bad Request", {
                status: 400
            })
        }

        // Check if user exists
        const record = await database.listDocuments(DATABASE_ID, USERS_ID, [
            Query.equal("email", [email])
        ])

        logger.verbose(record)

        if(record.total == 0) {
            return new NextResponse("User already exists", {
                status: 400
            })
        }

        // Generate token
        const token = jwt.sign({
            id: record.documents[0].$id,
            username: record.documents[0].username,
        }, 7 * 24 * 3600) // 7 days

        cookieStore.set('token', token, {
            httpOnly: true,
            path: "/",
        })
        
        return new NextResponse(JSON.stringify({ message: "Authencated" }));
    } catch (e: any) {
        logger.error(e.stack)
        // logger.error(e)
        return new NextResponse("Internal Server Error",{
            status: 500
        });
    }
}