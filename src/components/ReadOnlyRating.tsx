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
        className={`mask mask-star ${
          isFull
            ? "bg-teal"
            : isHalf
            ? "bg-teal opacity-50"
            : "bg-teal opacity-90"
        }`}
        aria-label={`${starNumber} star`}
        aria-current={rating === starNumber ? "true" : undefined}
      ></div>
    );
  });

  const sizeClass =
    size === "sm" ? "rating-sm" : size === "lg" ? "rating-lg" : "rating"; // default (md)

  return <div className={`${sizeClass}`}>{stars}</div>;
}
