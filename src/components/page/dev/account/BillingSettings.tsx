import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export function BillingSettings() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Settlement Wallets</CardTitle>
          <CardDescription>
            Add the wallet addresses where you want to receive your payouts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="usdc-wallet">USDC Wallet (EVM)</Label>
            <Input id="usdc-wallet" placeholder="0x..." defaultValue="0xAbC...123" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="usdt-wallet">USDT Wallet (EVM)</Label>
            <Input id="usdt-wallet" placeholder="0x..." />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Wallets</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Bank Details (for Fiat)</CardTitle>
          <CardDescription>
            Connect your bank account to receive fiat payouts via Stripe Connect.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline">Connect with Stripe</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Payout Schedule</CardTitle>
          <CardDescription>
            Choose how often you'd like to receive payouts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full max-w-xs">
            <Select defaultValue="weekly">
              <SelectTrigger>
                <SelectValue placeholder="Select schedule" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Schedule</Button>
        </CardFooter>
      </Card>
    </div>
  );
}