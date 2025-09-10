async function getNationality() {
  const name = document.getElementById("nameInput").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // eski natijalarni tozalash

  if (!name) {
    resultsDiv.innerHTML = "<p class='text-red-500'>Please enter a name!</p>";
    return;
  }

  try {
    // API so'rov
    const response = await fetch(`https://api.nationalize.io?name=${name}`);
    const data = await response.json();

    if (data.country.length === 0) {
      resultsDiv.innerHTML = "<p class='text-gray-500'>No data found for this name.</p>";
      return;
    }

    // Sarlavha
    let html = `<h2 class="text-lg font-semibold mb-2">Possible Nationalities:</h2>`;
    html += `<ul class="space-y-2">`;

    // Har bir millatni chiqarish
    data.country.slice(0, 5).forEach((c, index) => {
      const probability = (c.probability * 100).toFixed(1);
      html += `
        <li class="flex items-center space-x-2">
          <span class="font-bold">${index + 1}.</span>
          <span class="bg-gray-200 px-2 py-1 rounded">${c.country_id}</span>
          <span>${probability}%</span>
        </li>
      `;
    });

    html += `</ul>`;
    resultsDiv.innerHTML = html;

  } catch (error) {
    resultsDiv.innerHTML = "<p class='text-red-500'>Error fetching data. Try again later.</p>";
    console.error(error);
  }
}
