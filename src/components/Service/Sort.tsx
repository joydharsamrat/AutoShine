import { Dispatch, SetStateAction, useState } from "react";

type SortingComponentProps = {
  sortOrder: string;
  setSortOrder: Dispatch<SetStateAction<string>>;
  setSortLabel: Dispatch<SetStateAction<string>>;
  sortLabel: string;
};

const Sort: React.FC<SortingComponentProps> = ({
  sortOrder,
  setSortOrder,
  setSortLabel,
  sortLabel,
}) => {
  const [openSort, setOpenSort] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {/* Mobile View */}
      <div
        className="flex items-center gap-2 lg:hidden"
        onClick={() => setOpenSort(!openSort)}
      >
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_220_12174)">
            <path
              d="M2.5 15.5H7.5V13.8333H2.5V15.5ZM2.5 5.5V7.16667H17.5V5.5H2.5ZM2.5 11.3333H12.5V9.66667H2.5V11.3333Z"
              fill="#DADADA"
            />
          </g>
          <defs>
            <clipPath id="clip0_220_12174">
              <rect
                width="20"
                height="20"
                fill="white"
                transform="translate(0 0.5)"
              />
            </clipPath>
          </defs>
        </svg>
        <p>Sort By : {sortLabel}</p>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex items-center gap-2 text-sm">
        <p>Sort By:</p>
        <p
          className="cursor-pointer flex justify-between "
          onClick={() => setOpenSort(!openSort)}
        >
          <span>{sortLabel}</span> <span>{openSort ? "▵" : "▿"}</span>
        </p>
      </div>

      <div className={`optionsContainer ${openSort && "open"}`}>
        <div className="min-h-0 overflow-hidden flex flex-col text-sm">
          <label className="cursor-pointer">
            <input
              type="radio"
              name="sort"
              value="name-az"
              checked={sortOrder === "-price"}
              onChange={() => {
                setSortOrder("-price");
                setSortLabel("Price High To Low");
              }}
              className="mr-2"
            />
            Price High To Low
          </label>
          <label className="cursor-pointer">
            <input
              type="radio"
              name="sort"
              value="name-az"
              checked={sortOrder === "price"}
              onChange={() => {
                setSortOrder("price");
                setSortLabel("Price Low To High");
              }}
              className="mr-2"
            />
            Price Low To High
          </label>
          <label className="cursor-pointer">
            <input
              type="radio"
              name="sort"
              value="name-az"
              checked={sortOrder === "-duration"}
              onChange={() => {
                setSortOrder("-duration");
                setSortLabel("Duration High To Low");
              }}
              className="mr-2"
            />
            Duration High To Low
          </label>
          <label className="cursor-pointer">
            <input
              type="radio"
              name="sort"
              value="name-az"
              checked={sortOrder === "duration"}
              onChange={() => {
                setSortOrder("duration");
                setSortLabel("Duration Low To High");
              }}
              className="mr-2"
            />
            Duration Low To High
          </label>
        </div>
      </div>
    </div>
  );
};

export default Sort;
