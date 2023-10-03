import { z } from 'zod'

const signInSchema = z.object({
  username: z
    .string()
    .min(3, 'The Username Must Contain 3 Digits Minimun!')
    .nonempty('Username is Required!'),
  email: z.string().email('Invalid Email!').nonempty('Email is Required!'),
  password: z
    .string()
    .min(6, 'The Password Must Contain 6 Digits Minimun!')
    .nonempty('Passowrd is Required!'),
})

type SignInSchemaProps = z.infer<typeof signInSchema>

export type { SignInSchemaProps }

export { signInSchema }
