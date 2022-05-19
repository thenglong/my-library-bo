import { Box, Button, Card, Container, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import AppTitleHelmet from "components/app-title-helmet"
import LanguageSwitcher from "components/layout/app-layout/language-switcher"
import Logo from "components/logo"
import LifeQuote from "components/pages/sign-in-page/life-quote"
import {
  Content,
  MainContent,
  SidebarContent,
  SidebarWrapper,
} from "components/pages/sign-in-page/sign-in-page-styled"
import SignUpForm from "components/pages/sign-in-page/sign-up-form"
import Scrollbar from "components/scrollbar"

const SignUpPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <>
      <AppTitleHelmet title={t("Sign up")} />
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
            maxWidth="md"
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
                  {t("Sign up your library")}
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{
                    mb: 3,
                  }}
                >
                  Fill in the fields below to sign up your library.
                </Typography>
              </Box>
              <SignUpForm />
            </Card>

            <Button
              sx={{ mb: 8 }}
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate("/sign-in")}
            >
              {t("Sign into your account?")}
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

export default SignUpPage
