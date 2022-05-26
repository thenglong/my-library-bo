import {
  Box,
  Card,
  CardHeader,
  Divider,
  Grid,
  styled,
  Typography,
} from "@mui/material"
import { useTranslation } from "react-i18next"

import Logo from "components/logo"

const CardCc = styled(Card)(
  ({ theme }) => `
       border: 1px solid ${theme.colors.alpha.black[30]};
       background: ${theme.colors.alpha.black[5]};
       box-shadow: none;
  `
)

const MyCards = () => {
  const { t } = useTranslation()

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader subheader={t("Member card")} />
      <Divider />
      <Box p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <CardCc
              sx={{
                px: 2,
                pt: 2,
                pb: 1,
              }}
            >
              <Box display="flex" alignItems="center">
                <Logo />
                <Box>
                  <Typography variant="h3" fontWeight="normal">
                    •••• 6879
                  </Typography>
                  <Typography variant="subtitle2">
                    {t("Expires")}:{" "}
                    <Typography component="span" color="text.primary">
                      12/24
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            </CardCc>
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}

export default MyCards
