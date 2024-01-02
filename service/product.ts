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
