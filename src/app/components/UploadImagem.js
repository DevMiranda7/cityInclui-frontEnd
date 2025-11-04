import { useState } from "react";

export default function UploadImagem() {
  const [foto, setFoto] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) setFoto(URL.createObjectURL(file));
  };

  return (
    <div>
      <label>Foto do Restaurante</label>
      <input type="file" accept="image/*" onChange={handleChange} />
      {foto && (
        <img
          src={foto}
          alt="Prévia"
          className="mt-2 w-40 h-40 object-cover rounded-lg border"
        />
      )}
    </div>
  );
}
