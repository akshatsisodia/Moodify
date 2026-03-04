import FaceExpressionTracker from "./features/Expression/components/FaceExpressionTracker";
import {router} from "./app.routes";
import { RouterProvider } from "react-router";

const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App