import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-[#fdfdfd] p-1.5">
      <div className="bg-[#EFD5C5] rounded bg-opacity-45">
        <div className="flex justify-between items-center py-3 px-5">
          <div className="flex items-center">
            <button><img src="/images/logo.png" alt="Logo" className="w-9 h-auto pr-2 logo inline-block"></img></button>
            <button className="text-[#BC8D0B] text-3xl border-none font-bold cursor-pointer inline-block">RoomieManager - Expense Tracker</button>
          </div>
          <div>
            <button className="w-14 h-auto"><img src="/images/profile_icon.jpg" alt=""></img></button>
          </div>
        </div>
      </div>
    </div>
  
  );
}