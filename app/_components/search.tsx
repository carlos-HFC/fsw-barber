"use client";

import { SearchIcon } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Search() {
  return (
    <div className="flex items-center gap-2">
      <Input placeholder="Busque por uma barbearia..." />

      <Button size="icon">
        <SearchIcon size={20} />
      </Button>
    </div>
  );
}
