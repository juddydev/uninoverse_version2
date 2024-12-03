import { useParams } from "@remix-run/react"

/**
 * A hook to get the current locale and return a translation based on it.
 */
export function useTranslation() {
  const params = useParams<"locale" | "lang">()

  const locale = params.locale || params.lang || "ja"

  return (
    /**
     * Japanese
     */
    ja: string,
    /**
     * English
     */
    en: string,
  ) => {
    if (locale === "en") {
      return en
    }

    return ja
  }
}
