import { useLocation } from "react-router-dom";

export const useQueryParam = () => new URLSearchParams(useLocation().search);
