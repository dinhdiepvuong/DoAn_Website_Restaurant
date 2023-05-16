import moment from "moment";
// import React from "react";
// import { useSelector } from "react-redux";
// import styled from "styled-components";
// import { OrderType } from "../../interfaces";
// import { currencyFormat } from "../../utils/format";

// type Props = {
//   printRef: any;
//   order: OrderType;
//   subTotal: number;
//   tax: number;
//   discount: number;
//   deliveryFee: number;
// };
// type Type =
//   | "start"
//   | "end"
//   | "left"
//   | "right"
//   | "center"
//   | "justify"
//   | "match-parent";
// const TableCell = styled.td`
//   padding: 10px;
// `;
// const TableCellHead = styled.th`
//   padding: 10px;
// `;
// function Invoice({
//   printRef,
//   order,
//   deliveryFee,
//   discount,
//   subTotal,
//   tax,
// }: Props) {
//   const textAlign = (value: Type) => value;
//   const header = [
//     {
//       name: "#",
//       width: "10%",
//       textAlign: textAlign("center"),
//     },
//     {
//       name: "Name",
//       width: "30%",
//       textAlign: textAlign("left"),
//     },
//     {
//       name: "Price",
//       width: "20%",
//       textAlign: textAlign("center"),
//     },
//     {
//       name: "Quantity",
//       width: "20%",
//       textAlign: textAlign("center"),
//     },
//     {
//       name: "Total",
//       width: "20%",
//       textAlign: textAlign("right"),
//     },
//   ];
//   return (
//     <div ref={printRef} className="p-4">
//       <div className="d-flex align-items-center justify-content-between font16 font_family_regular">
//         <div>
//           Invoice No: <b>{order.id}</b>
//         </div>
//         <div>Date: {moment(order.createdAt).format(`DD/MM/YYYY hh:mm a`)}</div>
//       </div>
//       <div className="mt-4 row m-0 p-0">
//         <div className="col-6">
//           <div className="font18 font_family_bold">{order.customer.name}</div>
//           <div className="mt-2 font16 font_family_regular color_888">
//             {order.customer.email}
//           </div>
//           <div className="font16 font_family_regular color_888">
//             {order.phone}
//           </div>
//           <div className="font16 font_family_regular color_888">
//             {order.shippingAddress}
//           </div>
//         </div>
//         <div className="d-flex flex-column align-items-end col-6">
//           <div className="font18 font_family_bold">Title</div>
//           <div className="mt-2 font16 font_family_regular color_888">
//             website
//           </div>
//           <div className="font16 font_family_regular color_888">
//             phone
//           </div>
//           <div className="font16 font_family_regular color_888">
//             address
//           </div>
//         </div>
//       </div>
//       <table className="mt-4 w100_per">
//         <thead>
//           <tr className="border_top_gray_1px">
//             {header.map((item, index) => (
//               <TableCellHead
//                 key={index}
//                 className="font_family_regular font16"
//                 style={{
//                   width: item.width,
//                   textAlign: item.textAlign,
//                 }}
//               >
//                 {item.name}
//               </TableCellHead>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {order.products.map((item, index) => (
//             <tr className="border_top_gray_1px" key={index}>
//               <TableCell
//                 style={{
//                   width: header.at(0)?.width,
//                   textAlign: header.at(0)?.textAlign,
//                 }}
//               >
//                 {index + 1}
//               </TableCell>
//               <TableCell
//                 style={{
//                   width: header.at(1)?.width,
//                   textAlign: header.at(1)?.textAlign,
//                 }}
//               >
//                 {item.product.name_en}
//               </TableCell>
//               <TableCell
//                 style={{
//                   width: header.at(2)?.width,
//                   textAlign: header.at(2)?.textAlign,
//                 }}
//               >
//                 {currencyFormat(item.price)}
//               </TableCell>
//               <TableCell
//                 style={{
//                   width: header.at(3)?.width,
//                   textAlign: header.at(3)?.textAlign,
//                 }}
//               >
//                 {item.quantity}
//               </TableCell>
//               <TableCell
//                 style={{
//                   width: header.at(4)?.width,
//                   textAlign: header.at(4)?.textAlign,
//                 }}
//               >
//                 {currencyFormat(item.quantity * item.price)}
//               </TableCell>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="row p-0 m-0">
//         <div className="col-6"></div>
//         <div className="col-6 border_top_gray_1px mt-4">
//           <div className="d-flex align-items-center justify-content-between font14 font_family_regular mt-4">
//             <div>Sub Total</div>
//             <div>{currencyFormat(subTotal)}</div>
//           </div>
//           <div className="d-flex align-items-center justify-content-between font14 font_family_regular mt-2">
//             <div>Discount</div>
//             <div>{currencyFormat(discount)}</div>
//           </div>
//           <div className="d-flex align-items-center justify-content-between font14 font_family_regular mt-2">
//             <div>Tax</div>
//             <div>{currencyFormat(tax)}</div>
//           </div>
//           <div className="d-flex align-items-center justify-content-between font14 font_family_regular mt-2">
//             <div>Deliver Fee</div>
//             <div>{currencyFormat(deliveryFee)}</div>
//           </div>
//           <div className="d-flex align-items-center justify-content-between font16 font_family_regular mt-2">
//             <div>Total</div>
//             <div>{currencyFormat(order.total)}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Invoice;
