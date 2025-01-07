import { DisplayError } from "@/components/ui/error";
import { FC } from "react";


const NotFound: FC = () => {

  return (
    <DisplayError
      title="Page Not Found"
      desc="Sorry, we couldn’t find the page you’re looking for."
      link="/"
      buttonText="Go back home"
    />
  )
}

export default NotFound;
