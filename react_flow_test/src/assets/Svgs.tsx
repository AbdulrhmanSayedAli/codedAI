import React from "react";

export default function Svgs() {
  return (
    <svg style={{ position: "absolute", top: 0, left: 0 }}>
      <defs>
        <marker
          id="one-right"
          viewBox="-5 -5 10 10"
          markerHeight={10}
          markerWidth={10}
        >
          <path d="M 0 0 V 10 V -10" stroke="grey" />
        </marker>

        <marker
          id="one-left"
          viewBox="-5 -5 10 10"
          markerHeight={10}
          markerWidth={10}
        >
          <path d="M 0 0 V 10 V -10" stroke="grey" />
        </marker>

        <marker
          id="many-left"
          viewBox="-5 -10 20 20"
          markerHeight={20}
          markerWidth={20}
        >
          <path d="M -2 0 L 10 0" stroke="grey" />
          <path d="M -2 0 L 10 10" stroke="grey" />
          <path d="M -2 0 L 10 -10" stroke="grey" />
        </marker>

        <marker
          id="many-right"
          viewBox="-5 -10 20 20"
          markerHeight={20}
          markerWidth={20}
        >
          <path d="M 2 0 L -10 0" stroke="grey" />
          <path d="M 2 0 L -10 -10" stroke="grey" />
          <path d="M 2 0 L -10 10" stroke="grey" />
        </marker>
      </defs>
    </svg>
  );
}
