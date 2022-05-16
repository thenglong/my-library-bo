import { FC } from "react"

import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone"
import AssignmentIndTwoToneIcon from "@mui/icons-material/AssignmentIndTwoTone"
import ReceiptTwoToneIcon from "@mui/icons-material/ReceiptTwoTone"
import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone"

export interface MenuItem {
  link?: string
  icon?: FC
  badge?: string
  items?: MenuItem[]
  name: string
  badgeTooltip?: string
}

export interface MenuItems {
  items: MenuItem[]
  heading: string
}

const menuItems: MenuItems[] = [
  {
    heading: "Management",
    items: [
      {
        name: "Users",
        icon: AssignmentIndTwoToneIcon,
        link: "/app/management/users",
        items: [
          {
            name: "List",
            link: "management/users/list",
          },
          {
            name: "User Profile",
            link: "management/users/single",
          },
        ],
      },
      {
        name: "Books",
        icon: AccountTreeTwoToneIcon,
        link: "/app/management/books/list",
      },
      {
        name: "Commerce",
        icon: StorefrontTwoToneIcon,
        link: "/app/management/commerce",
        items: [
          {
            name: "Shop",
            link: "management/commerce/shop",
          },
          {
            name: "List",
            link: "management/commerce/products/list",
          },
          {
            name: "Details",
            link: "management/commerce/products/single/1",
          },
          {
            name: "Create",
            link: "management/commerce/products/create",
          },
        ],
      },
      {
        name: "Invoices",
        icon: ReceiptTwoToneIcon,
        link: "/app/management/invoices",
        items: [
          {
            name: "List",
            link: "management/invoices/list",
          },
          {
            name: "Details",
            link: "management/invoices/single",
          },
        ],
      },
    ],
  },
]

export default menuItems
