import FAQList from "../../components/FAQList";

export default function FAQ() {
  return <>
    <section className="page-hero"><div className="container center"><div className="eyebrow">FAQ</div><h1 style={{maxWidth:800,margin:"15px auto"}}>Frequently Asked <span>Questions</span></h1><p className="section-subtitle" style={{margin:"0 auto"}}>Find answers to common questions about PetCard and its promotional website.</p></div></section>
    <section className="section soft"><div className="container"><FAQList/></div></section>
  </>;
}
