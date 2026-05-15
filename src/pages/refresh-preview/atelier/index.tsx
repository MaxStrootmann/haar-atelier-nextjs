import { HomepageConcept, getPreviewLayout } from "components/RefreshPreview/HomepageConcept";

export default function AtelierPreview() {
  return <HomepageConcept version="atelier" />;
}

AtelierPreview.getLayout = getPreviewLayout;
