import { signIn } from "@/auth"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export const GET  = async (req: NextRequest, ) => {
    const token = req.nextUrl.searchParams.get('acess_token')

    await signIn('credentials', {token, redirect: false})

    return redirect('/dashboard')
}