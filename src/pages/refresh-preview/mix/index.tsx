import { HomepageConcept, getPreviewLayout } from "components/RefreshPreview/HomepageConcept";

export default function MixPreview() {
  return <HomepageConcept version="mix" />;
}

MixPreview.getLayout = getPreviewLayout;
