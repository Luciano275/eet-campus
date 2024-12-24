export default function Dropdown(
  {children, mobile, label}
  : {
    children: React.ReactNode;
    mobile?: boolean;
    label: string;
  }
) {
  return (
    mobile ? (
      <details className={`dropdown`}>
        <summary
          className={`m-1 flex text-lg gap-2 text-center py-1 text-white hover:text-blue-400`}
        >
          {label}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </summary>
      
        {children}
      </details>
    ) : (
      <div className={`dropdown dropdown-hover`}>
        <div
          tabIndex={0}
          role="button"
          className={`dropdown-container text-lg flex gap-2 ${mobile && 'text-center py-1'} text-white hover:text-blue-400`}
        >
          {label}
          <span className="transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </div>
      
        {children}
      </div>
    )
  )
}