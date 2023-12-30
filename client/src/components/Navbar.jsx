import { Group, Button } from '@mantine/core';
import classes from './Navbar.module.css';

const buttons = [
  { func: 'myFunction()', label: 'SAVE' },
  { func: 'myFunction()', label: 'LOAD' },
  { func: 'myFunction()', label: 'INFO' },
  { func: 'myFunction()', label: 'SETTINGS' },
];

function Navbar() {
  const renderButtons = () => {
    return (
      buttons.map(({func, label}) => (
        <Button key={label} size="md" onClick={func}>
          {label}
        </Button>
      ))
    );
  }

  return (
    <>
      <header className={classes.navbar}>
        <div className={classes.leftWrapper}>
          <h1 className={classes.aqua}>ZotScheduler</h1>
        </div>
        <div className={classes.rightWrapper}>
          <Group>
            {renderButtons()}
          </Group>
        </div>
      </header>
    </>
  )
}

export default Navbar;