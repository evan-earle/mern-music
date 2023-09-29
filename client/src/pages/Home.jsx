import { Navbar } from "../components/nav/Navbar";

export const Home = () => {
  const testFunction = () => {
    console.log("working");
  };

  return (
    <div>
      <Navbar search={testFunction} />
    </div>
  );
};
