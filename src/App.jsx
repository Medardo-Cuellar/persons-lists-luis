import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const [koders, setKoders] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitted }, //los is son para validar el formulario son propiedades que nos da react-hook-form y son booleanos
  } = useForm();

  const onSubmit = (data) => {
    setKoders([...koders, data]);
    reset();
  };

  function removeKoder(indexToRemove) {
    setKoders(koders.filter((koder, index) => index !== indexToRemove));
  }

  return (
    <main className="mt-10">
      <h1 className="text-xl text-center mx-4 p-4 bg-violet-600 text-black font-bold rounded">Lista de koders</h1>
      <form className="flex flex-col gap-2 justify-center p-5"
        onSubmit={handleSubmit(onSubmit)}>
        <input className="rounded m-2 p-4 bg-slate-600"type="text" placeholder="Nombre" required {...register("firstName")}/>
        <input className="rounded m-2 p-4 bg-slate-600"type="text" placeholder="Apellido" required {...register("lastName")}/>
        <input className="rounded m-2 p-4 bg-slate-600"type="text" placeholder="Email" required {...register("email")}/>
        <button className="text-black p-4 m-2 rounded bg-green-600 disabled:bg-stone-400">+ Agregar</button>
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
              <span className="flex-grow p-4">{Koder.firstName} {Koder.lastName} {Koder.email}</span>
              {/*               <span
                className="cursor-pointer p-4 hover:rounded-full hover:bg-green-500/50"
                onClick={() => editKoder(index)}
              >
                📝
              </span> */}
              <span
                className="cursor-pointer p-4 hover:rounded-full hover:bg-red-500/50"
                onClick={() => removeKoder(index)}
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
