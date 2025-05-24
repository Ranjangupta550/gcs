import React from 'react'

function SidebarComponents() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Missions</h2>
      <ul className="list-disc pl-5">
        <li>
          <a href="/mission-stats" className="text-blue-500 hover:underline">
            Mission Stats
          </a>
        </li>
        <li>
          <a href="/video" className="text-blue-500 hover:underline">
            Video Stream
          </a>
        </li>
      </ul>
    </div>
  )
}

export default SidebarComponents
