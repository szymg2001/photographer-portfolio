import { FolderI } from "@/lib/firebaseTypes";
import Link from "next/link";

interface ControlFolderI {
  data: FolderI;
}

export default function ControlFolder({ data }: ControlFolderI) {
  return (
    <div className="control-folder">
      <div className="control-folder__head">
        <p className="control-folder__name">{data.name}</p>
        <Link className="control__link" href={`control/edit/${data.id}`}>
          Edytuj
        </Link>
        <span className="control__link">Usuń</span>
      </div>
      <p className="control-folder__description">{data.description}</p>
      <p className="control-folder__info">
        Wyodrębniony w portfolio:{" "}
        <span className="control-folder__info__mark">
          {data.showInPortfolio ? "Tak" : "Nie"}
        </span>
      </p>
      <p className="control-folder__info">
        Folder publiczny {`(Widoczny np. w ostatnich folderach)`}:{" "}
        <span className="control-folder__info__mark">
          {data.public ? "Tak" : "Nie"}
        </span>
      </p>
      <p className="control-folder__info">
        Liczba zdjęć:{" "}
        <span className="control-folder__info__mark">
          {`${data.images.length}${data.imgLimit ? `/${data.imgLimit}` : ""}`}
        </span>
      </p>
    </div>
  );
}
