import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "./firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";

export async function fetchFirebaseData() {
  try {
    const [folders, settings, imgs] = await Promise.all([
      fetchFolders(),
      fetchSettings(),
      fetchImgs(),
    ]);

    return {
      data: {
        folders,
        settings,
        imgs,
      },
    };
  } catch (error) {
    return { data: { error } };
  }
}

async function fetchFolders() {
  const foldersCollectionRef = collection(db, "folders");

  try {
    const query = await getDocs(foldersCollectionRef);
    const folders = query.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    return folders;
  } catch (error) {
    throw error;
  }
}

async function fetchSettings() {
  const settingsCollectionRef = collection(db, "settings");
  try {
    const query = await getDocs(settingsCollectionRef);
    const settings = query.docs.map((d) => ({ ...d.data() }))[0];

    return settings;
  } catch (error) {
    throw error;
  }
}

async function fetchImgs() {
  function extractToken(url: string): string {
    const tokenMatch = url.match(/[?&]token=([^&]+)/);
    return tokenMatch ? tokenMatch[1] : "";
  }

  try {
    const listRef = ref(storage, "files");
    const imgs = await listAll(listRef);

    const imgsList = await Promise.all(
      imgs.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return { url, id: extractToken(url) };
      })
    );

    return imgsList;
  } catch (error) {
    throw error;
  }
}
