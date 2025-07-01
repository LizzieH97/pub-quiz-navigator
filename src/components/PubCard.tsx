type PubProps = {
  name: string;
  pic: string;
  day: string;
  address: string;
  area: string;
};

export default function PubCard({ name, pic, day, address, area }: PubProps) {
  return (
    <div className="relative group cursor-pointer overflow-hidden duration-500 w-64 h-auto bg-beige text-black p-5">
      <div className="bg-tomato">
        <div className="group-hover:scale-110 w-full h-24 bg-teal duration-500">
          <img src={pic} className="w-full h-24 object-cover"></img>
        </div>
        <div className="absolute w-56 left-0 p-5 -bottom-16 duration-500 group-hover:-translate-y-12">
          <div className="absolute -z-10 left-0 w-64 h-28 opacity-0 duration-500 group-hover:opacity-70 group-hover:bg-cream"></div>
          <span className="text-xl font-bold bg-cream/70 p-3">{name}</span>
          <p className="group-hover:opacity-100 w-56 duration-500 opacity-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
    </div>
  );
}
