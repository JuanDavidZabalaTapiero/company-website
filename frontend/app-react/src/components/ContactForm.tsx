import { useState } from "react"
const API_URL = import.meta.env.VITE_API_URL;

export default function ContactForm() {
    // == MESSAGES ==
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // == FORM ==

    // VAR: NAME
    const [name, setName] = useState("");
    // VAR: FILE
    const [cv, setCv] = useState<File | null>(null);

    // LOADING
    const [loading, setLoading] = useState(false);

    // SEND DATA
    const handleSubmit = async (e: React.FormEvent) => {
        // NOT SENT
        e.preventDefault()

        // CLEAN MESSAGES
        setError("");
        setSuccess("");

        // VALIDATION
        if (!name || !cv) {
            setError("Todos los campos son obligatorios");
            return;
        }

        // DATA
        const formData = new FormData();
        formData.append("name", name);
        formData.append("cv", cv);

        // TRY / CATCH
        try {
            // SENDING ...
            setLoading(true);

            const response = await fetch(`${API_URL}/send-cv`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Error al enviar el formulario");
                setSuccess("");
                return;
            }

            setSuccess(data.message);
            setError("");

            // CLEAN DATA
            setName("");
            setCv(null);

        } catch (err) {
            setError("Error de conexión con el servidor. Por favor intente más tarde");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="card shadow-sm p-4">

            <h4 className="mb-3 text-center">Formulario de contacto</h4>

            {/* ERROR MESSAGE */}
            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {/* SUCCESS MESSAGE */}
            {success && (
                <div className="alert alert-success">
                    {success}
                </div>
            )}

            {/* NAME */}
            <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                />
            </div>

            {/* CV */}
            <div className="mb-3">
                <label className="form-label">Hoja de vida</label>
                <input
                    type="file"
                    className="form-control"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                        if (e.target.files) {
                            setCv(e.target.files[0]);
                        }
                    }}
                    disabled={loading}
                />
                <div className="form-text">
                    Formatos aceptados: PDF, DOC, DOCX
                </div>
            </div>

            {/* BTN */}
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Enviando..." : "Enviar"}
            </button>
        </form>
    )
}