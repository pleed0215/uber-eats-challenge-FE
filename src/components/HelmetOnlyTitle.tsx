import React from "react";
import { Helmet } from "react-helmet-async";

interface IHelmetOnlyTitle {
  title: string;
}

export const HelmetOnlyTitle: React.FC<IHelmetOnlyTitle> = ({ title }) => (
  <Helmet>
    <title>{title} | Challenge</title>
  </Helmet>
);
