import logger from "@/app/winstonlogger";
import { NextRequest, NextResponse } from "next/server";
import { get_client, DATABASE_ID, USERS_ID } from "../../Appwrite";
import { Databases, ID, Query } from "node-appwrite";
import { cookies } from "next/headers";
import { jwt } from "../../JWT";
import { JWTResult } from "quanvnjwt";

interface JWT_DATA {
    id: string
    username: string
    exp: number
    iat: number
}

export async function GET(request: NextRequest) {
    const cookieStore = cookies()
    const database = new Databases(get_client());

    try {
        if(!cookieStore.has("token")) {
            return new NextResponse(JSON.stringify({ message: "Unauthorized" }));
        }

        const token = cookieStore.get("token")?.value; // Surely it has

        if (!token) {
            throw "Unreachable"; // Token checking are above so this surely unreachable
        }

        const verified: JWTResult = jwt.verify(token);

        if(!verified.status) {
            return new NextResponse(JSON.stringify({ message: verified.message }));
        }

        if(!verified.data) {
            throw "Unreachable";
        }

        const data = verified.data as JWT_DATA;

        logger.verbose(verified.data)

        const record = await database.listDocuments(DATABASE_ID, USERS_ID, [
            Query.equal("username", [data.username]),
        ])

        logger.verbose(record)

        return new NextResponse(JSON.stringify({ record: record.documents[0] }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            }
        });
    } catch (e: any) {
        logger.error(e.stack)
        // logger.error(e)
        return new NextResponse("Internal Server Error",{
            status: 500
        });
    }
}