import {httpPost} from "@/utils/http";

export const signIn = async (body: any) => {
  return await httpPost("/api/user/auth/signIn", body)
}

export const signUp = async (body: any) => {
  return await httpPost("/api/user/auth/signUp", body)
}

export const authenticate = async (body: any) => {
  return await httpPost("/api/user/auth/authenticate", body)
}
