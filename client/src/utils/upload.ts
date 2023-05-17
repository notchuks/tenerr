import axios from "axios";

const upload = async (file: File) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "tenerr");

  try {
    const res = await axios.post("https://api.cloudinary.com/v1_1/drgbxw7jw/image/upload", data);
    console.log(res);
    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};

export default upload;