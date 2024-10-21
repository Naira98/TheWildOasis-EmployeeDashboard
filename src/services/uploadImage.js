import supabase, { supabaseUrl } from "./supabase";

const uploadImage = async (image, storage) => {
  let imagePath;
  if (typeof image === "string") {
    imagePath = image;
  } else if (image instanceof File) {
    const imageName = `${Math.random()}-${image.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/${storage}/${imageName}`;

    const { error: storageError } = await supabase.storage
      .from(storage)
      .upload(imageName, image);

    if (storageError) {
      console.error(storageError);
      throw storageError;
    }
  }
  return imagePath;
};

export default uploadImage;
