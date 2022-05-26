import { Box, Button, Card, Container, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import AppTitleHelmet from "components/app-title-helmet"
import LanguageSwitcher from "components/layout/app-layout/language-switcher"
import Logo from "components/logo"
import LifeQuote from "components/pages/auth-page/life-quote"
import SignInForm from "components/pages/auth-page/sign-in-form"
import {
  Content,
  MainContent,
  SidebarContent,
  SidebarWrapper,
} from "components/pages/auth-page/sign-in-page-styled"
import Scrollbar from "components/scrollbar"

const SignInPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <>
      <AppTitleHelmet title={t("Sign in")} />
      <Content>
        <SidebarWrapper>
          <Scrollbar>
            <SidebarContent>
              <Logo />
              <Box mt={6}>
                <LifeQuote />
              </Box>
            </SidebarContent>
          </Scrollbar>
        </SidebarWrapper>
        <MainContent>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
            maxWidth="sm"
          >
            <Card
              sx={{
                p: 4,
                my: 4,
              }}
            >
              <Box textAlign="center">
                <Box sx={{ display: { md: "none", sm: "revert" } }}>
                  <Logo />
                </Box>

                <Typography variant="h2" my={3}>
                  {t("Sign in")}
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{
                    mb: 3,
                  }}
                >
                  {t("Fill in the fields below to sign into your account.")}
                </Typography>
              </Box>
              <SignInForm />
            </Card>

            <Button
              sx={{ mb: 8 }}
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate("/sign-up")}
            >
              {t("Sign up for your library?")}
            </Button>

            <Box mb={2}>
              <LanguageSwitcher />
            </Box>
          </Container>
        </MainContent>
      </Content>
    </>
  )
}

export default SignInPage
