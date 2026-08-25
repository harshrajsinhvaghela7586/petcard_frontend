import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

export default function CTA({ title = "Give Your Pet a Smarter Identity", text = "Discover PetCard and keep your pet's important information organized." }) {
  return <section className="section"><div className="container"><div className="cta"><div><h2>{title}</h2><p>{text}</p></div><Link className="btn btn-dark" href="#download-app">Download Our App <ArrowRight size={17}/></Link></div></div></section>;
}
