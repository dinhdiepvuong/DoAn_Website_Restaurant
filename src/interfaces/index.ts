export interface CustomerType {
    name: string;
    phone: string;
    email: string;
    identity: string;
    gender: number;
    avatar: string;
    birthday: Date;
    address: AddressType;
}

interface AddressType {
    street: string;
    ward: string;
    district: string;
    city: string;
}

export interface EmployeeType {
    name: string;
    phone: string;
    email: string;
    identity: string;
    gender: number;
    avatar: string;
    birthday: Date;
    address: AddressType;
    status: number;
    username: string;
    password: string;
    refreshToken: string;
}

export interface FoodType {
    name: string;
    price: number;
    description: string;
    avatar: string;
    status: number;
}

export interface DrinkType {
    name: string;
    price: number;
    description: string;
    avatar: string;
    status: number;
}

export interface AreaType {
    name: string;
    description: string;
    avatar: string;
    status: number;
}

export interface TableType {
    name: string;
    quantity: number;
    status: number;
    areaId: string;
}

export interface BookDetailType {
    quantity: number;
    productId: string;
    note: string;
    status: number;
}

export interface TableBookType {
    id: string;
    quantity: number;
    note: string;
}

export interface BookType {
    customerId: string;
    tables: Array<TableBookType>;
    checkoutAt: Date;
    timeToUse: number;
    quantityCustomer: number;
    status: number;
    paymentMethod: number;

    totalPrice: number;
    deposit: number;
    customerNote: string;
    bookDetailIds: string[];
}

export interface ProductType {
    name: string;
    price: number;
    description: string;
    avatar: string;
    status: number;
    productTypeId: string;
    type: number;
}

export interface ProductTypeType {
    name: string;
    description: string;
    avatar: string;
    status: number;
    type: number;
}

export interface OrderType {
    bookId: string;
    orderDate: Date;
    paymentMethod: number;
}

export interface AdminType {
    name: string;
    phone: string;
    email: string;
    identity: string;
    gender: number;
    avatar: string;
    birthday: Date;
    address: AddressType;
    status: number;
    username: string;
    password: string;
    refreshToken: string;
}
