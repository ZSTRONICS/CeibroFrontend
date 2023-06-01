import ImgCard from "components/Auth/Register/ImgCard";
import React from "react";
interface IProps {
  url: string;
  cardContent: React.ReactNode;
  locationTitle:string
}

function LocationCard(props: IProps) {
  const { cardContent, url,locationTitle } = props;
  let url1 =
    "https://www.researchgate.net/publication/4744098/figure/fig1/AS:670007889506317@1536753737708/Building-Location-Map-The-map-shows-the-5-buildings-the-83-wall-segments-and-the-11.pbm";

  return (
    <>
      <ImgCard
        imgSrc={url1}
        title={locationTitle}
        showCancelBtn={false}
        cardContent={cardContent}
        showSkeleton={true}

      />
    </>
  );
}

export default LocationCard;
