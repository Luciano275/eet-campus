export default function ContainerInput(
  {children}: {children: React.ReactNode}
) {
  return (
    <div className="flex flex-col gap-2">
      {children}
    </div>
  )
}