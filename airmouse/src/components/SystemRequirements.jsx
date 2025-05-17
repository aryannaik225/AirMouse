'use client'

import React from 'react'
import { FaWindows, FaCamera, FaMemory, FaMicrochip, FaPython } from 'react-icons/fa'

const reqs = [
  { icon: <FaWindows />, label: 'Windows 10 / 11' },
  { icon: <FaCamera />, label: '720p+ Webcam' },
  { icon: <FaPython />, label: 'Python 3.9+' },
  { icon: <FaMemory />, label: '4 GB RAM' },
  { icon: <FaMicrochip />, label: 'Dual-core 2 GHz CPU' },
]

const SystemRequirements = () => (
  <section className="py-16 px-6 sm:px-16 bg-white border-t border-black/10">
    <div className="max-w-4xl mx-auto text-center mb-8">
      <h3 className="text-2xl inter-bold mb-2">System Requirements</h3>
      <p className="text-black/70 inter-medium">Make sure your setup meets these minimum specs:</p>
    </div>
    <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {reqs.map((r, i) => (
        <div
          key={i}
          className="flex flex-col items-center bg-white/60 backdrop-blur-xl border border-black/10 rounded-xl p-4"
        >
          <div className="text-3xl text-[#3868ed] mb-2">{r.icon}</div>
          <span className="text-black inter-medium">{r.label}</span>
        </div>
      ))}
    </div>
  </section>
)

export default SystemRequirements
