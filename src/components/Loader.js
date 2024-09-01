import { PulseLoader } from "react-spinners";

export default function Loader({color}) {
    return (
        <div className="flex justify-center items-center">
            <PulseLoader color={color}/>
        </div>
    )
}