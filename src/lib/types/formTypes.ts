import { z } from 'zod'

export const BasicSchema = z.object({
  fullName:z.string().min(4, {message:'name must be at least 4 characters'}).optional(),
  email:z.string().email().trim().min(2, {message:'email must be two or more'}).toLowerCase(),
  password:z.string().trim().min(8, {message:'password must be minimum of 8 characters'})
})

export const BasicSchemaWithPass = BasicSchema.extend({
  confirmPassword:z.string().trim().min(8, {message:'password must be minimum of 8 characters'})
})

export const ProfileSchema = z.object({
  email:z.string().email().trim().min(3, {message:'characters must be three or more'}).toLowerCase(),
  username:z.string().nonempty()
})

export type Profile = z.infer<typeof ProfileSchema>

export const FormLinkSchema =z.object({
  link:z.string().trim().min(5, {message:'please check the URL'})
}) 
  
export type FormLink = z.infer<typeof FormLinkSchema>

export type UserType = z.infer<typeof BasicSchemaWithPass>

