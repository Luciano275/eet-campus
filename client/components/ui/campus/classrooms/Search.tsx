'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { useDebouncedCallback } from 'use-debounce'

const DEBOUNCE_DELAY = 400;

export default function Search() {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const defaultSearch = searchParams.get('name');

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('name', value);
    }else {
      params.delete('name');
    }

    replace(`${pathname}?${params.toString()}`);
  }, DEBOUNCE_DELAY);

  return (
    <label className="input input-bordered flex items-center gap-2">
      <input
        type="text"
        className="grow"
        placeholder="Buscar aulas"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={defaultSearch || ''}
      />
      <FaSearch />
    </label>
  )
}