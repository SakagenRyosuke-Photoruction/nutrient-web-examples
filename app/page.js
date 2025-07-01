// The "use client" directive is necessary for using React hooks like useRef or useEffect.
// Without it, Next.js will throw a build error since hooks are not supported
// in server components.

"use client";

import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const containerRef = useRef(null);
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    (async () => {
      const container = containerRef.current;

      const { NutrientViewer } = window;
      if (container && NutrientViewer) {
        const instance = await NutrientViewer.load({
          container,
          document: "/example.pdf",
        });
        setInstance(instance);
      }

      return () => {
        NutrientViewer?.unload(container);
      };
    })();
  }, []);

  const setDate = () => {
    if (!instance) return;

    instance.setFormFieldValues({
      date_field: "2025/07/20",
    });
  };

  return (
    <>
      <div ref={containerRef} style={{ height: "100vh" }} />
      <button
        style={{
          position: "absolute",
          top: "100px",
          left: "100px",
          zIndex: 1000,
          border: "1px solid black",
          cursor: "pointer",
          padding: "10px",
          backgroundColor: "white",
        }}
        onClick={setDate}
        disabled={!instance}
      >
        set Date to 2025/07/20
      </button>
      <style global jsx>
        {`
          * {
            margin: 0;
            padding: 0;
          }
        `}
      </style>
    </>
  );
}
