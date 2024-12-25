import { FaQuoteLeft } from "react-icons/fa";
import { ReviewProp } from "./Interfaces";
const  ReviewCard  = (props : ReviewProp) => {
  return (
    <div className=" col-span-12  sm:col-span-6 lg:col-span-4 mx-5 my-4 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h3 className="text-2xl font-medium text-white">Spinix</h3>
<div className="my-5">
      <FaQuoteLeft className="text-gray-400" />
<p className="font-normal text-gray-700 dark:text-gray-400">{props.description}</p>

</div>
<hr  />

{/* customer profile section   */}
<div className=" flex space-x-4 items-center pl-5 mt-4">
<img className="rounded-full w-12 h-12" src={props.url} alt="profile picture" />
    <div className="">
        <p className="text-white text-lg">{props.name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{props.address}</p>
    </div>
</div>

    </div>
  )
}

export default ReviewCard
