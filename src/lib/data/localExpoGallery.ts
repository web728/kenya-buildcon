
import "server-only";

import { readdir } from "node:fs/promises";
import path from "node:path";

/* ==========================================
   EXPO IMAGE DIRECTORY
========================================== */

const EXPO_DIRECTORY = path.join(
  process.cwd(),
  "public",
  "expo"
);

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
]);

/* ==========================================
   TYPES
========================================== */

export type LocalExpoGalleryItem = {
  _id: string;
  imageUrl: string;
  title: string;
};

/* ==========================================
   READ IMAGES RECURSIVELY
========================================== */

async function collectImages(
  directory: string,
  relativeDirectory = ""
): Promise<string[]> {
  let entries;

  try {
    entries = await readdir(directory, {
      withFileTypes: true,
    });
  } catch (error) {
    const code = (
      error as NodeJS.ErrnoException
    ).code;

    // Folder does not exist yet.
    if (code === "ENOENT") {
      return [];
    }

    throw error;
  }

  const results = await Promise.all(
    entries.map(async (entry): Promise<string[]> => {
      // Avoid following symbolic links.
      if (entry.isSymbolicLink()) {
        return [];
      }

      const relativePath = path.posix.join(
        relativeDirectory,
        entry.name
      );

      const absolutePath = path.join(
        directory,
        entry.name
      );

      if (entry.isDirectory()) {
        return collectImages(
          absolutePath,
          relativePath
        );
      }

      if (!entry.isFile()) {
        return [];
      }

      const extension = path.extname(
        entry.name
      ).toLowerCase();

      if (!IMAGE_EXTENSIONS.has(extension)) {
        return [];
      }

      return [relativePath];
    })
  );

  return results.flat();
}

/* ==========================================
   PUBLIC IMAGE URL
========================================== */

function toPublicUrl(relativePath: string): string {
  const encodedPath = relativePath
    .split("/")
    .map((segment) =>
      encodeURIComponent(segment)
    )
    .join("/");

  return `/expo/${encodedPath}`;
}

/* ==========================================
   EXPORTED GALLERY LOADER
========================================== */

export async function getLocalExpoGalleryItems(): Promise<
  LocalExpoGalleryItem[]
> {
  const imagePaths = await collectImages(
    EXPO_DIRECTORY
  );

  return imagePaths
    .sort((a, b) =>
      a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    )
    .map((relativePath) => ({
      _id: `expo:${relativePath}`,
      imageUrl: toPublicUrl(relativePath),
      title: "Kenya Buildcon exhibition photo",
    }));
}
