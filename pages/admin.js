import { useState, useEffect } from 'react'
import { supabase, isSupabaseEnabled } from '../lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Eye, 
  EyeOff, 
  Shield, 
  BarChart3, 
  Users, 
  Phone, 
  CheckCircle, 
  Clock, 
  Calendar,
  Mail,
  Trash2,
  LogOut,
  Search,
  Filter,
  Download,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  UserPlus,
  FileText
} from 'lucide-react'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts'
import { format, subDays, startOfWeek, endOfWeek } from 'date-fns'
import toast, { Toaster } from 'react-hot-toast'

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'
    
    if (password === adminPassword) {
      localStorage.setItem('adminLoggedIn', 'true')
      toast.success('Welcome back, Admin!')
      onLogin(true)
    } else {
      setError('Invalid password. Please try again.')
      toast.error('Invalid credentials')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/20"
      >
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4"
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-2">Admin Portal</h2>
          <p className="text-white/70">Secure access to dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-white/90">
              Admin Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/70 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center space-x-2 text-red-300 text-sm"
              >
                <AlertCircle size={16} />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Shield size={20} />
                <span>Access Dashboard</span>
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default function Admin() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, completed: 0 })
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true'
    console.log('Auth check - loggedIn:', loggedIn)
    setIsAuthenticated(loggedIn)
    if (loggedIn) {
      console.log('User is authenticated, calling fetchSubmissions...')
      fetchSubmissions()
    } else {
      console.log('User not authenticated, setting loading to false')
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (submissions.length > 0) {
      calculateStats()
      generateChartData()
    }
  }, [submissions])

  const calculateStats = () => {
    const newStats = submissions.reduce(
      (acc, sub) => {
        acc.total++
        acc[sub.status] = (acc[sub.status] || 0) + 1
        return acc
      },
      { total: 0, new: 0, contacted: 0, completed: 0 }
    )
    setStats(newStats)
  }

  const generateChartData = () => {
    // Generate last 7 days data
    const last7Days = []
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i)
      const dateStr = format(date, 'yyyy-MM-dd')
      const daySubmissions = submissions.filter(sub => 
        format(new Date(sub.created_at), 'yyyy-MM-dd') === dateStr
      )
      
      last7Days.push({
        date: format(date, 'MMM dd'),
        submissions: daySubmissions.length,
        new: daySubmissions.filter(s => s.status === 'new').length,
        contacted: daySubmissions.filter(s => s.status === 'contacted').length,
        completed: daySubmissions.filter(s => s.status === 'completed').length
      })
    }
    setChartData(last7Days)
  }

  const fetchSubmissions = async () => {
    try {
      console.log('Starting to fetch submissions...')
      console.log('Supabase enabled:', isSupabaseEnabled())
      
      if (!isSupabaseEnabled()) {
        console.warn('Supabase not configured')
        setSubmissions([])
        return
      }

      console.log('Making Supabase query...')
      const { data, error } = await supabase
        .from('quote_requests')
        .select('*')
        .order('created_at', { ascending: false })

      console.log('Supabase response:', { data, error })
      
      if (error) throw error
      
      console.log('Setting submissions:', data)
      setSubmissions(data || [])
      
      if (data && data.length > 0) {
        toast.success(`Loaded ${data.length} submissions`)
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
      toast.error(`Failed to fetch submissions: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      if (!isSupabaseEnabled()) {
        console.warn('Supabase not configured')
        return
      }

      const { error } = await supabase
        .from('quote_requests')
        .update({ status })
        .eq('id', id)

      if (error) throw error
      
      await fetchSubmissions()
      toast.success(`Status updated to ${status}`)
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    }
  }

  const deleteSubmission = async (id) => {
    if (!confirm('Are you sure you want to delete this submission?')) return
    
    try {
      const { error } = await supabase
        .from('quote_requests')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      await fetchSubmissions()
      toast.success('Submission deleted successfully')
    } catch (error) {
      console.error('Error deleting submission:', error)
      toast.error('Failed to delete submission')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    setIsAuthenticated(false)
    setSubmissions([])
    toast.success('Logged out successfully')
  }

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusColors = {
    new: 'from-green-500 to-emerald-600',
    contacted: 'from-yellow-500 to-orange-600', 
    completed: 'from-purple-500 to-indigo-600'
  }

  const pieData = [
    { name: 'New', value: stats.new, color: '#10b981' },
    { name: 'Contacted', value: stats.contacted, color: '#f59e0b' },
    { name: 'Completed', value: stats.completed, color: '#8b5cf6' }
  ]

  if (!isAuthenticated) {
    return <AdminLogin onLogin={setIsAuthenticated} />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </motion.div>
      </div>
    )
  }

  if (!isSupabaseEnabled()) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 text-center"
          >
            <AlertCircle className="w-16 h-16 text-white mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Configuration Required</h1>
            <p className="text-white/90">
              Supabase is not configured. Please set up your environment variables to view contact submissions.
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Manage your contact submissions</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <motion.button
                onClick={fetchSubmissions}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw size={16} />
                <span>Refresh</span>
              </motion.button>
              
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Submissions', value: stats.total, icon: FileText, gradient: 'from-blue-500 to-cyan-600', change: '+12%' },
            { title: 'New Submissions', value: stats.new, icon: UserPlus, gradient: 'from-green-500 to-emerald-600', change: '+8%' },
            { title: 'Contacted', value: stats.contacted, icon: Phone, gradient: 'from-yellow-500 to-orange-600', change: '+15%' },
            { title: 'Completed', value: stats.completed, icon: CheckCircle, gradient: 'from-purple-500 to-indigo-600', change: '+5%' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <TrendingUp size={14} className="mr-1" />
                  {stat.change}
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Area Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Submissions Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="submissions" 
                  stroke="#8b5cf6" 
                  fill="url(#colorSubmissions)" 
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorSubmissions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Submissions */}
        {filteredSubmissions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100"
          >
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No submissions found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : 'Contact submissions will appear here once users start filling out the form'
              }
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filteredSubmissions.map((submission, index) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <Users className="w-4 h-4 text-gray-400 mr-2" />
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Contact</p>
                        </div>
                        <p className="font-semibold text-gray-900">{submission.name}</p>
                        <div className="flex items-center mt-1">
                          <Mail className="w-4 h-4 text-gray-400 mr-1" />
                          <p className="text-sm text-gray-600">{submission.email}</p>
                        </div>
                        {submission.phone && (
                          <div className="flex items-center mt-1">
                            <Phone className="w-4 h-4 text-gray-400 mr-1" />
                            <p className="text-sm text-gray-600">{submission.phone}</p>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <Shield className="w-4 h-4 text-gray-400 mr-2" />
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Insurance</p>
                        </div>
                        <p className="text-sm text-gray-900">{submission.insurance_type || 'Not specified'}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Submitted</p>
                        </div>
                        <p className="text-sm text-gray-900">
                          {format(new Date(submission.created_at), 'MMM dd, yyyy')}
                        </p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(submission.created_at), 'HH:mm')}
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <Clock className="w-4 h-4 text-gray-400 mr-2" />
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</p>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${statusColors[submission.status]} text-white`}>
                          {submission.status === 'new' && <UserPlus className="w-3 h-3 mr-1" />}
                          {submission.status === 'contacted' && <Phone className="w-3 h-3 mr-1" />}
                          {submission.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l lg:pl-6">
                      <select
                        value={submission.status}
                        onChange={(e) => updateStatus(submission.id, e.target.value)}
                        className="text-sm border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                      </select>
                      
                      <motion.button
                        onClick={() => deleteSubmission(submission.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}