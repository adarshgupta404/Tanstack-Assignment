import Lottie from "lottie-react";
import error from "./animations/Error.json";
const Error = ({ className }: { className?: string }) => {
  return (
    <Lottie animationData={error} loop={true} className={className} />
  );
};

export default Error;
