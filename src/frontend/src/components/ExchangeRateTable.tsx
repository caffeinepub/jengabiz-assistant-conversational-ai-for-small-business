import { memo, useMemo } from 'react';
import { DollarSign, TrendingUp, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetExchangeRates, useGetLastExchangeRatesUpdateTimestamp } from '@/hooks/useQueries';

const ExchangeRateTable = memo(() => {
  const { data: exchangeRates, isLoading: ratesLoading } = useGetExchangeRates();
  const { data: lastUpdateTimestamp, isLoading: timestampLoading } = useGetLastExchangeRatesUpdateTimestamp();

  const isLoading = ratesLoading || timestampLoading;

  // Format timestamp to readable date
  const formatTimestamp = useMemo(() => {
    if (!lastUpdateTimestamp) return 'Not yet updated';
    
    const date = new Date(Number(lastUpdateTimestamp) / 1000000); // Convert nanoseconds to milliseconds
    return date.toLocaleString();
  }, [lastUpdateTimestamp]);

  // Group rates by base currency
  const kesRates = useMemo(() => {
    if (!exchangeRates) return [];
    return exchangeRates.filter(rate => rate.currencyPair.startsWith('KES_TO_'));
  }, [exchangeRates]);

  const foreignToKesRates = useMemo(() => {
    if (!exchangeRates) return [];
    return exchangeRates.filter(rate => rate.currencyPair.endsWith('_TO_KES'));
  }, [exchangeRates]);

  // Extract currency code from pair
  const getCurrencyCode = (pair: string, isFromKes: boolean): string => {
    if (isFromKes) {
      return pair.replace('KES_TO_', '');
    }
    return pair.replace('_TO_KES', '');
  };

  if (isLoading) {
    return (
      <Card className="glass-card shadow-glass border-glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Exchange Rates
          </CardTitle>
          <CardDescription>Current currency conversion rates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-48 glass-card animate-pulse-slow" />
            <Skeleton className="h-32 w-full glass-card animate-pulse-slow" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card shadow-glass border-glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          Exchange Rates
        </CardTitle>
        <CardDescription>Current currency conversion rates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Last Updated Info */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          <span>Last updated: {formatTimestamp}</span>
        </div>

        {/* KES to Foreign Currencies */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">From KES</h4>
          <div className="rounded-lg border border-glass overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="glass-card-subtle hover:glass-card-subtle">
                  <TableHead className="font-semibold">Currency</TableHead>
                  <TableHead className="text-right font-semibold">Rate</TableHead>
                  <TableHead className="text-right font-semibold">1 KES =</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kesRates.length > 0 ? (
                  kesRates.map((rate) => {
                    const currencyCode = getCurrencyCode(rate.currencyPair, true);
                    return (
                      <TableRow key={rate.currencyPair} className="hover:glass-card-subtle transition-colors">
                        <TableCell className="font-medium">{currencyCode}</TableCell>
                        <TableCell className="text-right">{rate.rate.toFixed(4)}</TableCell>
                        <TableCell className="text-right text-primary font-semibold">
                          {rate.rate.toFixed(4)} {currencyCode}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                      No exchange rates available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Foreign Currencies to KES */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">To KES</h4>
          <div className="rounded-lg border border-glass overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="glass-card-subtle hover:glass-card-subtle">
                  <TableHead className="font-semibold">Currency</TableHead>
                  <TableHead className="text-right font-semibold">Rate</TableHead>
                  <TableHead className="text-right font-semibold">1 Unit =</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {foreignToKesRates.length > 0 ? (
                  foreignToKesRates.map((rate) => {
                    const currencyCode = getCurrencyCode(rate.currencyPair, false);
                    return (
                      <TableRow key={rate.currencyPair} className="hover:glass-card-subtle transition-colors">
                        <TableCell className="font-medium">{currencyCode}</TableCell>
                        <TableCell className="text-right">{rate.rate.toFixed(4)}</TableCell>
                        <TableCell className="text-right text-primary font-semibold">
                          {rate.rate.toFixed(4)} KES
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                      No exchange rates available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

ExchangeRateTable.displayName = 'ExchangeRateTable';

export default ExchangeRateTable;
