import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Layout from "./layouts";
import Area from "./pages/Area";
import Book from "./pages/Book";
import CreateArea from "./pages/CreateArea";
import CreateBook from "./pages/CreateBook";
import CreateDrink from "./pages/CreateDrink";
import CreateEmployee from "./pages/CreateEmployee";
import CreateFood from "./pages/CreateFood";
import CreateTable from "./pages/CreateTable";
import CreateUser from "./pages/CreateCustomer";
import Dashboard from "./pages/Dashboard";
import Drink from "./pages/Drink";
import Employee from "./pages/Employee";
import Food from "./pages/Food";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Table from "./pages/Table";
import UpdateBook from "./pages/UpdateBook";
import CustomerDetail from "./pages/CustomerDetail";
import User from "./pages/Customer";
import Error from "./pages/Error";
import UpdateCustomer from "./pages/UpdateCustomer";
import EmployeeDetail from "./pages/EmployeeDetail";
import UpdateEmployee from "./pages/UpdateEmployee";
import UpdateFood from "./pages/UpdateFood";
import UpdateDrink from "./pages/UpdateDrink";
import UpdateArea from "./pages/UpdateArea";
import UpdateTable from "./pages/UpdateTable";
import Product from "./pages/Product";
import CreateProduct from "./pages/CreateProduct";
import UpdateProduct from "./pages/UpdateProduct";
import ProductType from "./pages/ProductType";
import CreateProductType from "./pages/CreateProductType";
import UpdateProductType from "./pages/UpdateProductType";
import CreateOrder from "./pages/CreateOrder";
import FoodDetail from "./pages/FoodDetail";
import DrinkDetail from "./pages/DrinkDetail";
import ProductTypeDetail from "./pages/ProductTypeDetail";
import AreaDetail from "./pages/AreaDetail";
import TableDetail from "./pages/TableDetail";
import BookDetail from "./pages/BookDetail";
import AdminDetail from "./pages/AdminDetail";

function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "/users/list",
          element: <User />,
        },
        {
          path: "/users/create",
          element: <CreateUser />,
        },
        {
          path: "/users/detail/:id",
          element: <CustomerDetail />,
        },
        {
          path: "/users/update",
          element: <UpdateCustomer />,
        },
        {
          path: "/orders/list",
          element: <Orders />,
        },
        {
          path: "/orders/create",
          element: <CreateOrder />,
        },
        {
          path: "/foods/list",
          element: <Food />,
        },
        {
          path: "/foods/detail/:id",
          element: <FoodDetail />,
        },
        {
          path: "/foods/create",
          element: <CreateFood />,
        },
        {
          path: "/foods/update",
          element: <UpdateFood />,
        },
        {
          path: "/products/list",
          element: <Product />,
        },
        {
          path: "/products/create",
          element: <CreateProduct />,
        },
        {
          path: "/products/update",
          element: <UpdateProduct />,
        },
        {
          path: "/product-types/list",
          element: <ProductType />,
        },
        {
          path: "/product-types/detail/:id",
          element: <ProductTypeDetail />,
        },
        {
          path: "/product-types/create",
          element: <CreateProductType />,
        },
        {
          path: "/product-types/update",
          element: <UpdateProductType />,
        },
        {
          path: "/drinks/list",
          element: <Drink />,
        },
        {
          path: "/drinks/detail/:id",
          element: <DrinkDetail />,
        },
        {
          path: "/drinks/create",
          element: <CreateDrink />,
        },
        {
          path: "/drinks/update",
          element: <UpdateDrink />,
        },
        {
          path: "/tables/list",
          element: <Table />,
        },
        {
          path: "/tables/create",
          element: <CreateTable />,
        },
        {
          path: "/tables/update",
          element: <UpdateTable />,
        },
        {
          path: "/tables/detail/:id",
          element: <TableDetail />,
        },
        {
          path: "/areas/list",
          element: <Area />,
        },
        {
          path: "/areas/create",
          element: <CreateArea />,
        },
        {
          path: "/areas/update",
          element: <UpdateArea />,
        },
        {
          path: "/areas/detail/:id",
          element: <AreaDetail />,
        },
        {
          path: "/employees/list",
          element: <Employee />,
        },
        {
          path: "/employees/detail/:id",
          element: <EmployeeDetail />,
        },
        {
          path: "/employees/update",
          element: <UpdateEmployee />,
        },
        {
          path: "/books/list",
          element: <Book />,
        },
        {
          path: "/books/create",
          element: <CreateBook />,
        },
        {
          path: "/books/update",
          element: <UpdateBook />,
        },
        {
          path: "/books/detail/:id",
          element: <BookDetail />,
        },
        {
          path: "/employees/create",
          element: <CreateEmployee />,
        },
        {
          path: "",
          element: <Navigate to="/dashboard" />,
        },
        {
          path: "/admin/detail",
          element: <AdminDetail />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/error",
      element: <Error />,
    },
  ]);
}

export default Router;
