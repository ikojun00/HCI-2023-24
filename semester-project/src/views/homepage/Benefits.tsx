import BulletPoint from "@/components/icons/BulletPoint";
import Image from "next/image";

export default function Benefits() {
  return (
    <div className="flex flex-col gap-16">
      <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl sm:text-2xl font-medium text">
            Keep track of your books like never before.
          </h2>
          <h3>
            BookVoyage is built to handle all libraries, from the smallest to
            the most complex. You can track:
          </h3>
          <ul>
            <li className="flex items-center">
              <BulletPoint />
              Your status for every book
            </li>
            <li className="flex items-center">
              <BulletPoint />
              Progress on your current book(s)
            </li>
            <li className="flex items-center">
              <BulletPoint />
              Your rating in star increments
            </li>
            <li className="flex items-center">
              <BulletPoint />
              Your review
            </li>
            <li className="flex items-center">
              <BulletPoint />
              Any number of lists for each book
            </li>
          </ul>
        </div>
        <div className="flex justify-end">
          <Image
            src="https://images.unsplash.com/photo-1558637845-c8b7ead71a3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8&w=1000&q=80"
            alt="Benefit 1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "auto", height: "80%" }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="flex justify-start">
          <Image
            src="https://images.unsplash.com/photo-1558637845-c8b7ead71a3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8&w=1000&q=80"
            alt="Benefit 1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "auto", height: "80%" }}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl sm:text-2xl font-medium text">
            Keep track of your books like never before.
          </h2>
          <h3>
            BookVoyage is built to handle all libraries, from the smallest to
            the most complex. You can track:
          </h3>
          <ul>
            <li className="flex items-center">
              <BulletPoint />
              Your status for every book
            </li>
            <li className="flex items-center">
              <BulletPoint />
              Progress on your current book(s)
            </li>
            <li className="flex items-center">
              <BulletPoint />
              Your rating in star increments
            </li>
            <li className="flex items-center">
              <BulletPoint />
              Your review
            </li>
            <li className="flex items-center">
              <BulletPoint />
              Any number of lists for each book
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
