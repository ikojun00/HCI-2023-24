import Link from "next/link";

export default function Navbar() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
            <div className="flex justify-between items-center w-full">
                <Link href="/">
                    <h1 className="text-xl font-bold text-white">
                    📖 BookVoyage
                    </h1>
                </Link>
                <div className="flex justify-between gap-8">
                    <Link href="/">
                        <h2 className="text-l font-semibold text-white hover:underline">
                            Discover
                        </h2>
                    </Link>
                    <Link href="/">
                        <h2 className="text-l font-semibold text-white hover:underline">
                            Library
                        </h2>
                    </Link>
                    <Link href="/">
                        <h2 className="text-l font-semibold text-white hover:underline">
                            About
                        </h2>
                    </Link>
                    <Link href="/">
                        <h2 className="text-l font-semibold text-white hover:underline">
                            Sign In
                        </h2>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
