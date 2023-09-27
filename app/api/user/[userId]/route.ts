import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { userId: string }}) {
  try {
    if (!params.userId) {
      return new NextResponse("User ID missing", { status: 400 })
    }

    const user = await db.profile.findFirst({
      where: {
        userId: params.userId
      }
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.log("[USER_ID]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}