import Lottie from "lottie-react";
import searchEmployees from "./animations/search for employee.json";
const Searching = ({ className }: { className?: string }) => {
  return (
    <Lottie animationData={searchEmployees} loop={true} className={className} />
  );
};

export default Searching;
