function Navbar() {
  return (
    <>
      <div class="navbar">
            <div class="left-wrapper">
                <h1 class="white">ZotScheduler</h1>
            </div>
            <div class="right-wrapper">
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
