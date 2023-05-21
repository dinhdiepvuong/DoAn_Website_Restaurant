import { replace } from "lodash";
import numeral from "numeral";

export const currencyFormat = (num: number) => {
  return num.toLocaleString("en-US", { style: "currency", currency: "VND" });
};
export function fShortenNumber(num: number) {
  return replace(numeral(num).format("0.00a"), ".00", "");
}
export const thousandFormat = (num: number) => {
  return num.toLocaleString(`es-US`)
}