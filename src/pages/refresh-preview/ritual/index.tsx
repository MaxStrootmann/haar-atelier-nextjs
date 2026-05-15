import { HomepageConcept, getPreviewLayout } from "components/RefreshPreview/HomepageConcept";

export default function RitualPreview() {
  return <HomepageConcept version="ritual" />;
}

RitualPreview.getLayout = getPreviewLayout;
