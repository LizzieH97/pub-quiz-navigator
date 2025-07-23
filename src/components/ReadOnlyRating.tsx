type ReadOnlyRatingProps = {
  rating: number;
  size?: "sm" | "md" | "lg";
};

export default function ReadOnlyRating({
  rating,
  size = "md",
}: ReadOnlyRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const starNumber = i + 1;

    const isFull = rating >= starNumber;
    const isHalf = rating >= starNumber - 0.5 && rating < starNumber;

    return (
      <div
        key={i}
        className={`mask mask-star bg-teal ${
          isFull ? "" : isHalf ? "opacity-50" : "opacity-20"
        } ${getSizeClass(size)}`}
        aria-label={`${starNumber} star`}
        aria-current={rating === starNumber ? "true" : undefined}
      ></div>
    );
  });

  return <div className="rating m-0 p-0">{stars}</div>;
}

function getSizeClass(size: "sm" | "md" | "lg") {
  switch (size) {
    case "sm":
      return "w-3 h-3 p-0 m-0";
    case "lg":
      return "w-6 h-6 p-0 m-0";
    default:
      return "w-5 h-5 p-0 m-0";
  }
}
