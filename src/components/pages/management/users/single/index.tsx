import { Box, Grid } from "@mui/material"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"

import Footer from "components/footer"
import EditProfile from "components/pages/management/users/single/edit-profile"
import MyCards from "components/pages/management/users/single/my-cards"
import ProfileCover from "components/pages/management/users/single/profile-cover"
import useUserQuery from "hooks/queries/use-user-query"

const ManagementUsersView = () => {
  const { userId } = useParams()
  const { data: user } = useUserQuery(userId as string)

  if (!user) return null

  return (
    <>
      <Helmet>
        <title>{user?.name} - Profile Details</title>
      </Helmet>
      <Box
        sx={{
          mt: 15,
        }}
      >
        <Grid
          sx={{
            px: 4,
          }}
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12} md={6}>
            <ProfileCover user={user} />
          </Grid>
          <Grid item xs={12} md={6}>
            <MyCards />
          </Grid>
          <Grid item xs={12}>
            <EditProfile />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  )
}

export default ManagementUsersView
