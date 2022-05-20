import { FC } from "react"

import { MenuBook as BookIcon, Person as PersonIcon } from "@mui/icons-material"

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
        icon: PersonIcon,
        link: "/app/management/users/list",
      },
      {
        name: "Books",
        icon: BookIcon,
        link: "/app/management/books/list",
      },
      {
        name: "Invoices",
        icon: BookIcon,
        link: "/app/management/invoices",
        items: [
          {
            name: "List",
            link: "/app/management/invoices/list",
          },
          {
            name: "Details",
            link: "/app/management/invoices/single",
          },
        ],
      },
    ],
  },
]

export default menuItems
