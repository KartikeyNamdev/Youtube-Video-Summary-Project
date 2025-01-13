import { NhostClient } from "@nhost/nhost-js";
import { NextResponse } from "next/server";
const nhost = new NhostClient({
  backendUrl: process.env.NODE_ENV,
});
export async function signup(request: Request) {
  const body = await request.json();
  const { error } = await nhost.auth.signUp({
    email: body.email,
    password: body.password,
  });
  if (error) {
    return NextResponse.json({ error });
  }
  return NextResponse.json({ msg: "success" });
}
