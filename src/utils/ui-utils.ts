export const getInitialImage = (name: string, bgHex?: string): string => {
  const background = bgHex ? `?background=${encodeURIComponent(bgHex)}` : ""

  return `https://avatars.dicebear.com/api/initials/:${encodeURIComponent(
    name
  )}.svg${background}`
}
