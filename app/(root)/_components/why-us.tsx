import SectionLayout from "./section-layout";

export default function WhyUs() {
  return (
    <SectionLayout
      id="why-us"
      sectionLabel="Why Us"
      sectionLabelClassName="section-label"
      contentClassName="paragraph "
      background="primary"
      logo={true}
    >
      <p>
        Many overseas law firms, businesses, investors and private clients have
        interests in the United Kingdom but do not require, or wish to maintain,
        a permanent UK presence.
      </p>

      <p>
        Whether managing existing UK business interests, property holdings,
        investments, transactions, projects or expansion plans, clients often
        require practical local support to complement the advice provided by
        their professional advisers.
      </p>

      <p>
        Chelsea Portland House provides a practical and cost-effective solution.
        We act as a trusted UK presence, helping clients engage with
        stakeholders, coordinate projects, attend meetings, facilitate
        introductions and manage commercial matters that benefit from local
        involvement.
      </p>
      <p>
        Our clients value the ability to access trusted support on the ground
        without the cost and commitment of establishing their own UK office or
        developing an extensive network of local contacts.
      </p>
      <p>
        By working closely with our clients and their advisers, we help ensure
        communication remains clear, opportunities continue to progress and
        matters are managed efficiently from inception through to completion.
      </p>
      <p>
        For many of our clients, we become their trusted UK representative and
        first point of contact for matters connected to the United Kingdom.
      </p>
    </SectionLayout>
  );
}
