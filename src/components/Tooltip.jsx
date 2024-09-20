import QuestionmarkIcon from "../assets/icons/QuestionmarkIcon"

export default function Tooltip({titel, beschreibungstext}){
    return <div className="group relative">
        
        <QuestionmarkIcon/> 

        <div className="bg-[#113969] absolute -bottom-[100%] right-1/2 translate-x-1/2 w-80 py-4 px-4 text-[#F4F6F8] text-sm rounded-lg scale-0 group-hover:scale-100 group-hover:bottom-[220%] duration-200">

            <p className="font-semibold">
                {titel}
            </p>

            <p className="font-light">
                {beschreibungstext}
            </p>

            <svg className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16" viewBox="0 0 114 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26 12.5001L0 12.5001L21 0H92L114 12.5001C103.839 12.8908 96.1224 11.5403 88.4616 14.0352C83.9251 15.5126 80.4178 18.9829 77.343 22.6311C74.9735 25.4425 72.1802 28.7883 69 32.65C63.4 39.45 56 37.15 52.5 32.65C43 17.15 40 12.9999 26 12.5001Z" fill="#113969"/>
            </svg>

        </div>


    </div>
}