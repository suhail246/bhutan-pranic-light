import { BiUserCircle } from "react-icons/bi";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import {
  RiMoneyDollarCircleLine,
  RiShoppingBagLine,
  RiWalletLine,
} from "react-icons/ri";

import company1 from "../../../images/companies/img-1.png";
import company2 from "../../../images/companies/img-2.png";
import company3 from "../../../images/companies/img-3.png";
import company5 from "../../../images/companies/img-5.png";
import company8 from "../../../images/companies/img-8.png";
import product1 from "../../../images/products/img-1.png";
import product2 from "../../../images/products/img-2.png";
import product3 from "../../../images/products/img-3.png";
import product4 from "../../../images/products/img-4.png";
import product5 from "../../../images/products/img-5.png";
import avatar1 from "../../../images/users/avatar-1.jpg";
import avatar2 from "../../../images/users/avatar-2.jpg";
import avatar3 from "../../../images/users/avatar-3.jpg";
import avatar4 from "../../../images/users/avatar-4.jpg";
import avatar6 from "../../../images/users/avatar-6.jpg";

const ecomWidgets = [
  {
    id: 1,
    label: "Total Earnings",
    badge: <FiArrowUpRight />,
    badgeClass: "text-[#0AB39C]",
    percentage: "+16.24",
    counter: "559.25",
    link: "View net earnings",
    bgcolor: "bg-[#0AB39C]/10 text-[#0AB39C]",
    icon: <RiMoneyDollarCircleLine />,
    decimals: 2,
    prefix: "$",
    suffix: "k",
  },
  {
    id: 2,
    cardColor: "secondary",
    label: "Orders",
    badge: <FiArrowDownRight />,
    badgeClass: "text-[#F06548]",
    percentage: "-3.57",
    counter: "36894",
    link: "View all orders",
    bgcolor: "bg-[#299CDB]/10 text-[#299CDB]",
    icon: <RiShoppingBagLine />,
    decimals: 0,
    prefix: "",
    separator: ",",
    suffix: "",
  },
  {
    id: 3,
    cardColor: "success",
    label: "Customers",
    badge: <FiArrowUpRight />,
    badgeClass: "text-[#0AB39C]",
    percentage: "+29.08",
    counter: "183.35",
    link: "See details",
    bgcolor: "bg-[#F7B850]/10 text-[#F7B850]",
    icon: <BiUserCircle />,
    decimals: 2,
    prefix: "",
    suffix: "M",
  },
  {
    id: 4,
    cardColor: "info",
    label: "My Balance",
    badgeClass: "muted",
    percentage: "+0.00",
    counter: "165.89",
    link: "Withdraw money",
    bgcolor: "bg-[#5147A3]/10 text-[#5147A3]",
    icon: <RiWalletLine />,
    decimals: 2,
    prefix: "$",
    suffix: "k",
  },
];

