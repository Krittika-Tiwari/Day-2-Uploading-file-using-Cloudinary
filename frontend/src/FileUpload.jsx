import { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/files/upload",
        formData
      );
      setImageUrl(res.data.url);
      console.log(res.data.url);
      setError("");
    } catch (error) {
      setError("Upload failed. Try again.", error);
      setImageUrl("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        maxWidth: "400px",
        margin: "20px auto",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <input
        type="file"
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "100%",
          marginBottom: "10px",
        }}
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        onClick={handleUpload}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
          marginLeft: "10px",
          transition: "background-color 0.3s",
        }}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {imageUrl && (
        <div style={{ marginTop: "1rem" }}>
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{ width: "300px", borderRadius: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
