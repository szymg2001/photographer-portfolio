import "../styles/arrownav.css";

export default function ArrowNav({
  onClick,
  classname = "",
  buttonClassname = "",
}: {
  onClick: (direction: -1 | 1) => void;
  classname?: string;
  buttonClassname?: string;
}) {
  return (
    <div className={`arrow__nav ${classname}`}>
      <svg
        fill="currentColor"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 511.641 511.641"
        xmlSpace="preserve"
        stroke="currentColor"
        className="arrow__nav-button"
        onClick={() => onClick(-1)}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g>
            {" "}
            <g>
              {" "}
              <path d="M148.32,255.76L386.08,18c4.053-4.267,3.947-10.987-0.213-15.04c-4.16-3.947-10.667-3.947-14.827,0L125.707,248.293 c-4.16,4.16-4.16,10.88,0,15.04L371.04,508.667c4.267,4.053,10.987,3.947,15.04-0.213c3.947-4.16,3.947-10.667,0-14.827 L148.32,255.76z"></path>{" "}
            </g>{" "}
          </g>{" "}
        </g>
      </svg>
      <svg
        fill="currentColor"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 511.641 511.641"
        xmlSpace="preserve"
        transform="matrix(-1, 0, 0, 1, 0, 0)"
        stroke="currentColor"
        onClick={() => onClick(1)}
        className="arrow__nav-button"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g>
            {" "}
            <g>
              {" "}
              <path d="M148.32,255.76L386.08,18c4.053-4.267,3.947-10.987-0.213-15.04c-4.16-3.947-10.667-3.947-14.827,0L125.707,248.293 c-4.16,4.16-4.16,10.88,0,15.04L371.04,508.667c4.267,4.053,10.987,3.947,15.04-0.213c3.947-4.16,3.947-10.667,0-14.827 L148.32,255.76z"></path>{" "}
            </g>{" "}
          </g>{" "}
        </g>
      </svg>
    </div>
  );
}
