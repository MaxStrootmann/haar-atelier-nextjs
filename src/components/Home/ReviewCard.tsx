import { ReviewSchema } from "lib/interfaces";
import urlFor from "lib/sanity/urlFor";
import Image from "next/image";

interface ReviewCardProps {
  review: ReviewSchema;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
   <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center px-8 pb-16 pt-8 md:px-32 md:py-16">
    <div className="relative w-3/4 h-64 md:h-[24rem] mb-3 md:w-1/2">
      <Image
      src={urlFor(review.foto).url()}
      alt={review.name}
      fill={true}
      style={{ objectPosition: "center", objectFit: "cover" }}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
       />
    </div>
    <div className="space-y-4 w-[70%] md:w-1/2 text-sm md:text-base">
    {review?.inhoud && (
          <div className="font-serif">
            <div className="space-y-4 text-center">
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
      <p className="font-bold text-center text-xs md:text-sm">{review.name}</p>
    </div>
   </div>
  )
};

export default ReviewCard;