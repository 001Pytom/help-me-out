import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // Create an unmodified response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  //
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  const isAuthPage = path.startsWith("/auth");
  // const isGetStarted = path === "/auth/get-started";
  const isProtectedPage = path === "/" || path.startsWith("/single-video");

  //  Block non-authenticated users from app pages
  if (!user && isProtectedPage) {
    return NextResponse.redirect(new URL("/auth/get-started", request.url));
  }

  //  Redirect logged-in users away from /auth pages
  if (user && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return supabaseResponse;
};

// export const config = {
//   matcher: [
//     "/", // main app
//     // "/dashboard/:path*",
//     "/single-video/:path*",
//     "/auth/:path*", // login/signup
//   ],
// };
