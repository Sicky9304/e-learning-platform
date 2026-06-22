import { useNavigate } from "react-router-dom"

const BackButton = () => {
  const navigate = useNavigate();
  return (

    <>
    {/* Back Button */ }
    <button onClick = {() => navigate(-1)} className = "relative z-50 mb-8 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg cursor-pointer">
          ← Back
    </button>
    </>
  )
}

export default BackButton;
