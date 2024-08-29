'use client'

import { useFormStatus } from 'react-dom'
import { getUser, logout } from './actions'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function Home() {
  const [name, setName] = useState('')

  useEffect(() => {
    const getName = async () => {
      const response = await getUser()

      if (response.message === 'OK') {
        const name = response.data?.user.user_metadata.name
        setName(name)
      }

      if (response.message.startsWith('Error')) {
        toast.error(response.message)
      }
    }

    getName()
  }, [])

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <section className='flex flex-col gap-5 items-center'>
        <h1>Hello{name && `, ${name}`} </h1>
        <h1>You&apos;re logged in!</h1>
        <form>
          <SubmitButton />
        </form>
      </section>
    </main>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      className='bg-white p-2 rounded-md text-black hover:opacity-80 transition disabled:opacity-80 disabled:cursor-not-allowed'
      disabled={pending}
      formAction={logout}
    >
      {pending ? 'Logging out...' : 'Log out'}
    </button>
  )
}
