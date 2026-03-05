import { useNavigate } from "react-router";

const Protected = ({children}) => {
  return (
    <main>{children}</main>
  )
}

export default Protected;