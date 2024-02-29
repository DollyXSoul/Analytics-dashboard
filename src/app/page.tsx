import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
      <div className=" font-bold py-36 text-center space-y-4 ">
        <div className="text-4xl space-y-5 font-extrabold">
          <h1>Get analytics for this website</h1>
        </div>

        <div>
          <Link href="/analytics">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-xl hover:cursor-pointer">
              Go to dashboard
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
