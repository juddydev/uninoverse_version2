import { customOrderConstructions } from "~/lib/custom-order/values/custom-order-constructions"

export type CustomOrderConstruction = (typeof customOrderConstructions)[number]
