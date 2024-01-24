import {httpDelete, httpGet, httpPost} from "@/utils/http";

export const listCategoryTree = async () => {
  return await httpGet("/api/product/category/listTree")
}

export const saveCategory = async (payload: any) => {
  return await httpPost("/api/product/category/save", payload)
}

export const deleteCategory = async (id: number) => {
  return await httpDelete(`/api/product/category/${id}`)
}

export const searchTree = async (keyword: string) => {
  return await httpGet(`/api/product/category/search`, { keyword: keyword })
}

export const findAllLeafs = async () => {
  return await httpGet("/api/product/category/findAllLeafs")
}

export const listProduct = async (): Promise<any> => {
  return await httpGet("/api/product/listPage")
}
