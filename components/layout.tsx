import React from "react";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div>
      <aside>ab</aside>
      <main>{props.children}ab</main>
    </div>
  );
}
