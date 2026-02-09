import { getValentine } from "@/lib/db";
import Container from "@/components/Container";
import Card from "@/components/Card";

export default function Result({ params }: { params: { id: string } }) {
  const valentine = getValentine(params.id);
  if (!valentine) return <p>Not found</p>;

  return (
    <Container>
      <Card>
        <h2>Response</h2>
        <p>{valentine.response ?? "No response yet"}</p>
      </Card>
    </Container>
  );
}
