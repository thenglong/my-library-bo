import { Box, Card, Container, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

import AppTitleHelmet from "components/app-title-helmet"
import LanguageSwitcher from "components/layout/app-layout/language-switcher"
import Logo from "components/logo"
import LifeQuote from "components/pages/sign-in-page/life-quote"
import SignInForm from "components/pages/sign-in-page/sign-in-form"
import {
  Content,
  MainContent,
  SidebarContent,
  SidebarWrapper,
} from "components/pages/sign-in-page/sign-in-page-styled"
import Scrollbar from "components/scrollbar"

const SignInPage = () => {
  const { t } = useTranslation()

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
                  Fill in the fields below to sign into your account.
                </Typography>
              </Box>
              <SignInForm />
            </Card>

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
