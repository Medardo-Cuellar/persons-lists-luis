import { useState, useEffect } from "react";
import { get, set, useForm } from "react-hook-form";
import { getKoders, createKoder, deleteKoder } from "./api";

function App() {
  const [koders, setKoders] = useState([]);

  // useEffect se usa para ejecutar código en partes específicas del ciclo de vida de un componente
  // useEffect(() => se ejecuta cada vez que el componente se renderiza por primera vez y la segunda es cuando alguna de sus dependencias cambia
  useEffect(() => {
    getKoders()
      .then((koders) => setKoders(koders))
      .catch((error) => {
        console.error("error al obtener koders");
        alert("error al obtener koders");
      });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitted }, //los is son para validar el formulario son propiedades que nos da react-hook-form y son booleanos
  } = useForm();

  async function onSubmit(data) {
    try {
      await createKoder({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
      const koderList = await getKoders();
      setKoders(koderList);
      reset();
    } catch (error) {
      console.error("error al crear koder", error);
      alert("error al crear koder");
    }
  }

  function onDelete (koderId) {
    deleteKoder(koderId)
      .then(() => {
        getKoders().then((koders) => setKoders(koders)).catch((error) => {
          console.error("error al obtener koders");
          alert("error al obtener koders");
        });
        
      })
      .catch((error) => {
        console.error("error al eliminar koder", error);
        alert("error al eliminar koder");
      });
  }
  function removeKoder(indexToRemove) {
    setKoders(koders.filter((koder, index) => index !== indexToRemove));
  }

  function editKoder(index) {
    const newKoders = koders.map((koder, i) => {});
    setKoders(newKoders);
  }

  return (
    <main className="mt-10">
      <h1 className="text-xl text-center mx-4 p-4 bg-violet-600 text-black font-bold rounded">
        Lista de koders
      </h1>
      <form
        className="flex flex-col gap-2 justify-center p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="rounded m-2 p-4 bg-slate-600"
          type="text"
          placeholder="Nombre"
          required
          {...register("firstName")}
        />
        <input
          className="rounded m-2 p-4 bg-slate-600"
          type="text"
          placeholder="Apellido"
          required
          {...register("lastName")}
        />
        <input
          className="rounded m-2 p-4 bg-slate-600"
          type="text"
          placeholder="Email"
          required
          {...register("email")}
        />
        <button className="text-black p-4 m-2 rounded bg-green-600 disabled:bg-stone-400">
          + Agregar
        </button>
      </form>

      <div className="max-w-screen-sm w-full mx-auto p-4">
        {koders.length === 0 && (
          <p className="bg-white/50 rounded p-4 m-4 flex flex-row justify-center">
            no tienes personas en la lista 🤷‍♀️
          </p>
        )}
        {koders.map((Koder, index) => {
          return (
            <div
              key={`Koder-${index}`}
              className="bg-white/10 rounded p-4 m-4 flex flex-row gap-4 justify-between"
            >
              <span className="flex-grow p-4">
                {Koder.firstName} {Koder.lastName} - {Koder.email}
              </span>
              {/* <span
                className="cursor-pointer p-4 hover:rounded-full hover:bg-green-500/50"
                onClick={() => editKoder(index)}
              >
                📝
              </span> */}
              <span
                className="cursor-pointer p-4 hover:rounded-full hover:bg-red-500/50"
                onClick={() => onDelete(Koder.id)}
              >
                ❌
              </span>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default App;
