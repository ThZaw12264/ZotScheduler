import PaneTabs from "../PaneTabs";

function LeftPaneTabs({ setTab }) {
  return (
    <PaneTabs 
      setTab={setTab} 
      labels={['Degree Planner', 'Quarter Schedule']} 
      color="yellow" 
    />
  )
}

export default LeftPaneTabs;