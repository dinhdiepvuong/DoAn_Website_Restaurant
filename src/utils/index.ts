import { AddressType } from "../interfaces";
import themeSlice from "../redux/slices/themeSlice";

export const ORDER_STATUS = {
  NOT_USE: 0,
  USING: 1,
  USED: 2,
  CANCELED: 3,
};

export enum BOOK_DETAIL_STATUS {
  OLD = 0,
  NEW = 1,
}

export const ENTITY_STATUS = {
  ACTIVATED: 0,
  DEACTIVATED: 1,
};

export const ICON = {
  CLOSE: "ep:circle-close-filled",
  PLUS: "akar-icons:circle-plus-fill",
  MINUS: "akar-icons:circle-minus-fill",
  TABLE: "ic:outline-table-restaurant",
  RIGHT: "charm:chevron-right",
  BOOK: "fluent:book-database-24-regular",
  SELECTED: "fluent:select-all-on-24-filled",
  UNSELECT: "fluent:select-all-off-24-regular",
  DISMISS: "fluent:dismiss-square-multiple-16-filled",
  CAMERA: "bi:camera-fill",
  ANALYTIC: "uis:analytics",
  EYE: "akar-icons:eye",
  FOOD: "fluent-emoji-high-contrast:shallow-pan-of-food",
  DRINK: "ep:cold-drink",
  PRODUCT: "mdi:food-outline",
  NOTE: "majesticons:note-text-plus-line",
  PRINT: "bi:cloud-arrow-down-fill",
  CALENDAR: "material-symbols:calendar-month-outline",
  DOWN: "material-symbols:keyboard-arrow-down",
};

export const defaultAvatar =
  "https://huyhoanhotel.com/wp-content/uploads/2016/05/765-default-avatar.png";

export enum DEFAULT_WIDTH_TABLE {
  SMALL = 1130,
  LARGE = 1370,
}

export enum SIDE_BAR_MODE {
  SMALL = 0,
  LARGE = 1,
}

export enum GENDER {
  MALE = 0,
  FEMALE = 1,
}

export enum PRODUCT_TYPE {
  FOOD = 0,
  DRINK = 1,
}

export enum PAYMENT_METHOD {
  CASH = 0,
  INTERNET_BANKING = 1,
}

export const genStatusOrder = (
  status: number
): { name: string; color: string } => {
  switch (status) {
    case ORDER_STATUS.NOT_USE:
      return { name: "Chưa sử dụng", color: "green" };
    case ORDER_STATUS.USING:
      return { name: "Đang sử dụng", color: "blue" };
    case ORDER_STATUS.USED:
      return { name: "Đã sử dụng", color: "yellow" };
    case ORDER_STATUS.CANCELED:
      return { name: "Đã quá hạn", color: "red" };
    default:
      return { name: "Không xác định", color: "black" };
  }
};

export const genStatusFood = (
  status: number
): { name: string; color: string } => {
  switch (status) {
    case ENTITY_STATUS.ACTIVATED:
      return { name: "Đang hoạt động", color: "green" };
    case ENTITY_STATUS.DEACTIVATED:
      return { name: "Dừng hoạt động", color: "red" };
    default:
      return { name: "Không xác định", color: "black" };
  }
};

export const genStatusUser = (
  status: number
): { name: string; color: string } => {
  switch (status) {
    case ENTITY_STATUS.ACTIVATED:
      return { name: "Hiệu lực", color: "green" };
    case ENTITY_STATUS.DEACTIVATED:
      return { name: "Đã khoá", color: "red" };
    default:
      return { name: "Không xác định", color: "black" };
  }
};

export const genStatusEmployee = (
  status: number
): { name: string; color: string } => {
  switch (status) {
    case ENTITY_STATUS.ACTIVATED:
      return { name: "Đang làm", color: "green" };
    case ENTITY_STATUS.DEACTIVATED:
      return { name: "Đã nghỉ", color: "red" };
    default:
      return { name: "Không xác định", color: "black" };
  }
};

export const serialize = (obj: any) => {
  const keys = Object.keys(obj);
  let query = "?";
  keys.forEach((key) => {
    if (obj[key] !== undefined && obj[key] !== "") {
      query +=
        typeof obj[key] === "string"
          ? `${key}=${obj[key]}&`
          : `${key}=${JSON.stringify(obj[key])}&`;
    }
  });
  return query;
};

export const genGender = (value: number) => {
  if (value === GENDER.MALE) return `Nam`;

  if (value === GENDER.FEMALE) return `Nữ`;

  return `Không xác định`;
};

export const genAddress = (address: AddressType) => {
  return address
    ? `${address?.street}${address?.ward ? `, ${address?.ward}` : ``}${
        address?.district ? `, ${address.district}` : ``
      }${address?.city ? `, ${address?.city}` : ``}`
    : ``;
};

export const dataGender = [
  {
    name: "Nam",
    value: GENDER.MALE,
  },
  {
    name: "Nữ",
    value: GENDER.FEMALE,
  },
];

type AlignType =
  | "start"
  | "end"
  | "left"
  | "right"
  | "center"
  | "justify"
  | "match-parent";

export const textAlign = (value: AlignType) => value;

export const removeVietnameseTones = (str: string) => {
  let formattedStr = str;
  formattedStr = formattedStr.replace(
    /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,
    "a"
  );
  formattedStr = formattedStr.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  formattedStr = formattedStr.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  formattedStr = formattedStr.replace(
    /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,
    "o"
  );
  formattedStr = formattedStr.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  formattedStr = formattedStr.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  formattedStr = formattedStr.replace(/đ/g, "d");
  formattedStr = formattedStr.replace(
    /À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g,
    "A"
  );
  formattedStr = formattedStr.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  formattedStr = formattedStr.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  formattedStr = formattedStr.replace(
    /Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g,
    "O"
  );
  formattedStr = formattedStr.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  formattedStr = formattedStr.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  formattedStr = formattedStr.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  formattedStr = formattedStr.replace(
    /\u0300|\u0301|\u0303|\u0309|\u0323/g,
    ""
  ); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  formattedStr = formattedStr.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  formattedStr = formattedStr.replace(/ + /g, " ");
  formattedStr = formattedStr.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  formattedStr = formattedStr.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, //eslint-disable-line
    " "
  );
  return formattedStr;
};

export const Notification = (type: string, content: string, dispatch: any) => {
  dispatch(
    themeSlice.actions.showToast({
      type,
      content,
    })
  );
};

export const genTypeOfProductType = (type: number) => {
  switch (type) {
    case PRODUCT_TYPE.FOOD:
      return `Món ăn`;
    case PRODUCT_TYPE.DRINK:
      return `Đồ uống`;
    default:
      return `Không xác định`;
  }
};

export const genPaymentMethod = (paymentMethod: number) => {
  switch (paymentMethod) {
    case PAYMENT_METHOD.CASH:
      return `Tiền mặt`;
    case PAYMENT_METHOD.INTERNET_BANKING:
      return `Internet Banking`;
    default:
      return `Không xác định`;
  }
};

export const convertMsToHM = (milliseconds: number) => {
  const hours = milliseconds / 3600000;

  return `${hours} h`;
};
