import { useState, useMemo, useCallback, memo, useEffect } from 'react';
import { TrendingUp, DollarSign, BarChart3, RefreshCw, Pause, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useFetchMarketData, useGetExchangeRates, useGetLastExchangeRatesUpdateTimestamp } from '@/hooks/useQueries';
import { toast } from 'sonner';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ExchangeRateTable from '@/components/ExchangeRateTable';

// Mock data for demonstration
const mockTrendData = [
  { month: 'Jan', growth: 4.2, revenue: 12500 },
  { month: 'Feb', growth: 5.1, revenue: 15200 },
  { month: 'Mar', growth: 4.8, revenue: 14800 },
  { month: 'Apr', growth: 6.3, revenue: 18900 },
  { month: 'May', growth: 5.9, revenue: 17600 },
  { month: 'Jun', growth: 7.2, revenue: 21400 },
];

const mockSectorData = [
  { sector: 'Retail', growth: 5.8 },
  { sector: 'Services', growth: 6.2 },
  { sector: 'Manufacturing', growth: 4.5 },
  { sector: 'Technology', growth: 8.1 },
  { sector: 'Agriculture', growth: 3.9 },
];

const REFETCH_INTERVAL = 300000; // 5 minutes

const MarketAnalysisPage = memo(() => {
  const { mutate: fetchMarketData, isPending } = useFetchMarketData();
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(true);

  const handleRefresh = useCallback(() => {
    fetchMarketData(undefined, {
      onSuccess: (data) => {
        setLastUpdated(new Date());
        toast.success('Market data updated successfully');
      },
      onError: (error) => {
        toast.error('Failed to fetch market data');
        console.error('Market data error:', error);
      },
    });
  }, [fetchMarketData]);

  const toggleAutoRefresh = useCallback(() => {
    setIsAutoRefreshEnabled(prev => !prev);
    toast.info(isAutoRefreshEnabled ? 'Auto-refresh paused' : 'Auto-refresh resumed');
  }, [isAutoRefreshEnabled]);

  // Auto-refresh market data at intervals
  useEffect(() => {
    if (!isAutoRefreshEnabled) return;

    const interval = setInterval(() => {
      handleRefresh();
    }, REFETCH_INTERVAL);

    return () => clearInterval(interval);
  }, [isAutoRefreshEnabled, handleRefresh]);

  // Format relative time
  const getRelativeTime = useCallback((date: Date | null) => {
    if (!date) return 'Never';
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    return date.toLocaleString();
  }, []);

  // Memoize chart data to prevent unnecessary recalculations
  const trendChartData = useMemo(() => mockTrendData, []);
  const sectorChartData = useMemo(() => mockSectorData, []);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Market Analysis</h2>
          <p className="text-muted-foreground mt-1">
            Real-time insights for small business trends and growth opportunities
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={toggleAutoRefresh}
            variant="outline"
            className="glass-button-subtle transition-all duration-300 hover:scale-105"
          >
            {isAutoRefreshEnabled ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pause Updates
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Resume Updates
              </>
            )}
          </Button>
          <Button
            onClick={handleRefresh}
            disabled={isPending}
            className="glass-button shadow-glow transition-all duration-300 hover:scale-105"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isPending ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>
      </div>

      {lastUpdated && (
        <p className="text-sm text-muted-foreground/70">
          Last updated: {getRelativeTime(lastUpdated)}
        </p>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card shadow-glass border-glass transition-all duration-300 hover:shadow-glass-hover hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">+5.6%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Small business sector average
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card shadow-glass border-glass transition-all duration-300 hover:shadow-glass-hover hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pricing Index</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">102.4</div>
            <p className="text-xs text-muted-foreground mt-1">
              +2.4% from last quarter
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card shadow-glass border-glass transition-all duration-300 hover:shadow-glass-hover hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Confidence</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">78%</div>
            <p className="text-xs text-muted-foreground mt-1">
              High confidence level
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Trend Chart */}
        <Card className="glass-card shadow-glass border-glass">
          <CardHeader>
            <CardTitle>Growth Trends</CardTitle>
            <CardDescription>Monthly growth rate and revenue trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" />
                <XAxis dataKey="month" stroke="oklch(var(--muted-foreground))" />
                <YAxis stroke="oklch(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'oklch(var(--card))',
                    border: '1px solid oklch(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="growth"
                  stroke="oklch(var(--primary))"
                  strokeWidth={2}
                  name="Growth %"
                  animationDuration={800}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sector Performance Chart */}
        <Card className="glass-card shadow-glass border-glass">
          <CardHeader>
            <CardTitle>Sector Performance</CardTitle>
            <CardDescription>Growth rates by business sector</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sectorChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" />
                <XAxis dataKey="sector" stroke="oklch(var(--muted-foreground))" />
                <YAxis stroke="oklch(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'oklch(var(--card))',
                    border: '1px solid oklch(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="growth" 
                  fill="oklch(var(--primary))" 
                  name="Growth %" 
                  animationDuration={800}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Exchange Rates Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
          <h3 className="text-2xl font-bold text-foreground">Exchange Rates</h3>
        </div>
        <ExchangeRateTable />
      </section>

      {/* Market Insights */}
      <Card className="glass-card shadow-glass border-glass">
        <CardHeader>
          <CardTitle>Market Insights</CardTitle>
          <CardDescription>Key trends and opportunities for small businesses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">🚀 Technology Sector Leading Growth</h4>
            <p className="text-sm text-muted-foreground">
              The technology sector shows the highest growth rate at 8.1%, driven by digital transformation 
              and increased adoption of online services among small businesses.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">📈 Services Sector Momentum</h4>
            <p className="text-sm text-muted-foreground">
              Service-based businesses are experiencing strong growth at 6.2%, particularly in consulting, 
              professional services, and personal care sectors.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">💡 Opportunity: Digital Integration</h4>
            <p className="text-sm text-muted-foreground">
              Businesses that integrate digital tools and online presence are seeing 40% higher growth rates 
              compared to traditional-only operations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

MarketAnalysisPage.displayName = 'MarketAnalysisPage';

export default MarketAnalysisPage;
