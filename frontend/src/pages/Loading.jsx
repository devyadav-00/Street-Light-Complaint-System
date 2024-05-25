import React from 'react'
import { useNavigate } from 'react-router-dom';


function Loading() {
  const navigate = useNavigate();
  setTimeout(() => {
    console.log('Redirecting to login');
    navigate('/login');
  }, 2000);
  return (
    <>
      <header className="sticky left-0 top-0 w-full z-10 bg-red-500 font-bold text-white text-3xl p-2 mb-10">
        Street Light Complaint
      </header>
      <main className="flex items-center justify-center h-[500px]">
        <div className="text-3xl font-bold text-red-500">Loading...</div>
      </main>

    </>
  )
}

export default Loading