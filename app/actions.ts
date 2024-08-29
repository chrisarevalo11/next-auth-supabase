'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function logout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return {
      message: 'Error while signing out',
    }
  }

  revalidatePath('/login', 'layout')
  redirect('/login')
}

export async function getUser() {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      throw new Error(error.message)
    }

    console.log(data)

    return {
      data,
      message: 'OK',
    }
  } catch (error: any) {
    return {
      message: `Error: ${error.message}`,
    }
  }
}
