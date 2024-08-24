'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function Select(
  {children, mode}
  : {
    children: React.ReactNode
    mode: 'course' | 'teacher'
  }
) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (value:string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(mode, value)
    }else {
      params.delete(mode)
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <select
      className="select select-bordered"
      onChange={(e) => handleChange(e.target.value)}
      defaultValue={searchParams.get(mode) || ''}
    >
      {children}
    </select>
  )
}