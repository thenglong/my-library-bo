import { styled } from "@mui/material"
import { motion } from "framer-motion"

export const ImageLabel = styled(motion.div)(
  ({ theme }) => `
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      align-items: center;
      outline: 1px solid ${theme.palette.grey[400]};
      border-radius: ${theme.shape.borderRadius}px;
      height: max-content;
      padding: ${theme.spacing(4)};
      transition: outline 0.1s ease-in-out;
      
      &:hover {
        outline: 2px solid ${theme.palette.primary.main};
      }
      
      & .label-text {
        margin-top: ${theme.spacing(4)};
      }
`
)
