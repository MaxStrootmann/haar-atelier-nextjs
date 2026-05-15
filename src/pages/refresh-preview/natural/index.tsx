import { HomepageConcept, getPreviewLayout } from "components/RefreshPreview/HomepageConcept";

export default function NaturalPreview() {
  return <HomepageConcept version="natural" />;
}

NaturalPreview.getLayout = getPreviewLayout;
