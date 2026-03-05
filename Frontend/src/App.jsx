import FaceExpressionTracker from "./features/Expression/components/FaceExpressionTracker";
import {router} from "./app.routes";
import { RouterProvider } from "react-router";
import "./features/shared/styles/global.scss";

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App