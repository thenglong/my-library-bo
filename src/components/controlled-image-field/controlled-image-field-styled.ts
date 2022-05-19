import { styled } from "@mui/material"
import { motion } from "framer-motion"

export const ImageUploadWrapper = styled(motion.div)(
  ({ theme }) => `
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      align-items: center;
      border: 1px solid ${theme.palette.grey[400]};
      border-radius: ${theme.shape.borderRadius}px;
      height: max-content;
      padding: ${theme.spacing(1.5)};
      transition: border 0.1s ease-in-out;
      
      &:hover {
        border: 2px solid ${theme.palette.primary.main};
        .image-field-label, .hint-text  {
           color: ${theme.palette.primary.main};
        }
      }
      
      & .hint-text {
        margin-top: ${theme.spacing(4)};
      }
`
)
