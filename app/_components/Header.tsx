import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar, NavbarBrand, Spinner } from "flowbite-react";

export default function Header() {
  return (
    <Navbar fluid>
      <NavbarBrand as={Link} href="#">
        <Image
          src="/favi-transparent.png"
          alt="Reelview Logo"
          width="0"
          height="0"
          sizes="10vw"
          className="mr-3 w-6"
          priority
          placeholder="empty"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text">
          Reelview
        </span>
      </NavbarBrand>
    </Navbar>
  );
}
