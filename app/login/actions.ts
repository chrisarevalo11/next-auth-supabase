'use server'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData): Promise<{ message: string }> {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  try {
    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
      throw new Error(error.message)
    }

    return {
      message: 'OK',
    }
  } catch (error: any) {
    return {
      message: `Error: ${error.message}`,
    }
  }
}
