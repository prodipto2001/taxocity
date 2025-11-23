import { type NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/pricing" || pathname === "/order-review") {
    const hasCompletedForm = request.cookies.get("form_completed");

    if (!hasCompletedForm) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pricing", "/order-review"],
};
