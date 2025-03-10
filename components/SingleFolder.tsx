import { FolderI } from "@/lib/firebaseTypes";
import { useAppContext } from "@/lib/AppContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "@/styles/folder.css";

export default function SingleFolder({ folder }: { folder: FolderI }) {
  const router = useRouter();
  const { getFolderCover } = useAppContext();

  return (
    <div key={folder.id} className="folder">
      <Image
        src={getFolderCover(folder.id)}
        className="folder__cover"
        alt={`${folder.name} folder cover`}
        width={600}
        height={600}
      />
      <div className="folder__head">
        <p className="folder__name">{folder.name}</p>
        <button
          className="folder__view-button"
          onClick={() => {
            router.push(`./folder/${folder.id}`);
          }}
        >
          Zobacz
        </button>
      </div>
    </div>
  );
}
