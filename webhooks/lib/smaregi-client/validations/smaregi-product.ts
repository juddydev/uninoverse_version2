import { nullable, number, object, string } from "valibot"

export const vSmaregiProduct = object({
  productId: string(),
  categoryId: string(),
  productCode: string(),
  productName: string(),
  productKana: nullable(string()),
  taxDivision: string(),
  productPriceDivision: nullable(string()),
  price: nullable(string()),
  customerPrice: nullable(number()),
  cost: nullable(number()),
  attribute: nullable(string()),
  description: nullable(string()),
  catchCopy: nullable(string()),
  size: nullable(string()),
  color: nullable(string()),
  tag: nullable(string()),
  groupCode: nullable(string()),
  url: nullable(string()),
  printReceiptProductName: nullable(string()),
  displaySequence: nullable(string()),
  salesDivision: nullable(string()),
  stockControlDivision: nullable(string()),
  displayFlag: nullable(string()),
  division: nullable(string()),
  productOptionGroupId: nullable(string()),
  pointNotApplicable: nullable(string()),
  taxFreeDivision: nullable(string()),
  supplierProductNo: nullable(string()),
  calcDiscount: nullable(string()),
  staffDiscountRate: nullable(string()),
  useCategoryReduceTax: nullable(string()),
  reduceTaxId: nullable(string()),
  reduceTaxPrice: nullable(string()),
  reduceTaxCustomerPrice: nullable(string()),
  orderPoint: nullable(string()),
  purchaseCost: nullable(string()),
  appStartDateTime: nullable(string()),
  insDateTime: string(),
  updDateTime: string(),
})
