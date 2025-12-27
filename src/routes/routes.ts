export const routes = {
  login: '/',
  register: '/register',

  aluno: {
    dashboard: '/aluno/dashboard',
    perfil: '/aluno/perfil',
  },

  tutor: {
    dashboard: '/tutor/dashboard',
    perfil: '/tutor/perfil',
  },

  isProtectedRoute: (path: string): boolean => {
    return path.startsWith('/aluno') || path.startsWith('/tutor');
  },

  getUserTypeFromPath: (path: string): 'aluno' | 'tutor' | null => {
    if (path.startsWith('/aluno')) return 'aluno';
    if (path.startsWith('/tutor')) return 'tutor';
    return null;
  }
};
