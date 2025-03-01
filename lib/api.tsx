import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { auth, db, storage } from "./firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { AppContextPropI, FolderI, ImgI, SettingsI } from "./firebaseTypes";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export async function fetchFirebaseData() {
  let data: AppContextPropI = {
    folders: [],
    imgs: [],
    settings: { portfolioOrder: [] },
  };
  try {
    const [folders, settings, imgs] = await Promise.all([
      fetchFolders(),
      fetchSettings(),
      fetchImgs(),
    ]);

    data = { folders, settings, imgs };
    return {
      data,
    };
  } catch (error) {
    return { data };
  }
}

async function fetchFolders(): Promise<FolderI[]> {
  const foldersCollectionRef = collection(db, "folders");

  try {
    const q = query(foldersCollectionRef, orderBy("photoDate", "desc"));
    const queryFolders = await getDocs(q);
    const folders = queryFolders.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as FolderI[];

    return folders;
  } catch (error) {
    throw error;
  }
}

async function fetchSettings(): Promise<SettingsI> {
  const settingsCollectionRef = collection(db, "settings");
  try {
    const query = await getDocs(settingsCollectionRef);
    const settings = query.docs.map((d) => ({ ...d.data() }))[0] as SettingsI;

    return settings;
  } catch (error) {
    throw error;
  }
}

export function extractToken(url: string): string {
  const tokenMatch = url.match(/[?&]token=([^&]+)/);
  return tokenMatch ? tokenMatch[1] : "";
}
async function fetchImgs(): Promise<ImgI[]> {
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

export async function login(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    console.error("Błąd logowania: ", error);
    throw error;
  }
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Błąd wylogowania:", error);
  }
}
