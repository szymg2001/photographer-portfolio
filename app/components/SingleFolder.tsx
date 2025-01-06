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
      <Image
        src={getCover(folder)}
        className="folder__cover"
        alt={`${folder.name} folder cover`}
        width={325}
        height={325}
      />
      <div className="folder__head">
        <p className="folder__name">{folder.name}</p>
        <button className="folder__view-button">Zobacz</button>
      </div>
    </div>
  );
}
