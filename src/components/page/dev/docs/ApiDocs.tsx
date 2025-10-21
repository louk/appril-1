import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const CodeBlock = ({ children, lang }: { children: React.ReactNode, lang?: string }) => (
  <pre className="bg-muted rounded-md p-4 overflow-x-auto text-sm">
    <code className={lang ? `language-${lang}` : ''}>{children}</code>
  </pre>
);
export function ApiDocs() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-display font-bold">API Reference</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Integrate Appril's powerful features into your application with our REST API.
        </p>
      </header>
      <section id="authentication">
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Authentication</h2>
        <p className="text-muted-foreground mb-4">
          Authenticate your API requests by including your secret key in the request headers.
        </p>
        <CodeBlock>
          {`Authorization: Bearer YOUR_API_KEY`}
        </CodeBlock>
      </section>
      <section id="verify-purchase">
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Verify Purchase</h2>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              <Badge variant="outline" className="text-green-600 border-green-600/50 bg-green-50 dark:bg-green-900/20 font-mono text-sm">POST</Badge>
              <span className="font-mono text-lg">/v1/verify</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Verify a user's membership status for a given product.</p>
            <h4 className="font-semibold">Request Body</h4>
            <CodeBlock lang="json">
              {`{
  "userId": "user_12345",
  "productId": "prod_abcde"
}`}
            </CodeBlock>
            <h4 className="font-semibold">Successful Response (200)</h4>
            <CodeBlock lang="json">
              {`{
  "active": true,
  "expiresAt": "2024-12-31T23:59:59Z",
  "tokenId": "123"
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}