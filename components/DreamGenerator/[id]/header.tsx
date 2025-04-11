import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import HeaderAction from "./headerAction";

export default function Header() {
  return (
    <header className="w-full px-6 py-4 border-b border-white/10 bg-[#341053] backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center text-white hover:text-purple-300 transition"
        >
          <ArrowLeftIcon className="mr-2 w-5 h-5" />
          <span className="font-semibold">Back to Generator</span>
        </Link>
        <h1 className="text-lg md:text-xl font-bold text-white">
          Project Overview
        </h1>
        <div />
        <HeaderAction />
      </div>
    </header>
  );
}
