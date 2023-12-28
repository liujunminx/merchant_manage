import {httpGet} from "@/utils/http";

export const listCategoryTree = async () => {
  return await httpGet("/api/product/category/listTree")
}
