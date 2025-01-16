"use client";

import Heading from "@/components/Heading";
import { useAppContext } from "@/lib/AppContext";
import Link from "next/link";
import React, { use } from "react";

export default function FolderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { findFolder } = useAppContext();
  const { id } = use(params);

  const folder = React.useMemo(() => findFolder(id), [id]);

  if (!folder) {
    return (
      <div className="folder-page">
        <p className="folder-page__not-found">Nie znaleziono folderu</p>;
        <Link href="/">Wróć</Link>
      </div>
    );
  }

  return (
    <div className="folder-page">
      <Heading value={folder.name} />
    </div>
  );
}