const revenueChartData = [
  {
    id: "all",
    name: "All",
    data: [
      {
        name: "Jan",
        orders: 34,
        earnings: 89.25,
        refunds: 8,
      },
      {
        name: "Feb",
        orders: 35,
        earnings: 98.58,
        refunds: 12,
      },
      {
        name: "Mar",
        orders: 46,
        earnings: 68.74,
        refunds: 7,
      },
      {
        name: "Apr",
        orders: 68,
        earnings: 108.87,
        refunds: 17,
      },
      {
        name: "May",
        orders: 49,
        earnings: 77.54,
        refunds: 21,
      },
      {
        name: "Jun",
        orders: 61,
        earnings: 84.03,
        refunds: 11,
      },
      {
        name: "Jul",
        orders: 42,
        earnings: 51.24,
        refunds: 5,
      },
      {
        name: "Aug",
        orders: 44,
        earnings: 28.57,
        refunds: 9,
      },
      {
        name: "Sep",
        orders: 78,
        earnings: 92.57,
        refunds: 7,
      },
      {
        name: "Oct",
        orders: 52,
        earnings: 42.36,
        refunds: 29,
      },
      {
        name: "Nov",
        orders: 63,
        earnings: 88.51,
        refunds: 12,
      },
      {
        name: "Dec",
        orders: 67,
        earnings: 36.57,
        refunds: 35,
      },
    ],
  },

  {
    id: "one-month",
    name: "1M",
    data: [
      {
        name: "Jan",
        orders: 54,
        earnings: 89.25,
        refunds: 18,
      },
      {
        name: "Feb",
        orders: 85,
        earnings: 98.58,
        refunds: 22,
      },
      {
        name: "Mar",
        orders: 66,
        earnings: 68.74,
        refunds: 27,
      },
      {
        name: "Apr",
        orders: 18,
        earnings: 108.87,
        refunds: 37,
      },
      {
        name: "May",
        orders: 29,
        earnings: 77.54,
        refunds: 41,
      },
      {
        name: "Jun",
        orders: 31,
        earnings: 84.03,
        refunds: 21,
      },
      {
        name: "Jul",
        orders: 12,
        earnings: 51.24,
        refunds: 15,
      },
      {
        name: "Aug",
        orders: 14,
        earnings: 28.57,
        refunds: 19,
      },
      {
        name: "Sep",
        orders: 38,
        earnings: 92.57,
        refunds: 27,
      },
      {
        name: "Oct",
        orders: 72,
        earnings: 42.36,
        refunds: 19,
      },
      {
        name: "Nov",
        orders: 33,
        earnings: 88.51,
        refunds: 22,
      },
      {
        name: "Dec",
        orders: 27,
        earnings: 36.57,
        refunds: 45,
      },
    ],
  },

  {
    id: "half-yearly",
    name: "6M",
    data: [
      {
        name: "Jan",
        orders: 34,
        earnings: 89.25,
        refunds: 8,
      },
      {
        name: "Feb",
        orders: 65,
        earnings: 98.58,
        refunds: 22,
      },
      {
        name: "Mar",
        orders: 46,
        earnings: 68.74,
        refunds: 87,
      },
      {
        name: "Apr",
        orders: 68,
        earnings: 108.87,
        refunds: 47,
      },
      {
        name: "May",
        orders: 49,
        earnings: 77.54,
        refunds: 41,
      },
      {
        name: "Jun",
        orders: 61,
        earnings: 84.03,
        refunds: 31,
      },
      {
        name: "Jul",
        orders: 42,
        earnings: 51.24,
        refunds: 5,
      },
      {
        name: "Aug",
        orders: 44,
        earnings: 28.57,
        refunds: 9,
      },
      {
        name: "Sep",
        orders: 78,
        earnings: 92.57,
        refunds: 47,
      },
      {
        name: "Oct",
        orders: 52,
        earnings: 42.36,
        refunds: 49,
      },
      {
        name: "Nov",
        orders: 63,
        earnings: 88.51,
        refunds: 32,
      },
      {
        name: "Dec",
        orders: 67,
        earnings: 36.57,
        refunds: 55,
      },
    ],
  },

  {
    id: "one-year",
    name: "1Y",
    data: [
      {
        name: "Jan",
        orders: 14,
        earnings: 99.25,
        refunds: 58,
      },
      {
        name: "Feb",
        orders: 35,
        earnings: 88.58,
        refunds: 42,
      },
      {
        name: "Mar",
        orders: 26,
        earnings: 78.74,
        refunds: 47,
      },
      {
        name: "Apr",
        orders: 38,
        earnings: 118.87,
        refunds: 57,
      },
      {
        name: "May",
        orders: 29,
        earnings: 87.54,
        refunds: 71,
      },
      {
        name: "Jun",
        orders: 31,
        earnings: 94.03,
        refunds: 21,
      },
      {
        name: "Jul",
        orders: 22,
        earnings: 61.24,
        refunds: 15,
      },
      {
        name: "Aug",
        orders: 24,
        earnings: 58.57,
        refunds: 69,
      },
      {
        name: "Sep",
        orders: 58,
        earnings: 102.57,
        refunds: 17,
      },
      {
        name: "Oct",
        orders: 32,
        earnings: 62.36,
        refunds: 39,
      },
      {
        name: "Nov",
        orders: 33,
        earnings: 48.51,
        refunds: 52,
      },
      {
        name: "Dec",
        orders: 77,
        earnings: 66.57,
        refunds: 55,
      },
    ],
  },
];

const salesByLocationsData = [
  {
    id: 1,
    country: "Canada",
    percentage: "75%",
    value: 75,
  },
  {
    id: 2,
    country: "Greenland",
    percentage: "47%",
    value: 47,
  },
  {
    id: 3,
    country: "Russia",
    percentage: "82%",
    value: 82,
  },
];

