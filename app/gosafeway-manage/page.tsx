'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Users, 
  TrendingUp, 
  Search, 
  Download, 
  LogOut, 
  Mail, 
  Calendar,
  Clock,
  ArrowUpDown,
  RefreshCw,
  LayoutDashboard
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

export default function AdminDashboard() {
  const [data, setData] = useState<any[]>([])
  const [insights, setInsights] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()

  const fetchData = async () => {
    setIsRefreshing(true)
    try {
      const res = await fetch('/api/admin/data')
      if (res.ok) {
        const result = await res.json()
        setData(result.data)
        setInsights(result.insights)
      } else {
        router.push('/gosafeway-manage/login')
      }
    } catch (err) {
      toast.error('Failed to fetch dashboard data')
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    toast.success('Logged out successfully')
    router.push('/gosafeway-manage/login')
  }

  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.email.toLowerCase().includes(search.toLowerCase())
    )
  }, [data, search])

  const chartData = useMemo(() => {
    // Group signups by date
    const groups: Record<string, number> = {}
    data.forEach(item => {
      const date = new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      groups[date] = (groups[date] || 0) + 1
    })
    
    return Object.entries(groups)
      .map(([name, count]) => ({ name, count }))
      .reverse() // Newest to oldest currently in data, so reverse for chart
  }, [data])

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`
    const link = document.createElement('a')
    link.href = jsonString
    link.download = `gosafeway_waitlist_${new Date().toISOString().split('T')[0]}.json`
    link.click()
    toast.success('Waitlist exported as JSON')
  }

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight">GoSafeway Admin</h1>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium">Internal Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/5 border-white/10 hover:bg-white/10 h-8 gap-2 hidden sm:flex transition-all"
              onClick={exportData}
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-zinc-400 hover:text-white hover:bg-red-500/10 h-8 gap-2 transition-all"
              onClick={handleLogout}
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard 
            title="Total Signups" 
            value={insights?.totalSignups ?? 0} 
            icon={Users} 
            trend="+12%" 
            delay={0.1}
          />
          <StatCard 
            title="Signups Today" 
            value={insights?.signupsToday ?? 0} 
            icon={TrendingUp} 
            trend="New"
            trendColor="text-emerald-400"
            delay={0.2} 
          />
          <StatCard 
            title="Waitlist Velocity" 
            value="High" 
            icon={Clock} 
            trend="Steady"
            trendColor="text-blue-400"
            delay={0.3} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="bg-black/40 border-white/5 backdrop-blur-sm h-full shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-8">
                <div>
                  <CardTitle className="text-lg font-bold text-white">Growth Insights</CardTitle>
                  <CardDescription className="text-zinc-500 text-xs">Waitlist trends over the last few days</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 rounded-full transition-all ${isRefreshing ? 'animate-spin' : ''}`}
                  onClick={fetchData}
                >
                  <RefreshCw className="w-4 h-4 text-zinc-500" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#71717a', fontSize: 11 }}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#71717a', fontSize: 11 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#18181b', 
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                          fontSize: '12px'
                        }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="count" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorCount)" 
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Activity Feed / List */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-black/40 border-white/5 backdrop-blur-sm h-full shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white">Latest Activity</CardTitle>
                <CardDescription className="text-zinc-500 text-xs">Recently joined signups</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.slice(0, 6).map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all cursor-default">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center ring-1 ring-primary/20">
                      <Mail className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{item.email}</p>
                      <p className="text-[10px] text-zinc-500">{new Date(item.timestamp).toLocaleTimeString()}</p>
                    </div>
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[9px] px-1.5 py-0">Joined</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Search & Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Waitlist Members</h2>
              <p className="text-zinc-500 text-xs mt-1">Manage and audit all subscribers</p>
            </div>
            <div className="relative w-full sm:w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search emails..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white/5 border-white/10 text-white pl-10 h-10 rounded-xl focus:ring-primary/20 placeholder:text-zinc-600 transition-all"
              />
            </div>
          </div>

          <Card className="bg-black/40 border-white/5 overflow-hidden shadow-2xl">
            <Table>
              <TableHeader className="bg-white/[0.02] border-b border-white/5">
                <TableRow className="hover:bg-transparent transition-none">
                  <TableHead className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest pl-6">Email Address</TableHead>
                  <TableHead className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest">
                    <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                      Signup Date
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest">Status</TableHead>
                  <TableHead className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest text-right pr-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? filteredData.map((item, i) => (
                  <TableRow key={i} className="group border-white/5 hover:bg-white/[0.03] transition-colors">
                    <TableCell className="font-medium text-white pl-6 group-hover:text-primary transition-colors duration-300">
                      {item.email}
                    </TableCell>
                    <TableCell className="text-zinc-400 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                        {new Date(item.timestamp).toLocaleDateString()}
                        <span className="text-zinc-700 mx-1">•</span>
                        <Clock className="w-3.5 h-3.5 text-zinc-600" />
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg- emerald-500/10 text-emerald-400 border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold">Verified</Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button variant="ghost" size="sm" className="h-8 text-zinc-600 hover:text-white hover:bg-white/10 transition-all rounded-lg">
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center text-zinc-600 italic">
                      No matching records found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </motion.div>
      </main>
      
      {/* Footer Branding */}
      <footer className="py-12 border-t border-white/5 opacity-30 text-center">
        <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-zinc-600">
          GoSafeway Proprietary Interface v1.0
        </p>
      </footer>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, trend, trendColor = 'text-primary', delay = 0 }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
    >
      <Card className="bg-black/40 border-white/5 backdrop-blur-sm group hover:border-primary/20 transition-all duration-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-zinc-900 rounded-xl group-hover:bg-primary/20 transition-colors duration-500">
              <Icon className="w-5 h-5 text-zinc-500 group-hover:text-primary transition-colors duration-500" />
            </div>
            <Badge variant="outline" className={`${trendColor} font-bold text-[10px] bg-white/5`}>
              {trend}
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black text-white tracking-tighter">{value}</p>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">{title}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-[#050505] p-8 space-y-8">
      <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
        <Skeleton className="h-8 w-48 bg-zinc-900" />
        <Skeleton className="h-8 w-24 bg-zinc-900" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 rounded-2xl bg-zinc-900/50" />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Skeleton className="lg:col-span-2 h-[400px] rounded-2xl bg-zinc-900/50" />
        <Skeleton className="h-[400px] rounded-2xl bg-zinc-900/50" />
      </div>
    </div>
  )
}
