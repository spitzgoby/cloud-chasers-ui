import type { Route } from "./+types/home";
import { Generator } from "../generator/generator";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SWA Marketing Generator" },
    { name: "description", content: "An AI powered marketing generator for Southwest Airlines" },
  ];
}

export default function Home() {
  return <div className="min-h-screen flex flex-col">
    <nav className="pt-8 pl-8 flex">
      <img src="/southwest-logo.svg" />
    </nav>
    <div className="flex-1"></div>
    <div className="flex justify-center pb-8 ml-8 mr-8">
      <div className="w-full sm:w-full md:w-full lg:w-3/4 xl:w-1/2">
        <Generator />
      </div>
    </div>
  </div>;
}
