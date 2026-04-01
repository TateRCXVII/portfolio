"use client";

import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/nav/Navbar"), {
  ssr: false,
  loading: () => null,
});

export default function NavbarClient() {
  return <Navbar />;
}
