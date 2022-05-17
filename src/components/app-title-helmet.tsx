import { Helmet } from "react-helmet-async"

interface AppTitleHelmetProps {
  title: string
}

const AppTitleHelmet = ({ title }: AppTitleHelmetProps) => {
  return (
    <Helmet>
      <title>My Library | {title}</title>
    </Helmet>
  )
}

export default AppTitleHelmet
