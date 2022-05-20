/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"

import { Box, Grid, styled, Tab, Tabs } from "@mui/material"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import Footer from "components/footer"
import ActivityTab from "components/pages/management/users/single/activity-tab"
import Addresses from "components/pages/management/users/single/addresses"
import EditProfileTab from "components/pages/management/users/single/edit-profile-tab"
import Feed from "components/pages/management/users/single/feed"
import MyCards from "components/pages/management/users/single/my-cards"
import NotificationsTab from "components/pages/management/users/single/notifications-tab"
import PopularTags from "components/pages/management/users/single/popular-tags"
import ProfileCover from "components/pages/management/users/single/profile-cover"
import RecentActivity from "components/pages/management/users/single/recent-activity"
import SecurityTab from "components/pages/management/users/single/security-tab"
import useUserQuery from "hooks/queries/use-user-query"

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;

      .MuiTabs-indicator {
        box-shadow: none;
      }
    }
`
)

const ManagementUsersView = () => {
  const { userId } = useParams()
  const { t } = useTranslation()

  const [currentTab, setCurrentTab] = useState("activity")

  const tabs = [
    { value: "activity", label: t("Activity") },
    { value: "edit_profile", label: t("Edit Profile") },
    { value: "notifications", label: t("Notifications") },
    { value: "security", label: t("Passwords/Security") },
  ]

  const handleTabsChange = (_event: any, value: any) => {
    setCurrentTab(value)
  }

  const { data: user } = useUserQuery(userId as string)

  if (!user) return null

  return (
    <>
      <Helmet>
        <title>{user?.name} - Profile Details</title>
      </Helmet>
      <Box
        sx={{
          mt: 3,
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
          <Grid item xs={12} md={8}>
            <ProfileCover user={user} />
          </Grid>
          <Grid item xs={12} md={4}>
            <RecentActivity />
          </Grid>
          <Grid item xs={12} md={8}>
            <Feed />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularTags />
          </Grid>
          <Grid item xs={12} md={7}>
            <MyCards />
          </Grid>
          <Grid item xs={12} md={5}>
            <Addresses />
          </Grid>
          <Grid item xs={12}>
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            {currentTab === "activity" && <ActivityTab />}
            {currentTab === "edit_profile" && <EditProfileTab />}
            {currentTab === "notifications" && <NotificationsTab />}
            {currentTab === "security" && <SecurityTab />}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  )
}

export default ManagementUsersView
