import { getValentine } from "@/lib/db";
import Container from "@/components/Container";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function Valentine({ params }: { params: { id: string } }) {
  const valentine = getValentine(params.id);
  if (!valentine) return <p>Not found</p>;

  async function respond(response: string) {
    await fetch("/api/respond", {
      method: "POST",
      body: JSON.stringify({ id: params.id, response })
    });
    window.location.href = `/result/${params.id}`;
  }

  return (
    <Container>
      <Card>
        <h2>{valentine.message}</h2>
        <Button onClick={() => respond("yes")}>Yes 💖</Button>
        <Button onClick={() => respond("maybe")}>Maybe 😌</Button>
        <Button onClick={() => respond("no")}>No 🫶</Button>
      </Card>
    </Container>
  );
}
