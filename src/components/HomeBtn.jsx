import { AiOutlineHome } from "react-icons/ai"

const HomeBtn = ({inicioBtn}) => {
  return (
    <button onClick={inicioBtn} className="absolute bottom-2 left-32">
        <AiOutlineHome className="text-[66px] bg-white rounded p-2"/>
       
    </button>
  )
}

export default HomeBtn