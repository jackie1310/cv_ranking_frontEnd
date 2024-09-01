import Navbar from "./HeaderNav";

export default function Layout({children}) {
    return (
        <div className="flex flex-col gap-10">
            <div>
                <Navbar/>
            </div>
            <div className="max-w-[1000px] mx-auto w-full">
                {children}
            </div>
        </div>
    )
}