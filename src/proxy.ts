import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
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
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // Verifica se existe uma sessão ativa
const { data: { user } } = await supabase.auth.getUser();

// 1. Defina as rotas de forma específica
const pathname = request.nextUrl.pathname;
const isTutorRoute = pathname.startsWith('/tutor');
const isAlunoRoute = pathname.startsWith('/aluno');
const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');

if (user) {
  // 2. BUSCA O TIPO DO USUÁRIO
  // O ideal é que o 'user_type' esteja nos user_metadata do Supabase Auth para performance
  const userType = user.user_metadata?.user_type; // 'aluno' ou 'tutor'

  // Redirecionamento se logado e tentar acessar login/register
  if (isAuthPage) {
    const dashboard = userType === 'tutor' ? '/tutor/dashboard' : '/aluno/dashboard';
    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  // 3. BLOQUEIO DE ACESSO CRUZADO
  // Se o aluno tentar entrar em /tutor
  if (isTutorRoute && userType !== 'tutor') {
    return NextResponse.redirect(new URL('/aluno/dashboard', request.url));
  }

  // Se o tutor tentar entrar em /aluno
  if (isAlunoRoute && userType !== 'aluno') {
    return NextResponse.redirect(new URL('/tutor/dashboard', request.url));
  }
} else {
  // Se não estiver logado e tentar acessar qualquer rota protegida
  if (isTutorRoute || isAlunoRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

  return response;
}

export const config = {
  matcher: ['/aluno/:path*', '/tutor/:path*', '/login', '/register'],
};
