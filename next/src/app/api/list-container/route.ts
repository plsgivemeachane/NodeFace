import { NextRequest, NextResponse } from "next/server";
import { list_container } from "../Huggingface";



export async function GET(request: NextRequest) {
    return new NextResponse(JSON.stringify(await list_container()));
}