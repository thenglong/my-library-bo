import { FC, ReactNode, useContext, useState } from "react"

import ExpandLessTwoToneIcon from "@mui/icons-material/ExpandLessTwoTone"
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone"
import {
  Badge,
  Button,
  Collapse,
  ListItem,
  styled,
  Tooltip,
  tooltipClasses,
} from "@mui/material"
import clsx from "clsx"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"

import Link from "components/link"
import { SidebarContext } from "contexts/SidebarContext"

const TooltipWrapper = styled<typeof Tooltip>(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }}>
    {props.children}
  </Tooltip>
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: "bold",
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      "0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100],
  },
}))

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
  link,
  icon: Icon,
  badge,
  badgeTooltip,
  open: openParent,
  active: _,
  name,
  ...rest
}: SidebarMenuItemProps) => {
  const [menuToggle, setMenuToggle] = useState(openParent)
  const { t } = useTranslation()
  const { closeSidebar } = useContext(SidebarContext)

  const toggleMenu = () => {
    setMenuToggle((Open) => !Open)
  }

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
        to={link || ""}
        startIcon={Icon && <Icon />}
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

SidebarMenuItem.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  link: PropTypes.string,
  icon: PropTypes.elementType,
  badge: PropTypes.string,
  badgeTooltip: PropTypes.string,
  open: PropTypes.bool,
  name: PropTypes.string.isRequired,
}

SidebarMenuItem.defaultProps = {
  open: false,
  active: false,
}

export default SidebarMenuItem
