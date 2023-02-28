import { apiAuth, apiLogin, apiNewUser } from 'src/boot/axios'
import { User, UserLogin } from 'src/models/user'

export async function getUser (payload: UserLogin) {
  return await apiLogin
    .post('user/login', payload)
    .then(async (response: any) => {
      return response.data
    })
    .catch((error: any) => {
      throw error?.data?.message || error?.message
    })
}

export async function updateUser (payload: User) {
  return await apiAuth
    .post('', payload)
    .then(async (response: any) => {
      return response.data
    })
    .catch((error: any) => {
      throw error?.data?.message || error?.message
    })
}

export async function newUser (payload: any) {
  return await apiNewUser
    .post('user/new', payload)
    .then(async (response: any) => {
      return response.data
    })
    .catch((error: any) => {
      throw error?.data?.message || error?.message
    })
}

export async function deleteUser (payload: any) {
  return await apiAuth
    .delete('')
    .then(async (response: any) => {
      return response.data
    })
    .catch((error: any) => {
      throw error?.data?.message || error?.message
    })
}

export default { getUser, updateUser, newUser, deleteUser }
