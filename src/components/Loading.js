import { PulseLoader } from "react-spinners";

export default function Loading({color}) {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <PulseLoader color={color}/>
        </div>
    )
}