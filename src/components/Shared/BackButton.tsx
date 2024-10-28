import { BiArrowFromRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const BackButton = ({ color }: { color?: boolean }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div
      onClick={handleBackClick}
      className={`flex items-center cursor-pointer ${color && "text-white"}`}
    >
      <BiArrowFromRight className="mr-2" />
      <span>Back</span>
    </div>
  );
};

export default BackButton;
