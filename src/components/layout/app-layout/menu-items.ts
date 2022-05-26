import { FC } from "react"

import {
  MenuBook as BookIcon,
  Person as PersonIcon,
  Receipt as ReceiptIcon,
  LocalLibrary as LibraryIcon,
  SupervisorAccount as SupervisorAccountIcon,
} from "@mui/icons-material"

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
        name: "Rental",
        icon: SupervisorAccountIcon,
        link: "/app/management/rentals/list",
      },
      {
        name: "Users",
        icon: PersonIcon,
        link: "/app/management/users/list",
      },
      {
        name: "Members",
        icon: PersonIcon,
        link: "/app/management/members/list",
      },
      {
        name: "Libraries",
        icon: LibraryIcon,
        link: "/app/management/libraries/list",
      },
      {
        name: "Books",
        icon: BookIcon,
        link: "/app/management/books/list",
      },
      {
        name: "Invoices",
        icon: ReceiptIcon,
        link: "/app/management/invoices/list",
      },
    ],
  },
]

export default menuItems
