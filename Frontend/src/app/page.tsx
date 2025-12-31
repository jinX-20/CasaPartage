import Link from "next/link";

export default function Home() {
  return (
    <>
  <div className="flex justify-between items-center py-3 px-5">
    <div className="flex items-center">
      <img src="/logo.png" alt="Logo" className="md-custom-md:w-9 md-custom-md:h-auto md-custom-md:pr-2 md-custom-xsm:w-7 md-custom-xsm:h-auto md-custom-xsm:pr-2 logo inline-block"/>
      <button className="text-[#E3B89F] md-custom-md:text-3xl md-custom-sm:text-xl md-custom-xsm:text-lg border-none bg-white font-bold cursor-pointer inline-block">RoomieManager</button>
    </div>
    <div>
      <Link href="/Authentication/Login">
        <button className="py-2 md-custom-md:px-4 md-custom-md:ml-2.5 border-none rounded cursor-pointer md-custom-md:text-sm md-custom-md:mr-2.5 md-custom-sm:px-3 md-custom-sm:ml-2 md-custom-sm:text-sm md-custom-sm:mr-0.5 md-custom-xsm:px-1 md-custom-xsm:ml-0.5 md-custom-xsm:text-sm md-custom-xsm:mr-0 bg-[#BC8D0B] text-white hover:bg-[#7d5e07]">Login</button>
      </Link>
      <Link href="/Authentication/Signup">
        <button className="py-2 md-custom-md:px-4 md-custom-md:ml-2.5 border-none rounded cursor-pointer md-custom-md:text-sm md-custom-md:mr-2.5 md-custom-sm:px-3 md-custom-sm:ml-2 md-custom-sm:text-sm md-custom-sm:mr-0.5 md-custom-xsm:px-1 md-custom-xsm:ml-0.5 md-custom-xsm:text-sm md-custom-xsm:mr-0 bg-[#BC8D0B] text-white hover:bg-[#7d5e07]">Register</button>
      </Link>
    </div>
  </div>

  {/* Hero Section */}
  <div className="bg-[#f3f3f2] flex md-custom-xsm:flex-col md-custom-md:flex-row">
    <div className="bg-[#F0CAB3] my-3 ml-3 rounded-md flex flex-col items-center justify-center">
      <p className="text-[#BC8D0B] pt-5 mt-3 text-2xl mx-2 font-bold font-acme">Where harmony meets household-</p>
      <p className="text-[#BC8D0B] text-2xl mx-2 font-bold font-acme">simplifying life for roommates!</p>
      <p className="text-[#BC8D0B] text-lg mt-7 mx-2 font-julee">Manage chores, expenses, and decisions effortlessly under one roof!</p>
      <Link href="/Authentication/Signup"><button className="bg-[#BC8D0B] text-white hover:bg-[#7d5e07] py-1.5 px-2 rounded my-5">Get Started!</button></Link>
    </div>
    <img src="/hero_pic.jpg" alt="Roommates image" className="h-auto md-custom-md:w-3/5 md-custom-xsm:full"/>
  </div>

  {/* Features */}
  <div className="grid md-custom-sm:grid-cols-2 md-custom-sm:grid-rows-2 my-4 md-custom-sm:mx-2 gap-x-1 gap-y-1">
    <div className="bg-[#E5D3A0] rounded-md md-custom-md:p-9 md-custom-sm:py-11">
      <div className="flex flex-row items-center">
        <img src="/feature1.gif" alt="gif here" className="md-custom-lg:w-48 h-auto inline-block md-custom-md:w-32 md-custom-sm:w-24 md-custom-xsm:w-40 md-custom-xsm:mr-5 self-center"/>
        <p className="font-acme inline-block md-custom-md:text-lg md-custom-sm:text-md">Automated Expense Splitting and Payment Tracking</p>
      </div>
      <div className="font-julee flex justify-center mt-8">No more awkward math-split, pay, done!</div>
    </div>
    <div className="bg-[#EFD5C5] rounded-md md-custom-md:p-9 md-custom-sm:py-11">
      <div className="flex flex-row items-center">
        <img src="/feature2.gif" alt="gif here" className="md-custom-lg:w-48 h-auto inline-block md-custom-md:w-32 md-custom-sm:w-24 md-custom-xsm:w-40 md-custom-xsm:mr-5 self-center"/>
        <p className="font-acme inline-block md-custom-md:text-lg md-custom-sm:text-md">Chore Scheduling and Automated Reminders</p>
      </div>
      <div className="font-julee flex justify-center mt-8">Turning chore wars into chore peace!</div>
    </div>
    <div className="bg-[#EFD5C5] rounded-md md-custom-md:p-9 md-custom-sm:py-11">
      <div className="flex flex-row items-center">
        <p className="font-acme inline-block md-custom-md:text-lg md-custom-sm:text-md">Real-time Updates and Visualization of Shared Costs</p>
        <img src="/feature3.gif" alt="gif here" className="md-custom-lg:w-48 h-auto inline-block md-custom-md:w-32 md-custom-sm:w-24 md-custom-xsm:w-40 md-custom-xsm:ml-5 self-center"/>
      </div>
      <div className="font-julee flex justify-center mt-8">See it. Split it. Solve it.</div>
    </div>
    <div className="bg-[#E5D3A0] rounded-md md-custom-md:p-9 md-custom-sm:py-11">
      <div className="flex flex-row items-center">
        <p className="font-acme inline-block md-custom-md:text-lg md-custom-sm:text-md">Voting Polls for Household Decisions</p>
        <img src="/feature4.gif" alt="gif here" className="md-custom-lg:w-48 h-auto inline-block md-custom-md:w-32 md-custom-sm:w-24 md-custom-xsm:w-40 md-custom-xsm:ml-5 self-center"/>
      </div>
      <div className="font-julee flex justify-center mt-8">Roommate democracy made simple.</div>
    </div>
  </div>
  
  {/* End */}
  <div className="flex justify-center flex-col items-center my-14">
    <p className=" font-abeezee text-[#BC8D0B] text-3xl ">Ready to make roommate life a breeze?</p>
    <div>
      <Link href="/Authentication/Signup"><button className="bg-[#BC8D0B] text-white hover:bg-[#7d5e07] py-1.5 px-2 rounded my-5 mx-5">Sign Up for Free</button></Link>
      <button>Learn More!</button>
    </div>
  </div>

  {/* Footer */}
  <div className="bg-[#f3f3f2] grid grid-cols-3 font-inter px-5 py-4">
    <div>
      <p className="text-[#4A4545] mb-3">Quick Links</p>
      <ul className="text-[#837C7C]">
        <li>Home</li>
        <li>Features</li>
        <li>About</li>
        <li>Blog</li>
        <li>Support</li>
      </ul>
    </div>
    <div>
      <p className="text-[#4A4545] mb-3">Contact Information</p>
      <ul className="text-[#837C7C]">
        <li>Email</li>
        <li>LinkedIn</li>
        <li>Instagram</li>
        <li>Facebook</li>
      </ul>
    </div>
    <div className="flex justify-center items-center">
      <p className="text-[#4A4545]">Copyright Notice</p>
    </div>
  </div>
  </>
  );
}
