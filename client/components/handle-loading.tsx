'use client';

import { useEffect } from "react";
import { useLoading } from "./providers/loading-provider";

export const DisableLoading = () => {

  const { loading, setLoading } = useLoading();

  useEffect(() => {
    if (loading) setLoading(false);
  }, [])

  return (
    <></>
  )
}