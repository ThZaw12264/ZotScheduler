import PaneTabs from "../PaneTabs";

function RightPaneTabs({ setTab }) {
  return (
    <PaneTabs 
      setTab={setTab} 
      labels={['Upload', 'Generate', 'Search Class']} 
      color="teal" 
    />
  )
}

export default RightPaneTabs;