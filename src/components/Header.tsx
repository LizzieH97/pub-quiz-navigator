export default function Header() {
  return (
    <div className="relative w-full h-40">
      <img
        src="/background.png"
        className="absolute inset-0 w-full h-full object-cover opacity-50 rounded-3xl z-0"
        alt="background"
      />

      <div className="relative bg-black/30 w-full h-full flex items-center justify-center rounded-3xl z-10">
        <h1 className="text-white text-6xl tracking-wide font-bold z-20">
          Pub Quiz Navigator
        </h1>
      </div>
    </div>
  );
}
