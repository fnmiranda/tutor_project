// 'use client';

import Sidebar from '@/components/Bar/Sidebar';
import { createClient } from '@/lib/supabase/server'; 
import { redirect } from 'next/navigation';

export default async function TutorLayout({children,}: {children: React.ReactNode;}) {

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user && user.user_metadata?.user_type !== 'tutor') {
    redirect('/aluno/dashboard');
  } 

  if (!user) {
    redirect('/');
  } 

  let saldo = 100;
  
  return (
    // <ProtectedRoute requiredUserType='tutor'>
      <div className="w-full h-full flex flex-col  bg-gray-50" >

        {/* Navbar do Professor */}
        <Sidebar saldo={saldo} userType='tutor'/>

        {/* Conteúdo Principal */}
        <main className="flex-1 ml-70 px-4">
          {children}
        </main>

        {/* Footer */}
        
      </div>
    // </ProtectedRoute>
  );
}
