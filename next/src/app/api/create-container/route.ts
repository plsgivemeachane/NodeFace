import { NextRequest, NextResponse } from "next/server";
import { create_container } from "../Huggingface";
import { cookies } from 'next/headers'
import { database, DATABASE_ID, USERS_ID } from "../Appwrite";
import { Query } from "node-appwrite";
import logger from "@/app/winstonlogger";
export async function POST(request: NextRequest) {

    const cookieStore = cookies()
    const password_hashes = cookieStore.get('user_id')?.value;

    logger.verbose("Quering database")
    // Query username
    const data = await database.listDocuments(
        DATABASE_ID,
        USERS_ID,
        [
            Query.equal("password", [password_hashes??""])
        ]
    );

    logger.verbose(data)

    // const repo_id = create_container()
    
    return new NextResponse(JSON.stringify({ "message": "ok" }));
}