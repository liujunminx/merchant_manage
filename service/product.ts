import {httpDelete, httpGet, httpPost} from "@/utils/http";
import PageResponse from "@/app/consts/api";

export const listCategoryTree = async (): Promise<Array<any>> => {
  return await httpGet("/api/good/category/listTree")
}

export const saveCategory = async (payload: any) => {
  return await httpPost("/api/good/category/save", payload)
}

export const deleteCategory = async (id: number) => {
  return await httpDelete(`/api/product/category/${id}`)
}

export const searchTree = async (keyword: string) => {
  return await httpGet(`/api/product/category/search`, { keyword: keyword })
}

export const findAllLeafs = async () => {
  return await httpGet("/api/good/category/findAllLeafs")
}

export const listProduct = async (): Promise<PageResponse> => {
  return await httpGet("/api/good/listPage")
}
