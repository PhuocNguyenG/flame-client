import { NextRequest } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(req: NextRequest) {
  return Response.json({}, { headers: corsHeaders });
}

// e.g a webhook to `your-website.com/api/revalidate?tag=collection&secret=<token>`
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const tag = request.nextUrl.searchParams.getAll("tag");
  const path = request.nextUrl.searchParams.getAll("path");

  if (secret !== process.env.MY_SECRET_VALIDATE_TOKEN) {
    return Response.json({ message: "Invalid secret" }, { status: 401 });
  }

  if (!tag && !path) {
    return Response.json(
      { message: "Missing tag or path param" },
      { status: 400 }
    );
  } else if (tag.length > 0) {
    tag.forEach((x) => {
      revalidateTag(x);
    });
  } else if (path.length > 0) {
    path.forEach((x) => {
      revalidatePath(x);
    });
  } else {
    return Response.json(
      { message: "Missing tag or path param" },
      { status: 400 }
    );
  }

  return Response.json(
    { revalidated: true, now: Date.now() },
    { headers: corsHeaders }
  );
}
