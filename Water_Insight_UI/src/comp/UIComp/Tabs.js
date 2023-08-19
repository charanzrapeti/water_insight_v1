import { Children } from 'react';
import { Tab } from '@headlessui/react';

function Tabs({
  tabsList, children,
  listClass = "", panelClass = "", panelChildCls = "",
  tabClass = "", spanClass = "",
  selectedTabCls = "font-semibold",
  unselectedTabCls = "text-[#777783] hover:text-[#555] font-medium",
  defaultIndex = 0
}) {
  return (
    <Tab.Group defaultIndex={defaultIndex}>
      <Tab.List className={`df tab-list-wrapper ${listClass}`}>
        {
          tabsList.map(tab => (
            <Tab
              key={tab}
              className={({ selected }) => `tab relative focus:outline-none ${tabClass} ${selected ? `selected ${selectedTabCls}` : unselectedTabCls}`}
            >
              {tab}
              <span className={spanClass}></span>
            </Tab>
          ))
        }
      </Tab.List>

      <Tab.Panels className={panelClass}>
        {
          Children.map(children, (child, i) => (
            <Tab.Panel key={i} className={panelChildCls}>
              {child}
            </Tab.Panel>
          ))
        }
      </Tab.Panels>
    </Tab.Group>
  )
}

export default Tabs