export default function JoinModal() {
  return (
    <>
      <header>
        <h2 className="text-2xl border-b border-b-base-300 pb-3 mb-3">
          Unirse a un aula
        </h2>
      </header>
      <form className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            placeholder="Código del aula"
            className="input input-bordered w-full"
            name="classroom-code"
          />
        </div>

        <button className="btn btn-primary btn-md text-white">Unirse</button>
      </form>
    </>
  );
}
