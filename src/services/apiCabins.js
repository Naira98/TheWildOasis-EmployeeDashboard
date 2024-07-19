import supabase from "./supabase";
import uploadImage from "./uploadImage";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createUpdateCabin(newCabin, id) {
  const imagePath = await uploadImage(newCabin.image, 'cabin-images');

  // 1.Create/Update Cabin
  let query = supabase.from("cabins");
  // A) Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) Update
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}
