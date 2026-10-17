import type { Metadata } from "next";
import { CollectionTeam } from "@/components/blocks/CollectionTeam";
import { HeaderGeneral } from "@/components/blocks/HeaderGeneral";
import { images, team } from "@/content/site";

export const metadata: Metadata = {
  title: "Team",
  description: team.lede,
};

// Built like lpas.com's team listing: header, then the team with a profile slide-out
export default function TeamPage() {
  return (
    <>
      <HeaderGeneral
        title="Team"
        intro={team.lede}
        image={images.team}
        imageAlt="A leadership team in discussion around a boardroom table"
        imagePosition="88% 50%"
      />

      <CollectionTeam
        tagline={team.label}
        intro={team.title}
        filters={["Leadership"]}
        // The founder leads; anyone added to team.members after her joins the wider team
        members={team.members.map((m, i) => ({ ...m, group: i === 0 ? "Leadership" : "Team" }))}
      />

    </>
  );
}
