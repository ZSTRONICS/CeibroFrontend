import { CustomStack } from "components/CustomTags";
import ImageBox from "../ImageBox";
import StyledTypographyBox from "../StyledTypographyBox";
interface IProps {
  src: string;
  comment: string;
  handleClick: () => void;
}

export default function ImageBoxWithDesp({
  src,
  comment,
  handleClick,
}: IProps) {
  return (
    <CustomStack>
      <ImageBox src={src} handleClick={handleClick} />
      <StyledTypographyBox text={comment} />
    </CustomStack>
  );
}
