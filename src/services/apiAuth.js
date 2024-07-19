import supabase from "./supabase";
import uploadImage from "./uploadImage";

export async function signup({ email, password, fullName }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function updateAvatar({ avatar }) {
  const imagePath = await uploadImage(avatar, "avatar");
  await supabase.auth.updateUser({ data: { avatar: imagePath } });
}

export async function updateName({ fullName }) {
  const { data, error } = await supabase.auth.updateUser({
    data: { fullName },
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function updatePassword({ password }) {
  const { data, error } = await supabase.auth.updateUser({ password });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
