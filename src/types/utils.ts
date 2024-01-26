import React from "react";

export interface ILink {
  icon: React.ReactNode;
  color: string;
  label: string;
  link: string;
  beta?: boolean;
}

export interface SelectItem {
  value: string;
  label: string;
  type: "text" | "category";
  disabled?: boolean;
}

export interface RoleItem {
  value: string;
  label: string;
  color: string;
  disabled?: boolean;
}
