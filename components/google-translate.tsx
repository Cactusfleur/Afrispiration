"use client"
import { useEffect } from "react"

export default function GoogleTranslate() {
  useEffect(() => {
    if (document.getElementById("google-translate-script")) return // avoid duplicates

    const addScript = document.createElement("script")
    addScript.id = "google-translate-script"
    addScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    document.body.appendChild(addScript)

    window.googleTranslateElementInit = () => {
      if (document.getElementById("google_translate_element")) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages:
              "en,fr,pt,ar,af,am,ig,ha,ny,rw,sn,so,st,sw,xh,yo,zu,de,es,ur",
            autoDisplay: false,
          },
          "google_translate_element"
        )
      }
    }
  }, [])

  // container where Google injects dropdown
  return <div id="google_translate_element"></div>
}
