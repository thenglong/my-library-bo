import { FC, ReactNode, useContext, useState } from "react"

import {
  ExpandLessTwoTone as ExpandLessTwoToneIcon,
  ExpandMoreTwoTone as ExpandMoreTwoToneIcon,
} from "@mui/icons-material"
import { Badge, Button, Collapse, ListItem } from "@mui/material"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { matchPath, useLocation } from "react-router-dom"

import { TooltipWrapper } from "components/layout/app-layout/sidebar-menu-item-styled"
import Link from "components/link"
import { SidebarContext } from "contexts/SidebarContext"

interface SidebarMenuItemProps {
  children?: ReactNode
  active?: boolean
  link?: string
  icon?: FC
  badge?: string
  badgeTooltip?: string
  open?: boolean
  name: string
}

const SidebarMenuItem = ({
  children,
  link = "",
  icon: Icon,
  badge,
  badgeTooltip,
  open: openParent = false,
  active: _ = false,
  name,
  ...rest
}: SidebarMenuItemProps) => {
  const [menuToggle, setMenuToggle] = useState(openParent)
  const { t } = useTranslation()
  const { closeSidebar } = useContext(SidebarContext)

  const toggleMenu = () => {
    setMenuToggle((Open) => !Open)
  }

  const location = useLocation()
  const match = matchPath(link, location.pathname)

  if (children) {
    return (
      <ListItem component="div" className="Mui-children" key={name} {...rest}>
        <Button
          className={clsx({ "Mui-active": menuToggle })}
          startIcon={Icon && <Icon />}
          endIcon={
            menuToggle ? <ExpandLessTwoToneIcon /> : <ExpandMoreTwoToneIcon />
          }
          onClick={toggleMenu}
        >
          {badgeTooltip ? (
            <TooltipWrapper title={badgeTooltip} arrow placement="right">
              {badge === "" ? (
                <Badge color="primary" variant="dot" />
              ) : (
                <Badge badgeContent={badge} />
              )}
            </TooltipWrapper>
          ) : badge === "" ? (
            <Badge color="primary" variant="dot" />
          ) : (
            <Badge badgeContent={badge} />
          )}
          {t(name)}
        </Button>
        <Collapse in={menuToggle}>{children}</Collapse>
      </ListItem>
    )
  }

  return (
    <ListItem component="div" key={name} {...rest}>
      <Button<typeof Link>
        disableRipple
        component={Link}
        onClick={closeSidebar}
        to={link}
        startIcon={Icon && <Icon />}
        className={clsx({ "Mui-active": match })}
      >
        {t(name)}
        {badgeTooltip ? (
          <TooltipWrapper title={badgeTooltip} arrow placement="right">
            {badge === "" ? (
              <Badge color="primary" variant="dot" />
            ) : (
              <Badge badgeContent={badge} />
            )}
          </TooltipWrapper>
        ) : badge === "" ? (
          <Badge color="primary" variant="dot" />
        ) : (
          <Badge badgeContent={badge} />
        )}
      </Button>
    </ListItem>
  )
}

export default SidebarMenuItem
