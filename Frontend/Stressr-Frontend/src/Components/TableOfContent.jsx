
const TableOfContent = () => {
  return (
    <div className="h-full px-4">
      <div className="sticky top-20 h-[80vh] py-32 flex gap-4">
        <div className="h-full w-0.5 bg-neutral-300 rounded-full overflow-hidden"></div>
        <div className="hidden lg:flex flex-col gap-6 text-sm xl:text-base">
          <span className="cursor-pointer transition-colors duration-200">
            Section
          </span>
        </div>

      </div>
      
    </div>
  )
}

export default TableOfContent
