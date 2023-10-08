import { ReviewSchema } from "lib/interfaces";
import urlFor from "lib/sanity/urlFor";
import Image from "next/image";

interface ReviewCardProps {
  review: ReviewSchema;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
   <div className="flex flex-col md:flex-row md:gap-8 items-center justify-center px-8 pb-12 pt-8 md:px-32 md:py-16">
    <div className="relative w-3/4 h-64 md:h-[24rem] md:w-1/2">
      <Image
      src={urlFor(review.foto).url()}
      alt={review.name}
      fill={true}
      loading="eager"
      style={{ objectPosition: "center", objectFit: "cover" }}
      sizes="(min-width: 1540px) calc(50vw - 400px), (min-width: 1280px) calc(50vw - 256px), (min-width: 1040px) calc(50vw - 208px), (min-width: 780px) calc(50vw - 144px), calc(75vw - 48px)" 
       />
    </div>
    <div className="space-y-4 w-[80%] md:w-1/2 text-sm md:text-base scroll-mask">
    {review?.inhoud && (
          <div className="font-serif">
            <div className="space-y-3 py-8 text-center h-56 px-2 overflow-y-auto custom-scrollbar sm:h-full ">
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
            <p className="font-bold text-center text-xs md:text-sm">{review.name}</p>
            </div>
          </div>
        )}
    </div>
   </div>
  )
};

export default ReviewCard;