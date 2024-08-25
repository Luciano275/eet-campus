import fileStyles from '@/styles/file.module.css'
import { Dispatch, SetStateAction } from 'react';

export default function InputAttachment(
  {setFiles}
  : {
    setFiles: Dispatch<SetStateAction<FileList | null>>
  }
) {
  return (
    <>
      <input
        type="file"
        name="attachment"
        className="absolute opacity-0 top-0 left-0 w-full h-full z-10 cursor-pointer"
        id={fileStyles['inputFile']}
        multiple
        onChange={(e) => {
          setFiles(e.target.files || null);
        }}
      />
      <span className="flex flex-col items-center text-center">
        <span>Arrastra y suelta los archivos o</span>
        <span className="text-blue-500">Click aqui</span>
      </span>
    </>
  )
}