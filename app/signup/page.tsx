'use client'

import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import { signup } from '@/app/signup/actions'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    const data = await signup(formData)

    console.log(data)

    if (data?.message.startsWith('Error')) {
      toast.error(data?.message)
    }

    if (data?.message === 'OK') {
      toast.success('Successfully signed up!')
      router.push('/')
    }
  }

  return (
    <main className='flex min-h-screen flex-col justify-center p-4 w-full'>
      <form
        className='w-full max-w-[1200px] mx-auto space-y-10 flex flex-col items-center'
        action={handleSubmit}
      >
        <div className='flex flex-col w-fit gap-5'>
          <div className='flex flex-col'>
            <label htmlFor='name'>Name:</label>
            <input
              id='name'
              name='name'
              type='text'
              placeholder='Your name'
              className='w-[300px] bg-transparent border-b border-white p-2'
              required
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='email'>Email:</label>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='Your email'
              className='w-[300px] bg-transparent border-b border-white p-2'
              required
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password'>Password:</label>
            <input
              id='password'
              name='password'
              type='password'
              placeholder='Password'
              className='w-[300px] bg-transparent border-b border-white p-2'
              required
            />
          </div>
        </div>
        <div className='flex flex-col gap-5 items-center'>
          <SubmitSignupForm text='Sign up' />
          <p>
            Already have an account?{' '}
            <Link
              className='underline text-orange-400 hover:opacity-80 transition'
              href='/login'
            >
              Log in
            </Link>
          </p>
        </div>
      </form>
    </main>
  )
}

function SubmitSignupForm({ text }: { text: string }) {
  const { pending } = useFormStatus()

  return (
    <button
      className='bg-orange-400 hover:opacity-80 transition p-2 rounded-md text-white '
      disabled={pending}
    >
      {pending ? 'Loading...' : text}
    </button>
  )
}
