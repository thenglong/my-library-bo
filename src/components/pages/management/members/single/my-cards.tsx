import { RefObject } from "react"

import {
  Box,
  Card,
  CardHeader,
  Divider,
  Grid,
  styled,
  Typography,
} from "@mui/material"
import { format } from "date-fns"
import { useTranslation } from "react-i18next"

import Logo from "components/logo"
import { User } from "typings/api-model"
import { getRandomInt } from "utils/number-utils"

const CardCc = styled(Card)(
  ({ theme }) => `
       border: 1px solid ${theme.colors.alpha.black[30]};
       background: ${theme.colors.alpha.black[5]};
       box-shadow: none;
  `
)

interface MyCardsProps {
  user: User
  cardRef?: RefObject<HTMLDivElement>
}

const MyCards = ({ user, cardRef }: MyCardsProps) => {
  const { t } = useTranslation()

  return (
    <Card ref={cardRef} sx={{ height: "100%", width: 1000 }}>
      <CardHeader subheader={t("Member card")} />
      <Divider />
      <Box p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <CardCc
              sx={{
                px: 2,
                py: 4,
              }}
            >
              <Box display="flex" alignItems="center">
                <Logo />
                <Typography variant="h4" ml={3}>
                  Member Card
                </Typography>
              </Box>
              <Grid container mt={3}>
                <Grid item xs={4}>
                  <img src={user.avatar} alt="" />
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    Card ID: <strong>{getRandomInt(1, 10000)}</strong>
                  </Typography>
                  <Typography>
                    Name: <strong>{user.name}</strong>
                  </Typography>
                  <Typography>
                    Email: <strong>{user.email}</strong>
                  </Typography>
                  <Typography>
                    Expired Date:{" "}
                    <strong>{format(new Date(), "MMMM dd yyyy")}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <img
                    style={{ maxWidth: "100%" }}
                    src="https://www.qrcode-monkey.com/img/default-preview-qr.svg"
                    alt=""
                  />
                </Grid>
              </Grid>
            </CardCc>
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}

export default MyCards
