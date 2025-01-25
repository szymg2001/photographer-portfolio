"use client";

import { useAppContext } from "@/lib/AppContext";
import { FolderFormI, FolderI, ImgI } from "@/lib/firebaseTypes";
import React, { use } from "react";
import ControlFolderForm from "@/components/control/ControlFolderForm";
import ControlSection from "@/components/control/ControlSection";
import "@/styles/control/edit.css";
import { useRouter } from "next/navigation";

interface ParamsI {
  id: string;
}

export default function Edit({ params }: { params: Promise<ParamsI> }) {
  const { folders, imgs, getImages, editFolder } = useAppContext();
  const { id } = use(params);
  const router = useRouter();

  const [data, setData] = React.useState<FolderI | null>(null);
  const photos: ImgI[] = React.useMemo(
    () => (data ? getImages(data.images) : []),
    [id, data?.images]
  );
  const [editPhotos, setEditPhotos] = React.useState(false);

  const handleSubmitEdit = async (d: FolderFormI) => {
    if (!data) return;

    let editedData: FolderI = { ...d, images: data.images, id: data.id };
    await editFolder(editedData);
    router.push(`/control`);
  };

  const togglePhoto = (imgId: string) => {
    if (!data) return;

    const updatedImages = data.images.includes(imgId)
      ? data.images.filter((i) => i !== imgId)
      : [...data.images, imgId];

    setData({ ...data, images: updatedImages });
  };

  React.useEffect(() => {
    let folderIndex = folders.findIndex((f) => f.id === id);
    folderIndex !== -1 && setData({ ...folders[folderIndex] });
  }, [id]);

  return (
    <div className="edit">
      <div className="edit__head">
        <p className="edit__heading">
          Edytowanie folderu:{" "}
          <span className="edit__folder-name">{data?.name}</span>
        </p>
      </div>
      {data ? (
        <>
          <ControlFolderForm
            data={data}
            onSubmit={(data) => handleSubmitEdit(data)}
            onCancel={() => router.push("/control")}
          />
          <ControlSection title="Zdjęcia">
            <div
              className={`edit__photos__wrapper ${
                editPhotos ? "--editingPhotoList" : ""
              }`}
            >
              <div className="edit__photos__menu">
                <span
                  className="control__link"
                  onClick={() => setEditPhotos((prev) => !prev)}
                >
                  Edytuj
                </span>
              </div>
              <div className="edit__photos-list">
                {photos.map((p) => (
                  <img
                    src={p.url}
                    alt={p.id}
                    key={p.id}
                    className="control__image edit__image"
                  />
                ))}
              </div>
              <div className="edit__photos-add">
                {imgs.map((p) => (
                  <div
                    key={p.id}
                    className="edit__photos-add__wrapper"
                    onClick={() => togglePhoto(p.id)}
                  >
                    {photos.some((p2) => p2.id === p.id) ? (
                      <div className="edit__photos-add__remove-hover">
                        Usuń <img src="/remove.svg" />
                      </div>
                    ) : (
                      <div className="edit__photos-add__add-hover">
                        Dodaj
                        <img src="/add.svg" />
                      </div>
                    )}
                    <img
                      src={p.url}
                      alt={p.id}
                      key={p.id}
                      className={`control__image edit__image`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </ControlSection>
        </>
      ) : (
        <p>"waiting for data"</p>
      )}
    </div>
  );
}
