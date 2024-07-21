export const InformationTitle = ({text, theme}: {text: string, theme: 'dark' | 'light'}) => {
  return (
    <h3 className={`${theme === 'dark' ? 'text-white' : 'text-neutral-400'} py-4`}>{text}</h3>
  )
}

export const Information = (
  {keys, labels, oneToMany, toRight}
  : {
    keys: string[];
    labels: string[] | string[][];
    oneToMany?: boolean;
    toRight?: boolean;
  }
) => {
  if (!oneToMany) {
    return (
      <div className="flex flex-col gap-4 sm:gap-1 mb-5">
        {Array.from({length: keys.length}).map((_, index) => (
          <p key={`${index}:key:span`} className="grid grid-cols-1 sm:grid-cols-2">
            <span className={`font-bold`}>{keys[index]}</span>
            <span className={`${toRight && 'text-end'}`}>{labels[index]}</span>
          </p>
        ))}
      </div>
    )
  }

  return (
    <table className="table">
      <thead>
        <tr>
          {keys.map((key, index) => <th key={`${index}:${key}`}>{key}</th>)}
        </tr>
      </thead>
      <tbody>
        {
          Array.from({length: labels[0].length}).map((_, rowIndex) => (
            <tr key={`${rowIndex}:${_}:TR`} className="text-center">
              <td>{labels[0][rowIndex]}</td>
              <td>{labels[1][rowIndex]}</td>
              <td>{labels[2][rowIndex]}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}