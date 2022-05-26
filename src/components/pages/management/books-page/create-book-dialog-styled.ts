import { Avatar, Box, styled } from "@mui/material"

export const BoxUploadWrapper = styled(Box)(
  ({ theme }) => `
        border-radius: ${theme.general.borderRadius};
        padding: ${theme.spacing(3)};
        background: ${theme.colors.alpha.black[5]};
        border: 1px dashed ${theme.colors.alpha.black[30]};
        outline: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: ${theme.transitions.create(["border", "background"])};
    
        &:hover {
          background: ${theme.colors.alpha.white[100]};
          border-color: ${theme.colors.primary.main};
        }
    `
)

export const EditorWrapper = styled(Box)(
  ({ theme }) => `
    
        .ql-editor {
          min-height: 100px;
        }
    
        .ql-toolbar.ql-snow {
          border-top-left-radius: ${theme.general.borderRadius};
          border-top-right-radius: ${theme.general.borderRadius};
        }
    
        .ql-toolbar.ql-snow,
        .ql-container.ql-snow {
          border-color: ${theme.colors.alpha.black[30]};
        }
    
        .ql-container.ql-snow {
          border-bottom-left-radius: ${theme.general.borderRadius};
          border-bottom-right-radius: ${theme.general.borderRadius};
        }
    
        &:hover {
          .ql-toolbar.ql-snow,
          .ql-container.ql-snow {
            border-color: ${theme.colors.alpha.black[50]};
          }
        }
    `
)

export const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.primary.lighter};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(7)};
        height: ${theme.spacing(7)};
    `
)

export const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.success.light};
        width: ${theme.spacing(7)};
        height: ${theme.spacing(7)};
    `
)

export const AvatarDanger = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.error.light};
        width: ${theme.spacing(7)};
        height: ${theme.spacing(7)};
    `
)
