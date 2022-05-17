/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useCallback, useEffect } from "react"

import { Box, Tabs, Tab, Grid, styled } from "@mui/material"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import Footer from "components/footer"
import MyCards from "components/pages/management/Users/single/MyCards"
import NotificationsTab from "components/pages/management/Users/single/NotificationsTab"
import PopularTags from "components/pages/management/Users/single/PopularTags"
import ProfileCover from "components/pages/management/Users/single/ProfileCover"
import RecentActivity from "components/pages/management/Users/single/RecentActivity"
import SecurityTab from "components/pages/management/Users/single/SecurityTab"
import useRefMounted from "hooks/use-ref-mounted"
import axios from "utils/axios"

import ActivityTab from "./ActivityTab"
import Addresses from "./Addresses"
import EditProfileTab from "./EditProfileTab"
import Feed from "./Feed"

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
/* eslint-disable @typescript-eslint/no-explicit-any */

function ManagementUsersView() {
  const isMountedRef = useRefMounted()
  const [user, setUser] = useState<any>(null)

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

  const getUser = useCallback(async () => {
    try {
      const response = await axios.get("/api/user", {
        params: {
          userId,
        },
      })
      if (isMountedRef.current) {
        setUser(response.data.user)
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }, [userId, isMountedRef])

  useEffect(() => {
    getUser()
  }, [getUser])

  if (!user) {
    return null
  }

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
