import Article from "@/components/Article";
import Carousel from "./Carousel";

export default function Introduction() {
  return (
    <Article className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="introduction">
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold py-4 border-b mb-4">
          Campus Virtual E.E.T 3117
        </h1>
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">Nuestra escuela</h2>
        <p className="text-justify text-lg py-2">
          La <b
            >Escuela de Educación Técnica (EET) 3117 "Maestro Daniel Oscar Reyes"</b
          > está ubicada en el Barrio San Remo de <b>Salta.</b> El 22 de marzo de 2004,
          la escuela fue nombrada en honor al maestro argentino Daniel Oscar Reyes, quien
          desapareció en un accidente. Reyes fue un pionero en telecomunicaciones y relaciones
          interinstitucionales a través de la Red Telar, y un promotor de llevar tecnologías
          a los estudiantes de escuelas públicas.
        </p>
      </div>

      <Carousel />
    </Article>
  )
}