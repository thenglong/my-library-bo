import { forwardRef } from "react"

import { NavLink as RouterLink, NavLinkProps } from "react-router-dom"

// eslint-disable-next-line react/display-name
const Link = forwardRef<HTMLAnchorElement, NavLinkProps>((props, ref) => (
  <RouterLink
    ref={ref}
    className={({ isActive }) => (isActive ? "Mui-active" : "")}
    {...props}
  >
    {props.children}
  </RouterLink>
))
export default Link
