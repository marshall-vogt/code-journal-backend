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

export async function updateEntry(entry) {
  try {
    const response = await fetch(`api/entries/${entry.entryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
    if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
  } catch (error) {
    console.log(error.message);
  }
}

export function removeEntry(entryId) {
  // try {
  //   const response = await fetch(`api/entries/${entry.entryId}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(entry),
  //   });
  //   if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
  // } catch (error) {
  //   console.log(error.message);
  // }
}
