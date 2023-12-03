const toBase64 = (value: unknown): Promise<string> => {
  if (value instanceof FileList) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(value[0]);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  } else {
    return Promise.reject(new TypeError('The provided value is not a File.'));
  }
};

export default toBase64;
