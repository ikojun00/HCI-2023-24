import Link from "next/link";

export default function Navbar() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
            <div className="flex justify-between items-center w-full">
                <Link href="/">
                    <h1 className="text-xl font-bold">
                    📖 BookVoyage
                    </h1>
                </Link>
                <div className="flex justify-between gap-8">
                    <Link href="/discover">
                        <h2 className="text-l font-semibold hover:underline">
                            Discover
                        </h2>
                    </Link>
                    <Link href="/library">
                        <h2 className="text-l font-semibold hover:underline">
                            Library
                        </h2>
                    </Link>
                    <Link href="/about">
                        <h2 className="text-l font-semibold hover:underline">
                            About
                        </h2>
                    </Link>
                    <Link href="/signin">
                        <h2 className="text-l font-semibold hover:underline">
                            Sign In
                        </h2>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
