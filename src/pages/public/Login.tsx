import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginService from "../../services/LoginService";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth(); // ✅ Récupérer user si besoin

  const [loginType, setLoginType] = useState<"admin" | "user">("admin");
  const [email, setEmail] = useState("");
  const [matricule, setMatricule] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      let response;

      if (loginType === "admin") {
        response = await LoginService.loginAdmin({
          email,
          motDePasse: password,
        });

        // Stocker token, role et infos utilisateur
        login(
          response.token,
          "ADMIN",
          {
            nom: response.nom,
            email: response.email,
            photoProfil: response.photoProfil 
          },
          remember
        );

        navigate("/register"); // ou dashboard admin
      } else {
        response = await LoginService.loginUser({
          matricule,
          motDePasse: password,
        });

        login(
          response.token,
          "USER",
          {
            nom: response.nom,
            email: response.email,
            photoProfil: response.photoProfil 
          },
          remember
        );

        navigate("/register"); // ou dashboard user
      }
    } catch (err) {
      setError("Identifiants invalides");
    }
  };

  // ✅ Exemple pour debug : affichage infos user après login
  console.log("User connecté :", user?.nom, user?.email);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Connexion
        </h2>

        {/* Toggle */}
        <div className="flex mb-4">
          <button
            className={`flex-1 p-2 ${
              loginType === "admin" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setLoginType("admin")}
          >
            Admin
          </button>
          <button
            className={`flex-1 p-2 ${
              loginType === "user" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setLoginType("user")}
          >
            Utilisateur
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {loginType === "admin" ? (
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          ) : (
            <input
              type="text"
              placeholder="Matricule"
              className="w-full p-2 border rounded"
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              required
            />
          )}

          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="mr-2"
            />
            Se souvenir de moi
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white p-2 rounded"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
