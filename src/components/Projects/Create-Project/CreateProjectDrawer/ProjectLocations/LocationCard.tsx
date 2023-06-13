import ImgCard from "components/Auth/Register/ImgCard";
import React from "react";
interface IProps {
  url: string;
  cardContent: React.ReactNode;
  locationTitle: string;
}

function LocationCard(props: IProps) {
  const { cardContent, url, locationTitle } = props;
  return (
    <>
      <ImgCard
        imgSrc={url}
        title={locationTitle}
        showCancelBtn={false}
        cardContent={cardContent}
        showSkeleton={true}
        isBase64String={true}
      />
    </>
  );
}

export default LocationCard;
