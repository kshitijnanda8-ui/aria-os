import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import { TrendingUp, Users, Zap, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

function MarketingHub() {
  const { campaigns } = useStore()
  const [selectedCampaign, setSelectedCampaign] = useState(null)

  return (
    <div className="space-y-6">
      <motion.div
        className="glass rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Marketing Hub</h2>
          <motion.button
            className="bg-accent/20 hover:bg-accent/30 text-accent px-4 py-2 rounded-lg flex items-center gap-2 transition-all glow"
            whileHover={{ scale: 1.05 }}
          >
            <Plus size={18} /> New Campaign
          </motion.button>
        </div>

        {/* Campaign Cards */}
        <div className="grid grid-cols-2 gap-4">
          {campaigns.map((campaign, idx) => (
            <motion.div
              key={campaign.id}
              className="glass rounded-lg p-4 cursor-pointer hover:glow transition-all"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedCampaign(campaign)}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-white text-lg">{campaign.name}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  campaign.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {campaign.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Users size={16} className="text-accent" />
                  <span>{campaign.reach.toLocaleString()} reach</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <TrendingUp size={16} className="text-accent" />
                  <span>{campaign.engagement}% engagement</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Campaign Details */}
      {selectedCampaign && (
        <motion.div
          className="glass rounded-xl p-6 glow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-bold text-accent mb-4">{selectedCampaign.name}</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-accent/5 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">Total Reach</p>
              <p className="text-2xl font-bold text-accent">{selectedCampaign.reach.toLocaleString()}</p>
            </div>
            <div className="bg-accent/5 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">Engagement Rate</p>
              <p className="text-2xl font-bold text-accent">{selectedCampaign.engagement}%</p>
            </div>
            <div className="bg-accent/5 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">Status</p>
              <p className="text-lg font-bold text-accent capitalize">{selectedCampaign.status}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default MarketingHub
