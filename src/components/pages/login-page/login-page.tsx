import { Box, Card, Container, Typography } from "@mui/material"
import { Helmet } from "react-helmet-async"

import Logo from "components/logo"
import LifeQuote from "components/pages/login-page/life-quote"
import LoginForm from "components/pages/login-page/login-form"
import {
  Content,
  MainContent,
  SidebarContent,
  SidebarWrapper,
} from "components/pages/login-page/login-page-styled"
import Scrollbar from "components/scrollbar"

const LoginPage = () => (
  <>
    <Helmet>
      <title>Login</title>
    </Helmet>
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
              <Typography
                variant="h2"
                sx={{
                  mb: 1,
                }}
              >
                Sign in
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
            <LoginForm />
          </Card>
        </Container>
      </MainContent>
    </Content>
  </>
)

export default LoginPage
