import { Dispatch, SetStateAction } from "react";

export default function AttachmentsButtons (
  {files, pending, setFiles}
  : {
    files: FileList | null;
    pending: boolean;
    setFiles: Dispatch<SetStateAction<FileList | null>>
  }
) {
  return (
    <div className="flex gap-2 justify-end">
      <button disabled={pending} className="btn btn-primary btn-md">Subir</button>
      { files && files.length > 0 && (
        <button disabled={pending} type="button" onClick={() => setFiles(null)} className="btn btn-error btn-outline btn-md">Cancelar</button>
      ) }
    </div>
  )
}