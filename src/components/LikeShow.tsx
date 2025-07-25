import { useOnePub } from "@/hooks/useOnePub";
type LikeShowProps = {
  id: number;
};
export default function LikeShow({ id }: LikeShowProps) {
  const { onePub } = useOnePub(id);
  const count = onePub?.fav_count ?? 0;
  return (
    <div className="bg-teal h-8 w-12 rounded-3xl text-cream flex flex-row items-center justify-around text-lg ml-1 p-1 ">
      <img src="/star.png" className="w-6 h-6"></img>
      {count}
    </div>
  );
}
