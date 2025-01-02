import { FolderI } from "@/lib/firebaseTypes";
import CornerBox from "./CornerBox";
import { useAppContext } from "@/lib/AppContext";
import "../styles/folder.css";
import Image from "next/image";

export default function SingleFolder({ folder }: { folder: FolderI }) {
  const { getImages } = useAppContext();
  const getCover = (folder: FolderI): string =>
    folder.coverId
      ? getImages([folder.coverId])[0].url
      : getImages(folder.images)[0].url;

  return (
    <div key={folder.id} className="folder">
      <CornerBox color="white" corners={["lb"]}>
        <div className="folder__content">
          <div className="folder__top">
            <p className="folder__date">{folder.createdAt}</p>
            <div className="folder__top-line" />
          </div>
          <Image
            src={getCover(folder)}
            className="folder__cover"
            alt={`${folder.name} folder cover`}
            width={450}
            height={450}
          />
          <p className="folder__title">{folder.name}</p>
          <p className="folder__length">{folder.images.length} photos</p>
          <p className="folder__description">{folder.description}</p>
        </div>
      </CornerBox>
    </div>
  );
}
