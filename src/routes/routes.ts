export const routes = {
  // Rotas públicas
  login: '/login',
  register: '/register',

  // Rotas do aluno
  aluno: {
    dashboard: '/student/dashboard',
    perfil: '/student/perfil',
  },

  // Rotas do professor
  professor: {
    dashboard: '/teacher/dashboard',
    perfil: '/teacher/perfil',
  },

  // Funções de navegação
  navigateTo: {
    login: () => window.location.href = '/login',
    register: () => window.location.href = '/register',
    alunoDashboard: () => window.location.href = '/student/dashboard',
    alunoPerfil: () => window.location.href = '/student/perfil',
    professorDashboard: () => window.location.href = '/teacher/dashboard',
    professorPerfil: () => window.location.href = '/teacher/perfil',
  },

  // Validação de rotas protegidas
  isProtectedRoute: (path: string): boolean => {
    const protectedRoutes = [
      '/student/dashboard',
      '/student/perfil',
      '/teacher/dashboard',
      '/teacher/perfil'
    ];
    return protectedRoutes.includes(path);
  },

  // Identifica tipo de usuário pela rota
  getUserTypeFromPath: (path: string): 'aluno' | 'professor' | null => {
    if (path.startsWith('/student')) return 'aluno';
    if (path.startsWith('/teacher')) return 'professor';
    return null;
  }
};
