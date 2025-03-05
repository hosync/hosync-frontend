'use server'

import core from '@/lib/utils/core'
import security from '@/lib/utils/security'
import { RegistrationFormValues } from '@/providers/registration'
import UserService from '@/services/user'
import { APIResponse, CreatedItem } from '@/types/api'

export const getAll = async () => {
  const response = await UserService.getAll({ endpoint: 'user/' })
  return response
}

export const del = async (e: FormData): Promise<APIResponse<any>> => {
  const { id } = core.formData.get(e)

  const response = await UserService.delete(id)

  return response
}

export const initialSignup = async (
  values: RegistrationFormValues
): Promise<APIResponse<CreatedItem>> => {
  const {
    fullName,
    businessName,
    businessEmail,
    businessPhone,
    businessWebsite,
    country
  } = values

  if (
    !fullName ||
    !businessName ||
    !businessEmail ||
    !businessPhone ||
    !businessWebsite ||
    !country
  ) {
    return {
      ok: false,
      status: 400,
      error: {
        code: 'MISSING_REQUIRED_FIELDS',
        message: 'Missing required fields'
      }
    }
  }

  const response = await UserService.initialSignup({
    fullName,
    businessName,
    businessEmail,
    businessPhone,
    businessWebsite,
    country
  })

  return response
}

export const signup = async (
  e: FormData
): Promise<APIResponse<CreatedItem>> => {
  const emailInput = security.base64.encode('email', true)
  const passwordInput = security.base64.encode('password', true)

  const email = security.base64.decode(
    e.get(emailInput)?.toString(),
    true
  ) as string
  const password = security.base64.decode(
    e.get(passwordInput)?.toString(),
    true
  ) as string

  if (!email || !password) {
    return {
      ok: false,
      status: 400,
      error: {
        code: 'MISSING_REQUIRED_FIELDS',
        message: 'Missing required fields'
      }
    }
  }

  const response = await UserService.signup({ email, password })

  return response
}

export const getConnectedUser = async (at: string) => {
  const connectedUser = await UserService.getOne({
    endpoint: 'user/validate',
    method: 'POST',
    credentials: 'include',
    body: {
      at
    },
    returnFirstItemOnly: true
  })

  return connectedUser
}

export const getUserByCode = async (code: string) => {
  const user = await UserService.getOne({
    endpoint: `user/code/${code}`,
    credentials: 'include',
    returnFirstItemOnly: true
  })

  return user
}

export const create = async (e: FormData): Promise<APIResponse<any>> => {
  const userData = core.formData.get(e)

  const response = await UserService.create(userData)
  return response
}

export const update = async (
  e: FormData
): Promise<APIResponse<CreatedItem>> => {
  const userData = core.formData.get(e)
  const response = await UserService.update(userData.id, userData)
  return response
}
