"use client";

import { useAppContext } from "@/lib/AppContext";
import React from "react";

export default function ControlFileUpload() {
  const [selectedFiles, setSelectedFiles] = React.useState<FileList | null>(
    null
  );
  const [errorMessage, setErrorMessage] = React.useState<any>(null);

  const { uploadImages, isUploading } = useAppContext();

  const fileUploadRef = React.useRef<HTMLInputElement | null>(null);

  const handleUploadImg = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFiles) {
      try {
        await uploadImages(selectedFiles);
        setSelectedFiles(null);
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    }
    if (fileUploadRef.current) {
      fileUploadRef.current.value = "";
    }
  };

  const removeSelectedImage = (index: number) => {
    if (!fileUploadRef.current) return;
    const dt = new DataTransfer();
    const files = fileUploadRef.current.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (index !== i) {
        dt.items.add(file);
      }
    }

    fileUploadRef.current.files = dt.files;
    setSelectedFiles(dt.files);
  };

  if (isUploading) return <p>Przesyłanie zdjęć...</p>;

  return (
    <form onSubmit={handleUploadImg}>
      <div className="photo-input__hidden-input-wrapper">
        <input
          className="photo-input__hidden-input"
          type="file"
          multiple
          ref={fileUploadRef}
          onChange={(e) => {
            if (e.target.files) {
              setSelectedFiles(e.target.files);
            }
          }}
        />
      </div>
      <p className="photo-input__text">
        Wybierz zdjęcia, a następnie kliknij prześlij.
      </p>
      <button
        onClick={() => fileUploadRef.current?.click()}
        className="photo-input__button"
      >
        Przeglądaj
      </button>
      <button className="photo-input__button" type="submit">
        Prześlij
      </button>
      {selectedFiles && (
        <>
          <p className="photo-input__text-selected">
            Wybrane zdjęcia: {`(kliknij aby odznaczyć)`}
          </p>
          <div className="photo-input__preview-list">
            {Array.from(selectedFiles).map((sf) => (
              <img
                /* onClick={() => } */
                className="photo-input__preview-img"
                src={URL.createObjectURL(sf)}
              />
            ))}
          </div>
        </>
      )}
      <p className="error-message">{errorMessage}</p>
    </form>
  );
}
