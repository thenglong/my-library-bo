import { ComponentProps, ReactNode } from "react"

import { styled } from "@mui/material/styles"
import clsx from "clsx"

const TextWrapper = styled("span")(
  ({ theme }) => `
      display: inline-block;
      align-items: center;

      &.flexItem {
        display: inline-flex;
      }

      &.MuiText {

        &-black {
          color: ${theme.palette.common.black}
        }

        &-primary {
          color: ${theme.palette.primary.main}
        }

        &-secondary {
          color: ${theme.palette.secondary.main}
        }

        &-success {
          color: ${theme.palette.success.main}
        }

        &-warning {
          color: ${theme.palette.warning.main}
        }

        &-error {
          color: ${theme.palette.error.main}
        }

        &-info {
          color: ${theme.palette.info.main}
        }
      }
`
)

interface TextProps extends ComponentProps<typeof TextWrapper> {
  children: ReactNode
  className?: string
  color:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "success"
    | "info"
    | "black"
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  flex?: any
}

const Text = ({
  className: _,
  color = "secondary",
  flex,
  children,
  ...rest
}: TextProps) => {
  return (
    <TextWrapper
      className={clsx(`MuiText-${color}`, { flexItem: flex })}
      {...rest}
    >
      {children}
    </TextWrapper>
  )
}

export default Text
