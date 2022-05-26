import { EditTwoTone as EditTwoToneIcon } from "@mui/icons-material"
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material"
import { useTranslation } from "react-i18next"

import Text from "components/text"

const EditProfile = () => {
  const { t } = useTranslation()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                {t("Details")}
              </Typography>
              <Typography variant="subtitle2">
                {t("Manage information related to personal user details")}
              </Typography>
            </Box>
            <Button variant="text" startIcon={<EditTwoToneIcon />}>
              {t("Edit")}
            </Button>
          </Box>
          <Divider />
          <CardContent
            sx={{
              p: 4,
            }}
          >
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    {t("Name")}:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>Craig Donin</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    {t("Date of birth")}:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>15 March 1977</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    {t("Address")}:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Box
                    sx={{
                      maxWidth: { xs: "auto", sm: 300 },
                    }}
                  >
                    <Text color="black">
                      1749 High Meadow Lane, SEQUOIA NATIONAL PARK, California,
                      93262
                    </Text>
                  </Box>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default EditProfile
