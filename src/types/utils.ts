import React from "react";

export interface ILink {
  icon: React.ReactNode;
  color: string;
  label: string;
  link: string;
  beta?: boolean;
}
