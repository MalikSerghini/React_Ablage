import TextEditor from "./components/Texteditor"
import Tooltip from "./components/Tooltip"

import Icon_Einheiten_Anwendungen from "./assets/icons/einheiten/Icon_Einheiten_Anwendungen"
import Icon_Einheiten_Komponenten from "./assets/icons/einheiten/Icon_Einheiten_Komponenten"
import Icon_Infrastruktur_Anlagengruppen from "./assets/icons/infrastruktur/Icon_Infrastruktur_Anlagengruppen"
import Icon_Sonstiges_Hilfe from "./assets/icons/sonstiges/Icon_Sonstiges_Hilfe"

import { useRef } from "react"

export default function App() {

  const editorRef = useRef(null)

  const getTextEditorContent = () => {
    console.log(editorRef.current.innerHTML);
    console.log(cleanHTML(editorRef.current.innerHTML));
    console.log(sanitizeHTML(cleanHTML(editorRef.current.innerHTML)));
  }

  const cleanHTML = (html) => {
    // Erstellen eines temporären Containers für den HTML-Inhalt
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Entfernen Sie unerwünschte Attribute von jedem Element
    tempDiv.querySelectorAll("*").forEach((node) => {
      // Entfernen Sie `data-*` und `style` Attribute
      node.removeAttribute("data-pm-slice");
      node.removeAttribute("style"); // Entfernt die Tailwind-Variablen
    });

    return tempDiv.innerHTML;
  };

  const sanitizeHTML = (html) => {
    const allowedTags = ["b", "i", "u", "a", "ul", "ol", "li", "p", "br"];
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    tempDiv.querySelectorAll("*").forEach((node) => {
      // Wenn der Tag nicht erlaubt ist, entfernen
      if (!allowedTags.includes(node.tagName.toLowerCase())) {
        node.replaceWith(...node.childNodes);
      } else {
        // Entferne alle Attribute außer `href` bei Links
        [...node.attributes].forEach(attr => {
          if (node.tagName.toLowerCase() === "a" && attr.name === "href") return;
          node.removeAttribute(attr.name);
        });
      }
    });

    return tempDiv.innerHTML;
  };


  return <div className="h-screen flex flex-col justify-center items-center bg-[#E6EAF3]">

    <Icon_Einheiten_Anwendungen width={16} height={16} color="green"/>
    
    <Icon_Einheiten_Komponenten width={16} height={16} color="green"/>

    <Icon_Infrastruktur_Anlagengruppen width={16} height={16} color="green"/>

    <Icon_Sonstiges_Hilfe width={16} height={16} color="green"/>

    <p className="flex items-center">

      Versionsnummer

      {/* <Tooltip
        titel="Versionsnummer"
        beschreibungstext="Für eine neue Version, wird eine aufsteigende Nummer im Format 00.00.001 vergeben"
      /> */}
    </p>

    <input type="text" placeholder="Versionsnummer" />

    <TextEditor refTest={editorRef} />


  </div>
}