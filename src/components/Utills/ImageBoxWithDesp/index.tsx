import { CustomStack } from "components/CustomTags";
import ImageBox from "../ImageBox";
import StyledTypographyBox from "../StyledTypographyBox";
interface IProps {
  src: string;
  comment: string;
  TaskDetails?: boolean;
  handleClick: () => void;
  isCommentcard?: boolean;
}

export default function ImageBoxWithDesp({
  src,
  comment,
  handleClick,
  TaskDetails,
  isCommentcard,
}: IProps) {
  return (
    <CustomStack sx={{ alignItems: "flex-start" }}>
      <ImageBox
        isCommentcard={isCommentcard}
        TaskDetails={TaskDetails}
        src={src}
        handleClick={handleClick}
        type="imageWithDesp"
      />
      <StyledTypographyBox text={comment} />
    </CustomStack>
  );
}
