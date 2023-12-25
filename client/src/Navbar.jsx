function Navbar() {
  return (
    <>
      <div className="navbar">
            <div className="left-wrapper">
                <h1 className="white">ZotScheduler</h1>
            </div>
            <div className="right-wrapper">
                <ul>
                    <li><button onClick='myFunction()'>Save</button></li>
                    <li><button onClick='myFunction()'>Load</button></li>
                    <li><button onClick='myFunction()'>Info</button></li>
                    <li><button onClick='myFunction()'>Settings</button></li>
                </ul>
            </div>
      </div>
    </>
  )
}

export default Navbar;
