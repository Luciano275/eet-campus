'use client';

import { AppProgressBar } from "next-nprogress-bar";

export default function Loading() {
  return (
    <AppProgressBar
      height="4px"
      color="#0099ff"
      options={{ showSpinner: false }}
      shallowRouting
    />
  )
}