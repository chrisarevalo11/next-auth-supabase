'use server'

import { createClient } from '@/utils/supabase/server'
import { SignUpWithPasswordCredentials } from '@supabase/supabase-js'

export async function signup(formData: FormData) {
  const supabase = createClient()

  const data: SignUpWithPasswordCredentials = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        name: formData.get('name') as string,
      },
    },
  }

  try {
    const { error } = await supabase.auth.signUp(data)

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
