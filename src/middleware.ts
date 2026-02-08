import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isTutorRoute = pathname.startsWith("/tutor");
  const isAlunoRoute = pathname.startsWith("/aluno");
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  if (user) {
    const userType = user.user_metadata?.user_type;

    //console.log(userType)
    if (isAuthPage) {
      const dashboard =
        userType === "tutor" ? "/tutor/dashboard" : "/aluno/dashboard";
      return NextResponse.redirect(new URL(dashboard, request.url));
    }

    if (isTutorRoute && userType !== "tutor") {
      return NextResponse.redirect(new URL("/aluno/dashboard", request.url));
    }

    if (isAlunoRoute && userType !== "aluno") {
      return NextResponse.redirect(new URL("/tutor/dashboard", request.url));
    }
  } else {
    if (isTutorRoute || isAlunoRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return response;
}

export const config = {
  matcher: ["/aluno/:path*", "/tutor/:path*", "/login", "/register"],
};
