"use client";

import ControlForm from "@/components/control/ControlForm";
import ControlInput from "@/components/control/ControlInput";
import ControlSubpage from "@/components/control/subpage/ControlSubpage";
import { useAppContext } from "@/lib/AppContext";
import { FolderI, ImgI, initialFolderData } from "@/lib/firebaseTypes";
import React, { use } from "react";
import "@/styles/control/folder-form.css";
import ControlSection from "@/components/control/ControlSection";

interface ParamsI {
  id: string;
}

export default function ControlFolderPage({
  params,
}: {
  params: Promise<ParamsI>;
}) {
  const { folders, getImages, imgs } = useAppContext();
  const { id } = use(params);

  const [initialData, setInitialData] = React.useState(() => {
    let findFolder: FolderI | undefined = folders.find((el) => el.id === id);

    return findFolder ? findFolder : initialFolderData;
  });

  const photos: ImgI[] = React.useMemo(
    () => (initialData ? getImages(initialData.images) : []),
    [id, initialData.images]
  );

  const handleSubmit = (formData: typeof initialData) => {
    //submit new folder or update
    //add initialData photos
    formData.images = initialData.images;
  };

  const togglePhoto = (imgId: string) => {
    if (!initialData) return;

    const updatedImages = initialData.images.includes(imgId)
      ? initialData.images.filter((i) => i !== imgId)
      : [...initialData.images, imgId];

    setInitialData({ ...initialData, images: updatedImages });
  };

  return (
    <ControlSubpage
      title={initialData.id ? "Edycja folderu" : "Tworzenie nowego folderu"}
    >
      <div className="form-folder-wrapper">
        <ControlForm onSubmit={handleSubmit} initialValue={initialData}>
          {({ handleChange }) => (
            <>
              <ControlInput
                id="folder-form__name"
                onChange={(v) => handleChange("name", v)}
                label="Nazwa folderu"
                required={true}
                defaultValue={initialData.name}
              />
              <ControlInput
                id="folder-form__description"
                onChange={(v) => handleChange("description", v)}
                label="Opis folderu"
                defaultValue={initialData.description}
              />
              <ControlInput
                id="folder-form__date"
                onChange={(v) => handleChange("photoDate", v)}
                label="Data / okres robienia zdjęć"
                type="date"
                defaultValue={initialData.photoDate}
              />
              <ControlInput
                id="folder-form__public"
                onChange={(v) => handleChange("public", v)}
                label="Folder publiczny"
                type="checkbox"
                defaultChecked={initialData.public}
              />
              <ControlInput
                id="folder-form__portfolio"
                onChange={(v) => handleChange("showInPortfolio", v)}
                label="Wyodrębnij w portfolio"
                type="checkbox"
                defaultChecked={initialData.showInPortfolio}
              />
              <ControlSection title="Zdjęcia">
                <div className="folder-form__photos">
                  {photos.map((p) => (
                    <img
                      src={p.url}
                      alt={p.id}
                      key={p.id}
                      className="folder-form__image"
                    />
                  ))}
                </div>
                <ControlSection title="Wybierz zdjęcia">
                  <div className="folder-form__manage-photos">
                    {imgs.map((p) => (
                      <div
                        key={p.id}
                        className="folder-form__manage-photo-wrapper"
                        onClick={() => togglePhoto(p.id)}
                      >
                        {photos.some((p2) => p2.id === p.id) ? (
                          <div className="folder-form__remove-hover">
                            Usuń <img src="/remove.svg" />
                          </div>
                        ) : (
                          <div className="folder-form__add-hover">
                            Dodaj
                            <img src="/add.svg" />
                          </div>
                        )}
                        <img
                          src={p.url}
                          alt={p.id}
                          key={p.id}
                          className={`folder-form__image`}
                        />
                      </div>
                    ))}
                  </div>
                </ControlSection>
              </ControlSection>
            </>
          )}
        </ControlForm>
      </div>
    </ControlSubpage>
  );
}
