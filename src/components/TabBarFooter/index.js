import LogoutIcon from "@mui/icons-material/Logout";
import "./index.css";

const TabBarFooter = () => {
  return (
    <div className="footer-main">
      <div className="avatar">
        <img
          className="avatar-img"
          src="https://s3-alpha-sig.figma.com/img/44a7/6820/ebfeb685ad35aeed987e25b0b1da6864?Expires=1691366400&Signature=kOznqJBeMoRyyDU3uh4Fkk93XvKE8b1Qy86ebZH2bUAiMmQyz~W64UPJH-rNU412860BHSMpTBHHwRIjsWioS3J2GSpoT~N4fEkmHEko4UYk~iuL52yhdNZNP9FVhdYAgyqwbuF5hqofMic3eu96smAWXLYgz3HGmmvsowMVWnVQ1dbY14-RkX9Xxz76LXUXFrFjuaBbUDCqgNRwjM7oTpkcOXa-~QjVokaA3l8QZawK5GRUZ0wZMbt6nhQLjBacWUAVYhBTBTi0tGLfP1owUbmV42JDlSFKbikXGYgBNADS40omOK1fw7tTjdkM71KFkL~gbchnWP~27BORNKjDHQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
          alt="pic"
        />
      </div>
      <div className="details">
        <p className="name">Priya</p>
        <p className="email">priya23@gmail.com.......</p>
      </div>
      <div>
        <LogoutIcon fontSize="small" color="primary" />
      </div>
    </div>
  );
};

export default TabBarFooter;
