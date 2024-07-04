interface BookProps {
  inNavBar: Boolean;
}

export default function Book({ inNavBar }: BookProps) {
  return (
    <div className="pb-1 mr-0.5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={21}
        height={21}
        fill="none"
        className={`${inNavBar && "scale-125"}`}
      >
        <g fill="#fff" clipPath="url(#a)">
          <path d="M4.11 3.962a1.537 1.537 0 0 1-.452-1.092c0-.429.172-.811.452-1.093.282-.28.664-.452 1.093-.452h12.801V0H5.203a2.87 2.87 0 0 0-2.87 2.87v15.26A2.87 2.87 0 0 0 5.204 21h13.463V4.414H5.203c-.429 0-.81-.171-1.093-.452Zm2.67 1.777h10.562v13.936H6.78V5.74Z" />
          <path d="M5.896 2.302a.568.568 0 0 0 0 1.135h12.77V2.302H5.896Z" />
        </g>
        <defs>
          <clipPath id="abc">
            <path fill="#fff" d="M0 0h21v21H0z" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
