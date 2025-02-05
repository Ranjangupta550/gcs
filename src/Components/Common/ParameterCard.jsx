function ParaCard(props) {
   return (
    <>
        < div className="h-20 w-[100%]  bg-[#302929] text-yellow-500  flex flex-col justify-evenly items-center rounded-md">
            <div className="text-[#F8F8F8] text-sm font-bold">{props.title}</div>
            <div className="flex flex-row justify-center items-center gap-1  w-[80%] border-[#F8F8F8] border-opacity-50 rounded-md h-[50%] bg-white bg-opacity-10 relative"> 
            <div className=" text-2xl  font-bold">{props.value}</div>
            <div className="text-[#F8F8F8] text font-bold">{props.unit}</div>
            </div>
        </div>
    </>
   )
}
export default ParaCard;