import { HomepageConcept, getPreviewLayout } from "components/RefreshPreview/HomepageConcept";

export default function EditorialPreview() {
  return <HomepageConcept version="editorial" />;
}

EditorialPreview.getLayout = getPreviewLayout;
