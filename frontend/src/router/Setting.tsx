import Navbar from "../components/navbar/Navbar"
import WebSetting from "../components/setting/WebSetting"

const Setting = () => {
  return (
    <>
     <div className="w-full min-h-screen font-Quicksand flex flex-col bg-[#E9E8E4] ">
        <Navbar />
        <div className="w-full py-6 px-8 relative">
            <WebSetting />
        </div>
      </div>
    </>
  )
}
export default Setting