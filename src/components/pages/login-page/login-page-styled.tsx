import { Box, Card, styled, Typography } from "@mui/material";

export const SidebarContent = styled("div")(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing(6)};
`
);

export const SidebarWrapper = styled("div")(
  ({ theme }) => `
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    background: ${theme.colors.alpha.white[100]};
    width: 440px;
    display: none;
    ${theme.breakpoints.up("md")} {
      display: flex;
    }
`
);

export const CardImage = styled(Card)(
  ({ theme }) => `
    aspect-ratio: 1;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${theme.colors.alpha.black[10]};
    transition: ${theme.transitions.create(["border"])};
`
);

export const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(33)};
`
);

export const MainContent = styled(Box)(
  ({ theme }) => `
  padding: 0 0 0 440px;
  width: 100%;
  display: flex;
  align-items: center;
  ${theme.breakpoints.down("md")} {
    padding: 0;
  }
`
);

export const Content = styled(Box)`
  display: flex;
  width: 100%;
  flex: 1;
`;
