'use client'

import { useLoading } from "./providers/loading-provider"
import LoadingStyles from '@/styles/loading.module.css';

export default function LoadingComponent() {

  const { loading } = useLoading();

  return (
    <div className={`${loading ? 'block' : 'hidden'} fixed top-0 left-0 w-full h-1 rounded-full overflow-hidden`} style={{
      zIndex: 999999
    }}>
      <div className="absolute w-1/2 md:w-1/3 h-full bg-blue-500" id={LoadingStyles['loading-anim']}></div>
    </div>
  )
}