import { HomepageConcept, getPreviewLayout } from "components/RefreshPreview/HomepageConcept";

export default function AllurePreview() {
  return <HomepageConcept version="allure" />;
}

AllurePreview.getLayout = getPreviewLayout;
