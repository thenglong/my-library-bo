import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"

const AppFaviconHelmet = () => {
  const {
    i18n: { language },
  } = useTranslation()

  const isEnglish =
    language === "en" || language === "en-US" || language === "en-GB"

  const faviconFile = isEnglish ? "favicon-en.ico" : "favicon-kh.ico"
  const faviconUrl = `${process.env.PUBLIC_URL}/favicons/${faviconFile}`

  return (
    <Helmet>
      <link rel="icon" href={faviconUrl} />
    </Helmet>
  )
}

export default AppFaviconHelmet
