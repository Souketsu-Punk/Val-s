type Valentine = {
  id: string;
  message: string;
  senderName?: string;
  response?: "yes" | "maybe" | "no";
};

const store = new Map<string, Valentine>();

export function createValentine(valentine: Valentine) {
  store.set(valentine.id, valentine);
}

export function getValentine(id: string) {
  return store.get(id);
}

export function respondToValentine(id: string, response: Valentine["response"]) {
  const valentine = store.get(id);
  if (!valentine) return;
  valentine.response = response;
  store.set(id, valentine);
}