const bestSellingProducts = [
  {
    id: 1,
    img: product1,
    label: "Branded T-Shirts",
    date: "24 Apr 2021",
    price: 29.0,
    orders: 62,
    stock: 510,
    amount: 1798,
  },
  {
    id: 2,
    img: product2,
    label: "Bentwood Chair",
    date: "19 Mar 2021",
    price: 85.2,
    orders: 35,
    amount: 2982,
  },
  {
    id: 3,
    img: product3,
    label: "Borosil Paper Cup",
    date: "01 Mar 2021",
    price: 14.0,
    orders: 80,
    stock: 749,
    amount: 1120,
  },
  {
    id: 4,
    img: product4,
    label: "One Seater Sofa",
    date: "11 Feb 2021",
    price: 127.5,
    orders: 56,
    amount: 7140,
  },
  {
    id: 5,
    img: product5,
    label: "Stillbird Helmet",
    date: "17 Jan 2021",
    price: 54,
    orders: 74,
    stock: 805,
    amount: 3996,
  },
];

const topSellers = [
  {
    id: 1,
    img: company1,
    label: "iTest Factory",
    name: "Oliver Tyler",
    product: "Bags and Wallets",
    stock: 8547,
    amount: 541200,
    percentage: 32,
  },
  {
    id: 2,
    img: company2,
    label: "Digitech Galaxy",
    name: "John Roberts",
    product: "Watches",
    stock: 895,
    amount: 75030,
    percentage: 79,
  },
  {
    id: 3,
    img: company3,
    label: "Nesta Technologies",
    name: "Harley Fuller",
    product: "Bike Accessories",
    stock: 3470,
    amount: 45600,
    percentage: 90,
  },
  {
    id: 4,
    img: company8,
    label: "Zoetic Fashion",
    name: "James Bowen",
    product: "Clothes",
    stock: 5488,
    amount: 29456,
    percentage: 40,
  },
  {
    id: 5,
    img: company5,
    label: "Meta4Systems",
    name: "Zoe Dennis",
    product: "Furniture",
    stock: 4100,
    amount: 11260,
    percentage: 57,
  },
];

const recentOrders = [
  {
    id: 1,
    orderId: "#VZ2112",
    img: avatar1,
    name: "Alex Smith",
    product: "Clothes",
    amount: 109.0,
    vendor: "Zoetic Fashion",
    status: "Paid",
    statusClass: "bg-[#0AB39C]/20 text-[#0AB39C]",
    smallStatusClass: "bg-[#0AB39C]",
    rating: 5,
    votes: "61",
  },
  {
    id: 2,
    orderId: "#VZ2111",
    img: avatar2,
    name: "Jansh Brown",
    product: "Kitchen Storage",
    amount: 149.0,
    vendor: "Micro Design",
    status: "Pending",
    statusClass: "bg-[#F7B84B]/20 text-[#F7B84B]",
    smallStatusClass: "bg-[#F7B84B]",
    rating: 4.5,
    votes: "61",
  },
  {
    id: 3,
    orderId: "#VZ2109",
    img: avatar3,
    name: "Ayaan Bowen",
    product: "Bike Accessories",
    amount: 215.0,
    vendor: "Nesta Technologies",
    status: "Paid",
    statusClass: "bg-[#0AB39C]/20 text-[#0AB39C]",
    smallStatusClass: "bg-[#0AB39C]",
    rating: 4.9,
    votes: "89",
  },
  {
    id: 4,
    orderId: "#VZ2108",
    img: avatar4,
    name: "Prezy Mark",
    product: "Furniture",
    amount: 199.0,
    vendor: "Syntyce Solutions",
    status: "Unpaid",
    statusClass: "bg-[#F06548]/20 text-[#F06548]",
    smallStatusClass: "bg-[#F06548]",
    rating: 4.3,
    votes: "47",
  },
  {
    id: 5,
    orderId: "#VZ2107",
    img: avatar6,
    name: "Vihan Hudda",
    product: "Bags and Wallets",
    amount: 330.0,
    vendor: "iTest Factory",
    status: "Paid",
    statusClass: "bg-[#0AB39C]/20 text-[#0AB39C]",
    smallStatusClass: "bg-[#0AB39C]",
    rating: 4.7,
    votes: "161",
  },
];

export {
  bestSellingProducts,
  ecomWidgets,
  recentOrders,
  revenueChartData,
  salesByLocationsData,
  topSellers,
};
