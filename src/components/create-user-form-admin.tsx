"use client";

import { authClient } from "@/lib/client";
import { Input } from "./ui/input";

export function CreateUserFormAdmin() {
  //   async function asdads() {
  //     await authClient.organization.create({
  //       name: "My Organization",
  //       slug: "my-org",
  //       logo: "https://example.com/logo.png",
  //     });
  //   }

  //   asdads();

  async function asdads() {
    authClient.organization.setActive("O8LnzI81ySrf1PkfqbAs3");
  }

  asdads();
  

  return (
    <div>
      <form>
        <Input placeholder="Name" />
        <Input placeholder="Email" />
        <Input placeholder="Password" />
      </form>
    </div>
  );
}
