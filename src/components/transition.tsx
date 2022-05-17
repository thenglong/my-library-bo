import { forwardRef } from "react"

import { Slide, SlideProps } from "@mui/material"

const Transition = forwardRef<unknown, SlideProps>((props, ref) => (
  <Slide direction="down" ref={ref} {...props}>
    {props.children}
  </Slide>
))

Transition.displayName = "Transition"

export default Transition
