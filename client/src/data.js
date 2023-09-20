export async function readEntries() {
  try {
    const response = await fetch('/api/entries');
    if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
    const entryList = await response.json();
    return entryList;
  } catch (error) {
    console.error(error);
  }
}

export async function addEntry(entry) {
  try {
    const response = await fetch('/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
    if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
  } catch (error) {
    console.error(error.message);
  }
}

export function updateEntry(entry) {
  // const newEntries = data.entries.map((e) =>
  //   e.entryId === entry.entryId ? entry : e
  // );
  // data.entries = newEntries;
  // return entry;
}

export function removeEntry(entryId) {
  // const updatedArray = data.entries.filter(
  //   (entry) => entry.entryId !== entryId
  // );
  // data.entries = updatedArray;
}
