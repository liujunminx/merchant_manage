import {httpPost} from "@/utils/http";

export const signIn = async (params: any) => {
  const response = await httpPost('/api/user/auth/signIn', params)
  console.log(response)
  return response
}
