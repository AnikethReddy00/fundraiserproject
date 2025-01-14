import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center h-[44vh] items-center text-white gap-4">
        <div className="font-bold text-5xl flex gap-2 items-center">Buy Me a Drink <span><img className="rounded-lg" src="/drink.gif" alt="" width={50} height={60} /></span></div>
        <p>
          A Crowdfunding platform to encourage Creators- Where Creators and fans fund Creators
        </p>
        <div>
          <Link href={"/Login"}>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Get Started
            </span>
          </button>
          </Link>
          <Link href={"/about"}>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Read More
            </span>
          </button>
          </Link>

        </div>

      </div>
      <div className="bg-white h-1 opacity-10">

      </div>
      <div className=" container mx-auto py-16" > 
        <h1 className="text-2xl text-white font-bold text-center mb-16">Your fans can buy you a Drink</h1>
        <div className="flex gap-5 justify-around mb-8 mt-4 text-white">
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img width={88} src="/fund.png" alt="" className="rounded-full "/>
            <p className="font-bold">Fund Yourself</p>
            <p className="font-bold">You can fund your own project</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img width={88} src="/coin.gif" alt="" className="rounded-full bg-slate-500 "/>
            <p className="font-bold">Fund Yourself</p>
            <p className="font-bold">You can fund your own project</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img width={88} src="/group1.gif" alt="" className="rounded-full "/>
            <p className="font-bold">Fans want to help</p>
            <p className="font-bold  text-center">Fans available can fund for your idea</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10 ">

      </div>
      <div className=" container mx-auto py-16 flex flex-col items-center justify-center" > 
        <h1 className="text-2xl text-white font-bold text-center mb-16">Learn More About Us</h1>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/6XlMguO9r-M?si=mptKP4nh7G_hLWuM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
      

    </>
  );
}
