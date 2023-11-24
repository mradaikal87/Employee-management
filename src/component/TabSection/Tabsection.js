import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AddEmployee from "../AddEmployee/AddEmployee";
import ViewEmployee from "../ViewEmployee/ViewEmployee";
import EditEmployee from "../EditEmployee/EditEmployee";

const TabSection = ({ currentTab, ...props }) => {
  const [index, setIndex] = useState("add");
  const [active, setActive] = useState();
  const router = useRouter();

  useEffect(() => {
    const tabIndex = router.query.tab || "add"; // Use "add" as the default tab if none is provided
    setIndex(tabIndex);
    setActive(props?.data?.button?.findIndex(item => item.id === tabIndex));
  }, [router.query.tab, props?.data?.button]);

  const changeTab = (tab) => {
    router.push(`/?tab=${tab}`);
    setIndex(tab);
    setActive(props?.data?.button?.findIndex(item => item.id === tab));
  };

  return (
    <section className={`tab-section ${props?.Class ? props?.Class : ""}`}>
      <div className="container mx-auto">
        {props?.data?.title && (
          <h1
            className="title"
            dangerouslySetInnerHTML={{ __html: props?.data?.title }}
          />
        )}
        <div className="tab-responsive">
          {/* Display accordion on small screens */}
          <div className="tab-button-column">
            {props?.data?.button?.map((item, i) => (
              <div key={i}>
                <button
                  className={`tab-button btn mb-10 ${
                    active === i ? "active" : ""
                  } `}
                  onClick={() => {
                    changeTab(item?.id), setActive(i);
                  }}
                >
                  {item?.tabbutton}
                </button>
                {/* Render content if the tab is active and on small screens */}
                {active === i && (
                  <div className="accordion-content">
                    {item?.id === "add" && <AddEmployee />}
                    {item?.id === "edit" && <EditEmployee />}
                    {item?.id === "view" && <ViewEmployee />}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          {/* Display regular tabs on larger screens */}
          <div className="tab-collumn ">
            <div className="tab-button-column">
              {props?.data?.button?.map((item, index) => (
                <button
                  key={index}
                  className={`tab-button btn mb-10 ${
                    active === index ? "active" : ""
                  } `}
                  onClick={() => {
                    changeTab(item?.id), setActive(index);
                  }}
                >
                  {item?.tabbutton}
                </button>
              ))}
              {/* Render content based on the selected tab */}
              {index === "add" && <AddEmployee />}
              {index === "edit" && <EditEmployee />}
              {index === "view" && <ViewEmployee />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabSection;
