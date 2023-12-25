import { useQuery } from "@tanstack/react-query";
import { getUser } from "../util/integrations/kick/API";

export const useUser = () => {
  return useQuery({ queryKey: ["getUser"], queryFn: getUser });
};
