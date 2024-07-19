import { z } from 'zod'
import { LoginSchema, RegisterSchema } from './schema'
import { User as DbUser } from '@prisma/client'

export type ActionType<T> = {
  success: boolean
  message: string
  data?: T
}

export type RegisterSchemaType = z.infer<typeof RegisterSchema>
export type LoginSchemaType = z.infer<typeof LoginSchema>
// type User = Omit<DbUser, 'password' | 'emailVerified' | 'accounts' | 'sessions'>;

export type User = Pick<DbUser, 'id' | 'name' | 'email' | 'image'>
