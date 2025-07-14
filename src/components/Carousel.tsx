import PubCard from "./PubCard";

type Pub = {
  name: string;
  pic: string;
  day: string;
  address: string;
  area: string;
  id: number;
  rating: number;
};

type CarouselProps = {
  pubs: Pub[];
};

export default function Carousel({ pubs }: CarouselProps) {
  const loopItems = [...pubs, ...pubs];

  return (
    <div className="relative w-full overflow-hidden group">
      <div className="flex w-max animate-scroll-left group-hover:[animation-play-state:paused]">
        {loopItems.map((pub, index) => (
          <div key={index} className="shrink-0 px-2">
            <PubCard
              name={pub.name}
              pic={pub.pic}
              day={pub.day}
              address={pub.address}
              area={pub.area}
              id={pub.id}
              variant="small"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
