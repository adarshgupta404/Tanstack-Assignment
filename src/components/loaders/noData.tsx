import Lottie from "lottie-react";
import nodata from "./animations/No-Data.json";
const Nodata = ({ className }: { className?: string }) => {
  return (
    <Lottie animationData={nodata} loop={true} className={className} />
  );
};

export default Nodata;
