import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import InputField from "./InputField";
import SelectField from "./SelectField";
import "./style.css";

function App() {
  const [formData, setFormData] = useState({
    nama: "",
    nim: "",
    alamat: "",
    jurusan: "",
    semester: ""
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const jurusanOptions = ["Informatika", "Sistem Informasi", "Teknik Komputer"];
  const semesterOptions = ["1", "2", "3", "4", "5", "6"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "nama") {
      if (!value) error = "Nama wajib diisi";
      else if (!isNaN(value)) error = "Nama tidak boleh angka";
      else if (value.length < 3) error = "Minimal 3 karakter";
    }

    if (name === "nim") {
      if (!value) error = "NIM wajib diisi";
      else if (isNaN(value)) error = "NIM harus angka";
      else if (value.length < 5) error = "Minimal 5 digit";
    }

    if (name === "alamat") {
      if (!value) error = "Alamat wajib diisi";
      else if (value.length < 5) error = "Minimal 5 karakter";
      else if (value.trim() === "") error = "Tidak boleh hanya spasi";
    }

    setErrors({
      ...errors,
      [name]: error
    });
  };

  const isFormValid = () => {
    return (
      formData.nama &&
      formData.nim &&
      formData.alamat &&
      formData.jurusan &&
      formData.semester &&
      Object.values(errors).every((e) => e === "")
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(formData);
  };

  return (
    <div className="container">
      <h2>Form Data Mahasiswa</h2>

      <form onSubmit={handleSubmit}>
        <InputField
          label="Nama"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          error={errors.nama}
        />

        <InputField
          label="NIM"
          name="nim"
          value={formData.nim}
          onChange={handleChange}
          error={errors.nim}
        />

        <InputField
          label="Alamat"
          name="alamat"
          value={formData.alamat}
          onChange={handleChange}
          error={errors.alamat}
        />

        <SelectField
          label="Jurusan"
          name="jurusan"
          value={formData.jurusan}
          onChange={handleChange}
          options={jurusanOptions}
        />

        <SelectField
          label="Semester"
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          options={semesterOptions}
        />

        {isFormValid() && (
          <button type="submit">Submit</button>
        )}
      </form>

      {result && (
        <div className="result">
          <h3>Data Mahasiswa:</h3>
          <p>Nama: {result.nama}</p>
          <p>NIM: {result.nim}</p>
          <p>Alamat: {result.alamat}</p>
          <p>Jurusan: {result.jurusan}</p>
          <p>Semester: {result.semester}</p>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);