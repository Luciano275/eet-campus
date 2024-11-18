import ProfileStyles from '@/styles/profile.module.css';
import EditInput from './edit-input';

export const InformationTitle = ({text, theme}: {text: string, theme: 'dark' | 'light'}) => {
  return (
    <h3 className={`${theme === 'dark' ? 'text-white' : 'text-neutral-400'} py-4`}>{text}</h3>
  )
}

export const Information = (
  {keys, labels, oneToMany, toRight, edit, only, names}
  : {
    keys: string[];
    labels: string[] | string[][];
    names?: string[];
    oneToMany?: boolean;
    toRight?: boolean;
    edit?: boolean;
    only?: string[];
  }
) => {
  if (!oneToMany) {
    return (
      <div className="flex flex-col gap-1 mb-5">
        {Array.from({length: keys.length}).map((_, index) => (
          <div key={`${index}:key:span`} className={`grid grid-cols-2 ${ProfileStyles['information-grid']}`}>
            <p><span className={`font-bold`}>{keys[index]}</span></p>
            {
              !edit || ( only && !only.includes(keys[index]) ) ? (
                <p className='overflow-hidden text-ellipsis' title={`${labels[index]}`}>
                  <span className={`${toRight && 'text-end'}`}>{labels[index]}</span>
                </p>
              ) : (
                <EditInput
                  inputNames={names!}
                  index={index}
                  labels={labels}
                  toRight={toRight}
                />
              )
            }
          </div>
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