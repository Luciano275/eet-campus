export default function FilesAttachments(
  {files}
  : {
    files: FileList
  }
) {
  return (
    <div className="flex flex-col p-2 overflow-x-hidden overflow-y-auto">
      {
        Array.from(files).map((file, index) => (
          <span key={`file:${index}:${file.size}`} className="text-center">{file.name}</span>
        ))
      }
    </div>
  )
}