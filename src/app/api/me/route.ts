import { auth } from "@/auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const session = await auth()

    return Response.json({ token: session?.token })
}