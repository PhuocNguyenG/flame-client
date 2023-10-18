import { NextRequest } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "https://flame-agri-admin.web.app",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// e.g a webhook to `your-website.com/api/revalidate?tag=collection&secret=<token>`
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const tag = request.nextUrl.searchParams.get("tag");
  const path = request.nextUrl.searchParams.get("path");

  if (secret !== process.env.MY_SECRET_VALIDATE_TOKEN) {
    return Response.json({ message: "Invalid secret" }, { status: 401 });
  }

  if (!tag && !path) {
    return Response.json(
      { message: "Missing tag or path param" },
      { status: 400 }
    );
  } else if (tag) {
    revalidateTag(tag);
  } else if (path) {
    revalidatePath(path);
  }

  return Response.json({ revalidated: true, now: Date.now() });
}


export async function OPTIONS(req: NextRequest) {
  return Response.json({}, { headers: corsHeaders });
}

