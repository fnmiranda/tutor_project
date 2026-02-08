// 'use server';
import Sidebar from '@/components/Bar/Sidebar';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AlunoLayout({ children }: { children: React.ReactNode }) {

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user && user.user_metadata?.user_type !== 'aluno') {
    redirect('/');
  } 
  if (!user) {
    redirect('/');
  } 
  let quant = 30

  return (

    // <ProtectedRoute requiredUserType='aluno'>
      <div className="h-full w-full flex flex-col bg-gray-50">
        {/* Navbar do Aluno */}
        <Sidebar saldo={quant} userType='aluno'/>

        {/* Conteúdo Principal */}
        <main className="flex-1 ml-70 px-4">
          {children}
        </main>

        {/* Footer */}
        
      </div>
    // </ProtectedRoute>
  );
}
