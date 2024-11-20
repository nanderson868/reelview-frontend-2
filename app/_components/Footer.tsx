import React from "react";
import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";

export default function Component() {
  return (
    <Footer container className="dark:text-faint">
      {/* <FooterCopyright href="#" by="Reelview" year={2022} /> */}
      <FooterLinkGroup>
        <FooterLink href="#">Privacy Policy</FooterLink>
        <FooterLink href="#">Contact</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}
