import { useRouter } from "next/router";
import TabSection from "@/component/TabSection/Tabsection";
import ViewEmployee from "@/component/ViewEmployee/ViewEmployee";

const tabdata = {
  title: "<span>Employee</span> Management",
  button: [
    {
      tabbutton: " Add employee",
      id: "add",
    },
    {
      tabbutton: " Edit employee",
      id: "edit",
    },
    {
      tabbutton: " View employee",
      id: "view",
    },
  ],
};

export default function Home() {
  const router = useRouter();
  const { tab } = router.query;

  return (
    <div>
      <TabSection currentTab={tab} data={tabdata} />
   
    </div>
  );
}
