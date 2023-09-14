import {
  Carousel,
  IconButton,
  IconButtonProps,
} from "@material-tailwind/react";
import ReviewCard from "./ReviewCard";
import { ReviewSchema } from "lib/interfaces";

interface ReviewCarouselProps {
  reviews: ReviewSchema[];
}

type ExtendedIconButtonProps = IconButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const ReviewCarousel: React.FC<ReviewCarouselProps> = ({ reviews }) => {
  return (
    <div className="text-center py-8  lg:px-16 xl:px-28 2xl:px-64">
      <h2 className="text-4xl md:text-6xl">Reviews</h2>
      <Carousel
        onResizeCapture={() => {}}
        onResize={() => {}}
        nonce=""
        className="rounded-xl"
        prevArrow={({ handlePrev }) => (
          <IconButton
            onResizeCapture={() => {}}
            onResize={() => {}}
            nonce=""
            variant="outlined"
            color="white"
            size="md"
            onClick={handlePrev}
            className="!absolute top-[65%] md:top-2/4 left-4 md:left-8 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            onResizeCapture={() => {}}
            onResize={() => {}}
            nonce=""
            variant="outlined"
            color="white"
            size="md"
            onClick={handleNext}
            className="!absolute top-[65%] md:top-2/4 !right-4 md:!right-8 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </IconButton>
        )}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex items-end -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer transition-all content-[''] ${
                  activeIndex === i ? "w-16 h-2 bg-black" : "w-8 bg-black/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {reviews.map((review) => (
          <ReviewCard review={review} key={review._id} />
        ))}
      </Carousel>
    </div>
  );
};

export default ReviewCarousel;
