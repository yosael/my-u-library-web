import React from "react";

type IconTextProp = {
  text: string;
  iconProp: React.ReactNode;
};

export default function IconText({
  text,
  iconProp: IconComponent,
}: IconTextProp) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {IconComponent}
      <span style={{ marginLeft: 4 }}>{text}</span>
    </div>
  );
}
