// checks the name consisits of only digits and alphabets
const isNameValid = (name) => {
  for (let i = 0; i < name.length; i++) {
    if (
      (name[i] >= "a" && name[i] <= "z") ||
      (name[i] >= "A" && name[i] <= "Z") ||
      (name[i] >= "0" && name[i] <= "9")
    )
      continue;
    return true;
  }
  return false;
};

export const userNameValidation = (username) => {
  if (username.length < 3) return "username is too short";
  if (username.length > 15) return "username is too long";

  if (isNameValid(username))
    return "username should contain alphabets and digits only";
  return "";
};

export const useStrongPassword = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number.";
  }
  if (!/[!@#$%^&*()_+{}\[\]<>?]/.test(password)) {
    return "Password must contain at least one special character.";
  }
  return "";
};

export const useValidName = (name) => {
  if (name.length < 2) {
    return "Name must be at least 2 characters long.";
  }
  if (!/^[A-Za-z\s]+$/.test(name)) {
    return "Name can only contain letters and spaces.";
  }
  return "";
};


export function validatePhoto(fileInput) {
  const maxSizeMB = 5;
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

  if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
    return "Please select a photo.";
  }

  const file = fileInput.files[0];

  if (file.size > maxSizeMB * 1024 * 1024) {
    return `Photo must be less than ${maxSizeMB}MB.`;
  }

  if (!allowedTypes.includes(file.type)) {
    return "Photo must be a JPG, PNG, or GIF.";
  }

  return file;
}