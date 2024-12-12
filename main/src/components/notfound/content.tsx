export default function NotFoundContent () {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="w-full max-w-[500px] overflow-hidden">
        <img
          src={'/notfound.svg'}
          alt="Not Found Logo"
          className="object-cover w-full max-w-full h-auto"
        />
      </div>
      <h1 className="font-semibold text-center text-2xl md:text-3xl lg:text-4xl">La página que buscas no se ha encontrado</h1>
      <a href="/" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Volver al inicio</a>
    </div>
  )
}