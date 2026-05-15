import { HomepageConcept, getPreviewLayout } from "components/RefreshPreview/HomepageConcept";

export default function HaarPreview() {
  return <HomepageConcept version="haar" />;
}

HaarPreview.getLayout = getPreviewLayout;
