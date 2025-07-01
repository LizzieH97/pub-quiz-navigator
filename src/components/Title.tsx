export default function Title() {
  return (
    <div className="relative w-full h-80 border-8 border-teal">
      <img
        src="/blackboard.png"
        className="absolute inset-0 w-full h-full object-cover opacity-90 z-0"
        alt="background"
      />

      <div className="relative bg-black/30 w-full h-full flex items-center justify-center rounded-2xl z-10">
        <h1 className="text-white text-6xl tracking-wide font-bold z-20 bg-black rounded-3xl px-4 py-2 w-64">
          Pub Quiz Navigator
        </h1>
      </div>
    </div>
  );
}
