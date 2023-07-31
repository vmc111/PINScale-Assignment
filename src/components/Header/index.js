import { Button, Icon } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./index.css";

const Header = (props) => {
  const { headertext } = props;

  return (
    <div className="header">
      <h1>{headertext}</h1>
      <Button variant="contained" color="primary">
        <AddIcon />
        Add Transaction
      </Button>
    </div>
  );
};

export default Header;
