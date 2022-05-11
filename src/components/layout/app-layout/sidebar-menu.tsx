import { ReactNode } from "react"

import { Box, List, ListSubheader, styled } from "@mui/material"
import { matchPath, useLocation } from "react-router-dom"

import menuItems, { MenuItem } from "components/layout/app-layout/menu-items"
import SidebarMenuItem from "components/layout/app-layout/side-bar-menu-item"

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    margin-bottom: ${theme.spacing(1.5)};
    padding: 0;

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.sidebar.menuItemIconColor};
      padding: ${theme.spacing(1, 3.5)};
      line-height: 1.4;
    }
`
)

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(5.5)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.sidebar.menuItemColor};
          background-color: ${theme.sidebar.menuItemBg};
          width: 100%;
          border-radius: 0;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 4)};

          &:after {
            content: '';
            position: absolute;
            height: 100%;
            right: 0;
            top: 0;
            width: 0;
            opacity: 0;
            transition: ${theme.transitions.create(["opacity", "width"])};
            background: ${theme.sidebar.menuItemColorActive};
            border-top-left-radius: ${theme.general.borderRadius};
            border-bottom-left-radius: ${theme.general.borderRadius};
          }
    
          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(["color"])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
            color: ${theme.sidebar.menuItemIconColor};
          }
          
          .MuiButton-endIcon {
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.Mui-active,
          &:hover {
            background-color: ${theme.sidebar.menuItemBgActive};
            color: ${theme.sidebar.menuItemColorActive};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
                color: ${theme.sidebar.menuItemIconColorActive};
            }
          }

          &.Mui-active {
            &:after {
              width: 5px;
              opacity: 1;
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(8)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.7, 4, 0.7, 4.25)};

              .MuiBadge-root {
                right: ${theme.spacing(5.5)};
              }

              &:before {
                content: ' ';
                background: ${theme.sidebar.menuItemIconColorActive};
                opacity: 0;
                transition: ${theme.transitions.create([
                  "transform",
                  "opacity",
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.Mui-active,
              &:hover {
                background-color: ${theme.sidebar.menuItemBg};

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }

                &:after {
                  opacity: 0;
                }
              }
            }
          }
        }
      }
    }
`
)

const renderSidebarMenuItems = ({
  items,
  path,
}: {
  items: MenuItem[]
  path: string
}): JSX.Element => (
  <SubMenuWrapper>
    {items.reduce(
      (ev, item) => reduceChildRoutes({ ev, item, path }),
      [] as ReactNode[]
    )}
  </SubMenuWrapper>
)

const reduceChildRoutes = ({
  ev,
  path,
  item,
}: {
  ev: ReactNode[]
  path: string
  item: MenuItem
}): Array<ReactNode> => {
  const key = item.name

  const exactMatch = item.link
    ? !!matchPath(
        {
          path: item.link,
          end: true,
        },
        path
      )
    : false

  if (item.items) {
    const partialMatch = item.link
      ? !!matchPath(
          {
            path: item.link,
            end: false,
          },
          path
        )
      : false

    ev.push(
      <SidebarMenuItem
        key={key}
        active={partialMatch}
        open={partialMatch}
        name={item.name}
        icon={item.icon}
        link={item.link}
        badge={item.badge}
      >
        {renderSidebarMenuItems({
          path,
          items: item.items,
        })}
      </SidebarMenuItem>
    )
  } else {
    ev.push(
      <SidebarMenuItem
        key={key}
        active={exactMatch}
        name={item.name}
        link={item.link}
        badge={item.badge}
        icon={item.icon}
      />
    )
  }

  return ev
}

function SidebarMenu() {
  const location = useLocation()

  return (
    <>
      {menuItems.map((section) => (
        <MenuWrapper key={section.heading}>
          <List
            component="div"
            subheader={
              <ListSubheader component="div" disableSticky>
                {section.heading}
              </ListSubheader>
            }
          >
            {renderSidebarMenuItems({
              items: section.items,
              path: location.pathname,
            })}
          </List>
        </MenuWrapper>
      ))}
    </>
  )
}

export default SidebarMenu
