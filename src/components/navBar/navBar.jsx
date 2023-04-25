import React from "react";

export function NavBar({ activeTab, event, openTab }) {
  return (
    <div className="navbar">
      <div className="tab">
        <button
          className={`tablinks ${activeTab === "Race" ? "active" : ""}`}
          onClick={(event) => openTab(event, "Race")}
        >
          Race
        </button>
        <button
          className={`tablinks ${activeTab === "Class" ? "active" : ""}`}
          onClick={(event) => openTab(event, "Class")}
        >
          Class/Level
        </button>
        <button
          className={`tablinks ${activeTab === "Ability" ? "active" : ""}`}
          onClick={(event) => openTab(event, "Ability")}
        >
          Ability Scores / Feats
        </button>
        <button
          className={`tablinks ${activeTab === "Background" ? "active" : ""}`}
          onClick={(event) => openTab(event, "Background")}
        >
          Background
        </button>
      </div>
    </div>
  );
}
