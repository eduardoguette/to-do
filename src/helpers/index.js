import { supabase } from './supabaseClient';

const idUser = supabase.auth.session()?.user.id;

const user = async () => {
  let result = {};
  const idUser = supabase.auth.session()?.user.id;
  if (!idUser) return (result = { logged: false });
  result = { ...result, idUser, date: new Date().toISOString(), logged: true };
  await supabase.auth.onAuthStateChange((_event, session) => (result = { ...result, session }));
  const profile = (await getProfile(idUser)) || null;
  if (!profile) return (result = { ...result, logged: true, estado: 'noProfile' });
  await downloadImage(profile.avatar_url).then((avatar) => (result = { ...result, avatar, profile }));
  return result;
};

async function signUser({ email, pass: password }) {
  try {
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
    });
    return { user, session, error };
    if (error) throw error;
  } catch (error) {
    console.log(error.error_description || error.message);
  }
}

async function getProfile(id) {
  try {
    let { data, error, status } = await supabase.from('profiles').select(`location, name, avatar_url, id, biography`).eq('id', id).single();

    if (error && status !== 406) {
      throw error;
    }
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

async function downloadImage(path) {
  try {
    const { data, error } = await supabase.storage.from('avatars').download(path);
    if (error) {
      throw error;
    }
    const url = await URL.createObjectURL(data);
    return url;
  } catch (error) {
    console.log('Error downloading image: ', error.message);
  }
}

async function uploadAvatar(event) {
  try {
    if (!event.target.files || event.target.files.length === 0) {
      throw new Error('You must select an image to upload.');
    }

    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }
    return await filePath;
  } catch (error) {
    console.log(error.message);
  }
}

async function updateProfile({ name, biography, location, id, avatar_url }) {
  try {
    const updates = { name, biography, location, id, avatar_url };
    let { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    });
    if (error) {
      throw error;
    }
  } catch (error) {
    console.log(error.message);
  }
}
async function recoverPassword(email) {
  try {
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(email);
    return data;
  } catch (err) {
    console.log(err);
  }
}
const getDateNow = (date = new Date(), type = 'long') => {
  let o = new Intl.DateTimeFormat('es', {
    dateStyle: type,
  });
  return o.format(new Date(date));
};

function timeSince(date) {
  if (new Date().getTime() < new Date(date).getTime()) {
    return 'Programada el ' + getDateNow(date);
  }
  var seconds = Math.floor((new Date() - new Date(date).getTime()) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return 'Hace ' + Math.floor(interval) + ' años';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return 'Hace ' + Math.floor(interval) + ' meses';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return 'Hace ' + Math.floor(interval) + ' días';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return 'Hace ' + Math.floor(interval) + ' horas';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return 'Hace ' + Math.floor(interval) + ' minutos';
  }
  return 'Hace ' + Math.floor(seconds) + ' segundos';
}

export { getProfile, downloadImage, uploadAvatar, updateProfile, signUser, user, recoverPassword, getDateNow, timeSince, idUser };
