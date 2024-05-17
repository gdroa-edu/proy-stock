import React from 'react'
import Sidebar from '@/components/sidebar';
import withAuth from '@/components/auth/withauth';

const Depositos = () => {
  return (
    <div className="flex h-screen w-full bg-ui-background p-2 text-ui-text">
        <Sidebar/>
          <div className="flex flex-col w-full h-full p-5 rounded-lg bg-ui-cardbg">
          <h1 className='mb-4 text-l font-semibold normal-case tracking-tight'>Depósitos</h1> 
      </div>
        </div>
    
  )
}

export default withAuth(Depositos);