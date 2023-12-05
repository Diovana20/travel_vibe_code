import { useState } from "react";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { storage, db } from "../../firebase/config";
import "./PostPage.css"

const PostPage = () => {
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [body, setBody] = useState("");
  const [localization, setLocalization] = useState("");
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  let urlPhotoUserLogged;

  const navigate = useNavigate();

  async function getPhotoUserLogged() {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      debugger
      const data = docSnap.data();
      urlPhotoUserLogged = data.image;
    }
  }

  getPhotoUserLogged().then(() => {

  });

  const { insertDocument, response } = useInsertDocument("posts");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // check values
    if (!body || !localization || !image) {
      setFormError("Por favor, preencha todos os campos!");
      return;
    }

    try {
      // Salvar imagem no Storage
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      await uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          alert(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          const docRef = await addDoc(collection(db, "posts"), {
            image: url,
            body,
            localization,
            createdAt: serverTimestamp(),
            uid: user.uid,
            creactedBy: user.displayName,
            urlPhotoUserLogged: urlPhotoUserLogged
          });

          alert('Formulário enviado com sucesso!');
          navigate("/");
        }
      );
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="create_post">
      <h2>Compartilhe suas aventuras!</h2>
      <p>Compartilhe suas aventuras!</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <textarea
              className="label_description"
              name="body"
              required
              placeholder="Descrição"
              onChange={(e) => setBody(e.target.value)}
              value={body}
            ></textarea>
          </label>
        </div>
        <div>
          <label>
            <textarea
              className="localizationpost"
              name="localization"
              required
              placeholder="Localização"
              onChange={(e) => setLocalization(e.target.value)}
              value={localization}
            ></textarea>
          </label>
        </div>
        <div className="imagem">
          <label>
            <span>Adicione sua imagem!</span>
            <input 
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>
        {!response.loading && <button className="buttonpost">Publicar</button>}
        {response.loading && (
          <button className="buttonpost" disabled>
            Aguarde...
          </button>
        )}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>

      <br />
    
    </div>
  );
};

export default PostPage;
