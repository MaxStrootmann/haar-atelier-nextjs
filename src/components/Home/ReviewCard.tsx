import { ReviewSchema } from "lib/interfaces";
import urlFor from "lib/sanity/urlFor";
import Image from "next/image";

interface ReviewCardProps {
  review: ReviewSchema;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
   <div className="flex gap-8 w-[cals] items-center p-32">
    <div className="relative w-1/2">
      <Image
      src={urlFor(review.foto).url()}
      alt={review.name}
      width={500}
      height={500}
      layout="intrinsic" />
    </div>
    <div className="space-y-4 w-1/2">
    {review?.inhoud && (
          <div className="font-serif">
            <div className="space-y-4">
              {review.inhoud.map((block: any) => (
                <p key={block._key}>
                  {block.children.map((span: any) => {
                    if (span.marks.includes("em")) {
                      return <em key={span._key}>{span.text}</em>;
                    }
                    return span.text;
                  })}
                </p>
              ))}
            </div>
          </div>
        )}
      <p className="font-bold text-sm">{review.name}</p>
    </div>
   </div>
  )
};

export default ReviewCard;