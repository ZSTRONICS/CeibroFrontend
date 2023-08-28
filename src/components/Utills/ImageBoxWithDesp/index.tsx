import { CustomStack } from "components/CustomTags";
import ImageBox from "../ImageBox";
import StyledTypographyBox from "../StyledTypographyBox";
interface IProps {
  src: string;
  comment: string;
}

export default function ImageBoxWithDesp({ src, comment }: IProps) {
  return (
    <CustomStack>
      <ImageBox src={src} />
      <StyledTypographyBox text={comment} />
    </CustomStack>
  );
}
