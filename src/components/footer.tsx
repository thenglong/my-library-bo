import { Box, Card, Link, Typography, styled } from "@mui/material"
import { useTranslation } from "react-i18next"

const FooterWrapper = styled(Card)(
  ({ theme }) => `
          border-radius: 0;
          margin-top: ${theme.spacing(4)};
  `
)

const Footer = () => {
  const { t } = useTranslation()
  return (
    <FooterWrapper className="footer-wrapper">
      <Box
        p={4}
        display={{ xs: "block", md: "flex" }}
        alignItems="center"
        textAlign={{ xs: "center", md: "left" }}
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="subtitle1">
            &copy; {t("Just for Python assignment")} -{" "}
            {new Date().getFullYear()}
          </Typography>
        </Box>
        <Typography
          sx={{
            pt: { xs: 2, md: 0 },
          }}
          variant="subtitle1"
        >
          By{" "}
          <Link href="#" target="_blank" rel="noopener noreferrer">
            {t("Aliens")}
          </Link>
        </Typography>
      </Box>
    </FooterWrapper>
  )
}

export default Footer
