import Tooltip from "./components/Tooltip"

export default function App(){
  return <div className="h-screen flex flex-col justify-center items-center bg-[#E6EAF3]">

    <p className="flex items-center">
      
      Versionsnummer

      <Tooltip
        titel="Versionsnummer"
        beschreibungstext="Für eine neue Version, wird eine aufsteigende Nummer im Format 00.00.001 vergeben"
        />

    </p>

    <input type="text" placeholder="Versionsnummer"/>

  </div>
}