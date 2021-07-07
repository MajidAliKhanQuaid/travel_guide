import LoginComponent from "../../components/LoginComponent";
import SignupComponent from "../../components/SignupComponent";

const Main = () => {
  return (
    <>
      <div
        style={{
          margin: "5% 0%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="logo.png"
          style={{ display: "block", height: "150px", width: "150px" }}
        />
      </div>
      <div className="row">
        <div className="col-md-6">
          <SignupComponent />
        </div>
        <div className="col-md-6">
          <LoginComponent />
        </div>
      </div>
    </>
  );
};

export default Main;
