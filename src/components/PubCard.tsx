type PubProps = {
  name: string;
  pic: string;
  day: string;
  address: string;
  area: string;
  variant?: "small" | "large";
};

export default function PubCard({
  name,
  pic,
  day,
  address,
  area,
  variant = "large",
}: PubProps) {
  const isSmall = variant === "small";

  switch (day) {
    case "mon":
      day = "Monday";
      break;
    case "tue":
      day = "Tuesday";
      break;
    case "wed":
      day = "Wednesday";
      break;
    case "thu":
      day = "Thursday";
      break;
    case "fri":
      day = "Friday";
      break;
    case "sat":
      day = "Saturday";
      break;
    case "sun":
      day = "Sunday";
      break;
  }
  const addressLine = address.split(",");
  return (
    <div
      className={`relative group cursor-pointer overflow-hidden duration-500  bg-beige text-black p-5 border-4 border-teal rounded-3xl ${
        isSmall ? "w-64 h-32" : "w-64 h-auto"
      }`}
    >
      <div className="bg-tomato">
        <div
          className={`hover:scale-110  bg-teal duration-500 ${
            isSmall ? "w-full h-24" : "w-48 h-60"
          }`}
        >
          <img
            src={pic}
            className={` object-cover ${isSmall ? "w-full h-24" : "w-48 h-60"}`}
          ></img>
        </div>
        <div className="absolute w-56 left-0 p-5 -bottom-16 duration-500 hover:-translate-y-12 hover:bg-cream/70">
          <div className="absolute -z-10 left-0 w-64 h-16 opacity-0 duration-500 hover:bg-cream/70"></div>
          <span className="text-xl font-bold text-bark bg-cream/70 p-1">
            {name}
          </span>
          <span className="hover:opacity-100 w-64 h-24 duration-500 opacity-0 text-bark p-5">
            <br />
            Day: {day}
            <br />
            Address: {addressLine[0]}
            <br />
            Click for more info!
          </span>
        </div>
      </div>
    </div>
  );
}
