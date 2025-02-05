"use client";

import { useAppContext } from "@/lib/AppContext";
import React from "react";

export default function ControlFileUpload() {
  const [selectedFiles, setSelectedFiles] = React.useState<FileList | null>(
    null
  );
  const [errorMessage, setErrorMessage] = React.useState<any>(null);

  const { uploadImages } = useAppContext();

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

  return (
    <form onSubmit={handleUploadImg}>
      <input
        type="file"
        multiple
        ref={fileUploadRef}
        onChange={(e) => {
          if (e.target.files) {
            setSelectedFiles(e.target.files);
          }
        }}
      />
      <button type="submit">Prześlij</button>
      <p className="error-message">{errorMessage}</p>
    </form>
  );
}
