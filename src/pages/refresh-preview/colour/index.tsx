import { HomepageConcept, getPreviewLayout } from "components/RefreshPreview/HomepageConcept";

export default function ColourPreview() {
  return <HomepageConcept version="colour" />;
}

ColourPreview.getLayout = getPreviewLayout;
