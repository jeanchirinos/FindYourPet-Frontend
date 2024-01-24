// import { unstable_noStore } from "next/cache"

export async function GET() {
  // unstable_noStore()
  console.log('EXECUTING')

  return Response.json({ msg: 'Se eliminó el token' })
}
