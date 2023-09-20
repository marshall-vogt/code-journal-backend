export async function readEntries() {
  const response = await fetch('/api/entries');
  if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
  const entryList = await response.json();
  return entryList;
}

export async function addEntry(entry) {
  const response = await fetch('/api/entries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  });
  if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
}

export async function updateEntry(entry) {
  const response = await fetch(`api/entries/${entry.entryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  });
  if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
}

export async function removeEntry(entryId) {
  const response = await fetch(`api/entries/${entryId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
}
